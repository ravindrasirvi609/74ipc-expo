import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_RANGE = "Accommodation!A:K";

export async function POST(request: NextRequest) {
  try {
    const {
      ipcRegistrationNumber,
      checkInDate,
      checkOutDate,
      checkInTime,
      checkOutTime,
      name,
      phone,
      address,
      category,
      otherCategory,
    } = await request.json();

    if (
      !checkInDate ||
      !checkOutDate ||
      !checkInTime ||
      !checkOutTime ||
      !name ||
      !phone ||
      !address ||
      !category
    ) {
      return NextResponse.json(
        { error: "Please provide all required details." },
        { status: 400 }
      );
    }

    if (category === "Other" && !otherCategory) {
      return NextResponse.json(
        { error: "Please specify the other category." },
        { status: 400 }
      );
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    );

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error("Missing Google Sheets credentials.");
      return NextResponse.json(
        { error: "Service is temporarily unavailable." },
        { status: 500 }
      );
    }

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            ipcRegistrationNumber || "",
            checkInDate,
            checkOutDate,
            checkInTime,
            checkOutTime,
            name,
            phone,
            address,
            category,
            otherCategory || "",
          ],
        ],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
