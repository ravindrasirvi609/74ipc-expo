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
                feedbackOverTime: [],
                recommendationStats: [],
                recentFeedback: [],
            });
        }

        // Skip header if present (heuristic check)
        let dataRows = rows;
        if (rows[0][0] !== undefined && !rows[0][0].includes("T") && !rows[0][0].includes("202")) {
            dataRows = rows.slice(1);
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
            return count > 0 ? parseFloat((sum / count).toFixed(1)) : 0;
        };

        // Mapping based on route.ts columns:
        const averages = [
            { name: "Inauguration", value: calculateAverage(8), fullMark: 5 },
            { name: "Transport", value: calculateAverage(15), fullMark: 5 },
            { name: "Scientific", value: calculateAverage(22), fullMark: 5 },
            { name: "Catering", value: calculateAverage(27), fullMark: 5 },
            { name: "Cultural", value: calculateAverage(34), fullMark: 5 },
            { name: "Venue", value: 0, fullMark: 5 }, // Venue/Hospitality need text-to-score mapping if we want to include them
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

        // Feedback Over Time (Group by Date) - Col A (Index 0)
        const timeMap: Record<string, number> = {};
        dataRows.forEach((row) => {
            const timestamp = row[0];
            if (timestamp) {
                try {
                    const date = new Date(timestamp).toISOString().split('T')[0]; // YYYY-MM-DD
                    timeMap[date] = (timeMap[date] || 0) + 1;
                } catch (e) {
                    // ignore invalid dates
                }
            }
        });

        const feedbackOverTime = Object.entries(timeMap)
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => a.date.localeCompare(b.date));

        // Recommendation Stats - Col BH (Index 59) "Would you recommend..."
        const recCounts = { Yes: 0, No: 0 };
        dataRows.forEach((row) => {
            const ans = (row[59] || "").toLowerCase();
            if (ans.includes("yes")) recCounts.Yes++;
            else if (ans.includes("no")) recCounts.No++;
        });

        const recommendationStats = [
            { name: "Yes", value: recCounts.Yes },
            { name: "No", value: recCounts.No },
        ];

        // Recent Feedback (Last 5)
        // C=Name(2), G=Role(6), BI=Comments(60) or BF(57) Enjoyed
        const recentFeedback = dataRows.slice(-5).reverse().map((row) => ({
            name: row[2] || "Anonymous",
            role: row[6] || "Participant",
            comment: row[57] || row[60] || "No comment",
            rating: row[8] || "N/A" // Inauguration rating as proxy for satisfaction
        }));

        return NextResponse.json({
            totalFeedback,
            averageRatings: averages,
            participationConfig,
            feedbackOverTime,
            recommendationStats,
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
