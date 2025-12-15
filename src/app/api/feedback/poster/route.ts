import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_RANGE = "PosterFeedback!A:T";

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

        const values = [
            timestamp, // A
            data.email, // B
            data.fullName, // C
            data.designation, // D
            data.affiliation, // E
            data.mobileNumber, // F
            data.participationLevel, // G
            data.participationLevelOther, // H

            // General (Delegate/Volunteer/Evaluator)
            data.visualAppeal, // I
            data.contentClear, // J
            data.conveyResearch, // K
            data.visualsInformative, // L
            data.citationsAdequate, // M
            data.noveltyHighlight, // N
            data.strengthsSuggestions, // O
            data.overallRating, // P

            // Presenter Specific
            data.spaceAllotted, // Q
            data.volunteersAssigned, // R
            data.satisfiedEvaluation, // S
            data.evaluatorRelevance, // T
            data.evaluatorTime, // U

            // Overall
            data.recommendation, // V
            data.additionalComments, // W
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
