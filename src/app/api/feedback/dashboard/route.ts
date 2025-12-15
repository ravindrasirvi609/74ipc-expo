import { google } from "googleapis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
        const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
        const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(
            /\\n/g,
            "\n"
        );

        if (!spreadsheetId || !clientEmail || !privateKey) {
            return NextResponse.json(
                { error: "Dashboard service unavailable." },
                { status: 500 }
            );
        }

        const auth = new google.auth.JWT({
            email: clientEmail,
            key: privateKey,
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        // Fetch data from "OverallFeedback"
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: "OverallFeedback!A:BI",
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return NextResponse.json({
                totalFeedback: 0,
                averageRatings: [],
                participationConfig: [],
                recentFeedback: [],
            });
        }

        // Process data
        // Assuming Row 0 might be headers if exists, or data starts immediately.
        // However, usually API just appends. If headers were manual, row 0 is headers.
        // We'll treat all as data if first row looks like a timestamp, otherwise skip 1.

        // Simple heuristic: if first cell of first row is NOT "Timestamp", assume headers.
        let dataRows = rows;
        if (rows[0][0] !== undefined && !rows[0][0].includes("T") && !rows[0][0].includes("202")) {
            // very loose check, but typically headers are "Timestamp", "Email"..
            // If the user created headers manually, we skip them.
            // If the automation created the sheet, there might be no headers unless we add them. 
            // For now, let's assume raw data appended by our previous code has no headers unless added manually.
            // But wait, user might have added headers. Let's start from index 0. 
            // Re-reading previous tasks: I just appended data. I did not create headers.
            // So data starts at row 0. 
        }

        const totalFeedback = dataRows.length;

        // Helper to calculate average of a column index (0-based)
        const calculateAverage = (colIndex: number) => {
            let sum = 0;
            let count = 0;
            dataRows.forEach((row) => {
                const val = parseFloat(row[colIndex]);
                if (!isNaN(val) && val > 0) {
                    sum += val;
                    count++;
                }
            });
            return count > 0 ? (sum / count).toFixed(1) : "0";
        };

        // Mapping based on route.ts columns:
        // I (8): Inauguration Grandeur
        // J (9): Inauguration Timelines
        // O (14): Transport Communication
        // T (19): Accommodation Quality
        // W (22): Scientific Quality
        // AB (27): Catering Quality
        // AH (33): Cultural Organization
        // AT (45): Venue Overall (Text? "Excellent" etc. or Number? Implementation uses RadioField with scaleVenue ["Excellent"...])
        // Wait, Venue/Hospitality used "Excellent/Good..." scales, not 1-5 numbers in the implementation.
        // Inauguration/Transport/Scientific/Catering/Cultural used 1-5 RatingField.

        // Let's verify standard number fields:
        const averages = [
            { name: "Inauguration", value: parseFloat(calculateAverage(8)) },
            { name: "Transport", value: parseFloat(calculateAverage(15)) }, // Punctuality (15)
            { name: "Scientific", value: parseFloat(calculateAverage(22)) },
            { name: "Catering", value: parseFloat(calculateAverage(27)) },
            { name: "Cultural", value: parseFloat(calculateAverage(34)) }, // Quality (34)
        ];

        // Participation Level Distribution (Col G / Index 6)
        const participationCounts: Record<string, number> = {};
        dataRows.forEach((row) => {
            const level = row[6] || "Unknown";
            participationCounts[level] = (participationCounts[level] || 0) + 1;
        });

        const participationConfig = Object.entries(participationCounts).map(([name, value]) => ({
            name,
            value,
        }));

        // Recent Feedback (Last 5)
        // C=Name(2), G=Role(6), BI=Comments(60) -> wait, BI is index 60?
        // Let's check indices from route.ts
        // A=0, B=1, ...
        // BF(57) = Enjoyed
        // BG(58) = Improve
        // BH(59) = Recommend
        // BI(60) = Comments
        const recentFeedback = dataRows.slice(-5).reverse().map((row) => ({
            name: row[2] || "Anonymous",
            role: row[6] || "Participant",
            comment: row[57] || row[60] || "No comment", // Prefer "Enjoyed" or "Comments"
        }));

        return NextResponse.json({
            totalFeedback,
            averageRatings: averages,
            participationConfig,
            recentFeedback,
        });

    } catch (error) {
        console.error("Dashboard API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch dashboard data" },
            { status: 500 }
        );
    }
}
