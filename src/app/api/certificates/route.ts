import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_RANGE =
  process.env.GOOGLE_SHEETS_CERTIFICATE_RANGE ?? "Certificates!A:G";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      regNumber,
      address,
      pincode,
    } = await request.json();

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !regNumber ||
      !address ||
      !pincode
    ) {
      return NextResponse.json(
        { error: "Please provide all required certificate details." },
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

    // Validate phone number (10 digits as per typical local forms)
    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
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
        { error: "Service is temporarily unavailable." },
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
            name,
            email,
            phone,
            regNumber,
            address,
            pincode,
          ],
        ],
      },
    });

    return NextResponse.json(
      {
        message: "Certificate request submitted successfully.",
        data: {
          name,
          email,
          regNumber,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Certificate submission error:", error);

    // Handle specific Google Sheets API errors
    if (error && typeof error === "object" && "code" in error) {
      const apiError = error as { code: number; message?: string };
      if (apiError.code === 403) {
        return NextResponse.json(
          { error: "Permission denied to access certificate database." },
          { status: 500 }
        );
      }
      if (apiError.code === 404) {
        return NextResponse.json(
          { error: "Certificate database not found." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      {
        error:
          "Unable to complete request. Please try again later or contact support.",
      },
      { status: 500 }
    );
  }
}
