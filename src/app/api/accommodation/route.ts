import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SHEET_RANGE = "Accommodation!A:L";

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
      email,
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
      !email ||
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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
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
            email,
            address,
            category,
            otherCategory || "",
          ],
        ],
      },
    });

    // Send confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
      await resend.emails.send({
        from: "74th IPC  <dev@ravindrachoudhary.in>",
        to: email,
        subject: "Accommodation Request Received - 74th IPC",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #008080;">Accommodation Request Received</h2>
            <p>Dear ${name},</p>
            <p>Thank you for submitting your accommodation request for the 74th IPC Expo.</p>
            <p><strong>Your request details:</strong></p>
            <ul>
              <li>Check-in: ${checkInDate} at ${checkInTime}</li>
              <li>Check-out: ${checkOutDate} at ${checkOutTime}</li>
              <li>Category: ${category}${
          otherCategory ? ` (${otherCategory})` : ""
        }</li>
            </ul>
            <p>Your request has been received and we will review it. We will update you on the confirmation status as soon as possible.</p>
            <p>If you have any questions, please contact us.</p>
            <p>Best regards,<br>74th IPC Expo Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
