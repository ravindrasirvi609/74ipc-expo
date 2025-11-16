import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_RANGE =
  process.env.GOOGLE_SHEETS_REGISTRATION_RANGE ?? "Registration!A:K";

export async function POST(request: NextRequest) {
  try {
    const {
      salutation,
      name,
      designation,
      affiliation,
      email,
      whatsapp,
      address,
      country,
      registrationCategory,
    } = await request.json();

    // Validate required fields
    if (
      !salutation ||
      !name ||
      !designation ||
      !affiliation ||
      !email ||
      !whatsapp ||
      !address ||
      !country ||
      !registrationCategory
    ) {
      return NextResponse.json(
        { error: "Please provide all required registration details." },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Validate WhatsApp number (10-15 digits)
    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10 || whatsappDigits.length > 15) {
      return NextResponse.json(
        { error: "Please provide a valid WhatsApp number." },
        { status: 400 }
      );
    }

    // Get Google Sheets credentials
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    );

    if (!spreadsheetId || !clientEmail || !privateKey) {
      console.error("Missing Google Sheets credentials.");
      return NextResponse.json(
        { error: "Registration service is temporarily unavailable." },
        { status: 500 }
      );
    }

    // Initialize Google Sheets API
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const timestamp = new Date().toISOString();

    // Append data to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            salutation,
            name,
            designation,
            affiliation,
            email,
            whatsapp,
            address,
            country,
            registrationCategory,
          ],
        ],
      },
    });

    return NextResponse.json(
      {
        message: "Registration submitted successfully.",
        data: {
          name,
          email,
          registrationCategory,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Registration submission error:", error);

    // Handle specific Google Sheets API errors
    if (error && typeof error === "object" && "code" in error) {
      const apiError = error as { code: number; message?: string };
      if (apiError.code === 403) {
        return NextResponse.json(
          { error: "Permission denied to access registration database." },
          { status: 500 }
        );
      }
      if (apiError.code === 404) {
        return NextResponse.json(
          { error: "Registration database not found." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Unable to complete registration. Please try again later or contact support.",
      },
      { status: 500 }
    );
  }
}
