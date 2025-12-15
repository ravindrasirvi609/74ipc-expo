import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Using a dedicated range
const SHEET_RANGE = "ExhibitionFeedback!A:X"; // ~24 columns

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

            // Section 1
            data.daysOfVisit, // I

            // Section 2
            data.zonesVisited, // J (Comma separated)

            // Section 3: Layout & Logistics
            data.layoutOrganization, // K
            data.stallVisibility, // L
            data.spaceAdequacy, // M
            data.signageQuality, // N

            // Section 4: Exhibitor Quality
            data.diversityRelevance, // O
            data.infoQuality, // P
            data.professionalism, // Q

            // Section 5: Infrastructure
            data.ambience, // R
            data.cleanliness, // S
            data.seatingAvailability, // T

            // Section 6: Overall Satisfaction
            data.overallSatisfaction, // U
            data.innovativeProducts, // V
            data.satisfiedAspects, // W
            data.improvementAspects, // X
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
