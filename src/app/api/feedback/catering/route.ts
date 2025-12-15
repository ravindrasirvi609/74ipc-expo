import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Using a dedicated range
const SHEET_RANGE = "CateringFeedback!A:V"; // 22 columns

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Basic Validation
        if (!data.email || !data.fullName || !data.participationLevel) {
            return NextResponse.json(
                { error: "Please provide all required fields." },
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
                { error: "Feedback service is temporarily unavailable." },
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

        // Ordered list of values to match the column structure
        const values = [
            timestamp, // A
            data.email, // B
            data.fullName, // C
            data.designation, // D
            data.affiliation, // E
            data.mobileNumber, // F
            data.participationLevel, // G
            data.participationLevelOther, // H
            data.mealsAttended, // I (Comma separated string)
            
            // Food Quality
            data.foodQuality, // J
            data.foodTaste, // K
            data.foodFreshness, // L
            data.foodVariety, // M
            data.servingTemperature, // N
            data.portionSize, // O

            // Hygiene & Service
            data.cleanliness, // P
            data.professionalism, // Q

            // Overall Experience
            data.diningComfort, // R
            data.overallSatisfaction, // S
            data.likedMost, // T
            data.suggestions, // U
            data.comments, // V
        ];

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: SHEET_RANGE,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [values],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Feedback submission error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
