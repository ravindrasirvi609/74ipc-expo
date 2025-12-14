import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

// Using a dedicated range or default to a new sheet "OverallFeedback"
const SHEET_RANGE = "OverallFeedback!A:BB"; // Approx 54 columns needed

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

            // Inauguration
            data.inaugurationGrandeur, // I
            data.inaugurationTimelines, // J
            data.venueArrangement, // K
            data.inaugurationSpirit, // L
            data.inaugurationOrganization, // M
            data.inaugurationSuggestions, // N

            // Transport
            data.transportCommunication, // O
            data.transportPunctuality, // P
            data.transportComfort, // Q
            data.transportScheduleClear, // R
            data.transportSuggestions, // S

            // Accommodation
            data.accommodationQuality, // T
            data.accommodationLocation, // U
            data.accommodationSuggestions, // V

            // Scientific Sessions
            data.scientificQuality, // W
            data.scientificExpertise, // X
            data.scientificRelevant, // Y
            data.scientificEffective, // Z
            data.scientificSuggestions, // AA

            // Catering
            data.cateringQuality, // AB
            data.cateringVariety, // AC
            data.cateringHygiene, // AD
            data.cateringTimings, // AE
            data.cateringComfort, // AF
            data.cateringSuggestions, // AG

            // Cultural Program
            data.culturalOrganization, // AH
            data.culturalQuality, // AI
            data.culturalDuration, // AJ
            data.culturalVenue, // AK
            data.culturalSuggestions, // AL

            // Venue
            data.venueAccessibility, // AM
            data.venueAdequacy, // AN
            data.venueCleanliness, // AO
            data.venueRestroom, // AP
            data.venueWater, // AQ
            data.venueWifi, // AR
            data.venueCrowd, // AS
            data.venueOverall, // AT

            // Hospitality
            data.hospitalityCourtesy, // AU
            data.hospitalityEfficiency, // AV
            data.hospitalityVolunteers, // AW
            data.hospitalityResponsiveness, // AX
            data.hospitalityOverall, // AY
            data.hospitalitySatisfactory, // AZ
            data.hospitalityImprovement, // BA

            // Exhibition
            data.exhibitionSatisfaction, // BB
            data.exhibitionInnovative, // BC
            data.exhibitionSatisfactory, // BD
            data.exhibitionImprovement, // BE

            // General
            data.generalEnjoyed, // BF
            data.generalImprove, // BG
            data.generalRecommend, // BH
            data.generalComments, // BI
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
