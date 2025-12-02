import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SHEET_RANGE =
  process.env.GOOGLE_SHEETS_REGISTRATION_RANGE ?? "Registration!A:L";

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
      otherCategory,
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

    // Validate otherCategory when Other is selected
    if (registrationCategory === "Other" && !otherCategory) {
      return NextResponse.json(
        { error: "Please specify the other category." },
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
            otherCategory || "",
          ],
        ],
      },
    });

    // Send confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: "74th IPC <dev@ravindrachoudhary.in>",
        to: email,
        subject: "Registration Request Received - 74th IPC",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #008080;">Registration Request Received</h2>
            <p>Dear ${salutation} ${name},</p>
            <p>Thank you for registering for the 74th IPC.</p>
            <p><strong>Your registration details:</strong></p>
            <ul>
              <li>Name: ${salutation} ${name}</li>
              <li>Designation: ${designation}</li>
              <li>Affiliation: ${affiliation}</li>
              <li>Category: ${registrationCategory}${
          otherCategory ? ` (${otherCategory})` : ""
        }</li>
              <li>Country: ${country}</li>
            </ul>
            <p>Your registration request has been received and we will review it. We will update you on the confirmation status as soon as possible.</p>
            <p>If you have any questions, please contact us.</p>
            <p>Best regards,<br>74th IPC Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the request if email fails
    }

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
