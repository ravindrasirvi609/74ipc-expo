import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const SHEET_RANGE = process.env.GOOGLE_SHEETS_RANGE ?? "Leads!A:K";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      company,
      jobTitle,
      phone,
      email,
      city,
      state,
      address,
      interest,
      hearAbout,
    } = await request.json();

    if (
      !name ||
      !company ||
      !jobTitle ||
      !phone ||
      !email ||
      !city ||
      !state ||
      !address ||
      !interest ||
      !hearAbout
    ) {
      return NextResponse.json(
        { error: "Please provide all required registration details." },
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
        { error: "Registration service is temporarily unavailable." },
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
            name,
            company,
            jobTitle,
            phone,
            email,
            city,
            state,
            address,
            interest,
            hearAbout,
          ],
        ],
      },
    });

    const { error } = await resend.emails.send({
      from: "74th IPC Pharma Expo <dev@ravindrachoudhary.in>",
      to: ["expo@74ipc.com", "dev@ravindrachoudhary.in"],
      subject: `New Expo Lead: ${name}`,
      html: `
        <h2>New Expo Registration Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Mobile:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>City:</strong> ${city}</p>
        <p><strong>State:</strong> ${state}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Interested In:</strong> ${interest}</p>
        <p><strong>Referral Source:</strong> ${hearAbout}</p>
        <p><strong>Submitted At:</strong> ${timestamp}</p>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: error.message }, { status: 502 });
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
