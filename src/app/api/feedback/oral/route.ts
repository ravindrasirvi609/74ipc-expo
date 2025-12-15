import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

const SHEET_RANGE = "OralFeedback!A:AG"; // Wide range for all role fields

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

        // Construct values array mapping all possible fields
        // Since different roles have different fields, many will be empty strings.
        const values = [
            timestamp, // A
            data.email, // B
            data.fullName, // C
            data.designation, // D
            data.affiliation, // E
            data.mobileNumber, // F
            data.participationLevel, // G
            data.participationLevelOther, // H

            // Generic/Delegate Fields
            data.presenterDelivery, // I
            data.pacingAppropriate, // J
            data.contentMatch, // K
            data.qaInteraction, // L
            data.valuableComment, // M
            data.attendSimilar, // N

            // Volunteer Fields
            data.organizerCommunication, // O
            data.volunteerEnjoyable, // P
            data.volunteerImprovements, // Q
            data.volunteerAgain, // R

            // Presenter Fields
            data.organizationStructure, // S
            data.evaluatorQuestions, // T
            data.avFacilities, // U
            data.audienceEngagement, // V
            data.timeAllotted, // W
            data.presenterOverall, // X
            data.presenterImprovements, // Y

            // Evaluator Fields
            data.presenterArticulation, // Z
            data.presenterPace, // AA
            data.presenterEngaged, // AB
            data.slidesClear, // AC
            data.presenterResponse, // AD
            data.presentationCount, // AE
            data.presentationRelevant, // AF
            data.evaluatorAV, // AG
            data.evaluatorChallenges, // AH
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
