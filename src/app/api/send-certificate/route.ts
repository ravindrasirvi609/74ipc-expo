import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { email, name, registrationNumber, certificateBase64 } =
            await request.json();

        // Validate required fields
        if (!email || !name || !registrationNumber || !certificateBase64) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address" },
                { status: 400 }
            );
        }

        // Extract base64 data from data URL
        const base64Data = certificateBase64.replace(
            /^data:image\/\w+;base64,/,
            ""
        );

        const { data, error } = await resend.emails.send({
            from: "74th IPC <no-reply@ravindrachoudhary.in>",
            to: email,
            subject: "Your 74th IPC Delegate Certificate",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #008080;">Your Delegate Certificate - 74th IPC</h2>
          <p>Dear ${name},</p>
          <p>Thank you for participating in the 74th Indian Pharmaceutical Congress held at Bengaluru International Exhibition Center, Bengaluru during December 19-21, 2025.</p>
          <p>Please find attached your Delegate Participation Certificate.</p>
          <p><strong>Registration Number:</strong> ${registrationNumber}</p>
          <p>We hope you had a wonderful experience at the conference.</p>
          <p>Best regards,<br>74th IPC Organizing Committee</p>
        </div>
      `,
            attachments: [
                {
                    content: base64Data,
                    filename: `Certificate-${registrationNumber}.png`,
                    contentType: "image/png",
                },
            ],
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Send certificate error:", error);
        return NextResponse.json(
            { error: "Failed to send certificate email" },
            { status: 500 }
        );
    }
}
