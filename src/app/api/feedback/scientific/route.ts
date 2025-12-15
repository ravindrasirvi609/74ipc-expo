import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_RANGE = "ScientificFeedback!A:W"; // Approx 23 columns

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Basic Validation
        if (!data.email || !data.fullName || !data.sessionId) {
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

            // Personal Details
            data.email, // B
            data.fullName, // C
            data.designation, // D
            data.affiliation, // E
            data.mobileNumber, // F
            data.participationLevel, // G

            // Session Details
            data.sessionDate, // H
            data.sessionHall, // I
            data.sessionTitle, // J
            data.selectedSpeakers, // K (Comma separated)

            // Section A: Content and Quality
            data.rateTopicInterest, // L
            data.objectivesDefined, // M
            data.rateScientificQuality, // N
            data.contentSupported, // O

            // Section B: Speaker and Presentation
            data.rateSpeakerSkills, // P
            data.encourageInteraction, // Q
            data.visualsClear, // R

            // Section C: Organisation
            data.durationAppropriate, // S
            data.organizationSatisfied, // T

            // Section D: Overall
            data.overallRating, // U
            data.likedMost, // V
            data.improvements, // W
            data.recommendation, // X
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
