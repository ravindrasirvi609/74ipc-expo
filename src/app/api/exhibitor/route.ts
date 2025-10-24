import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { writeFile } from "fs/promises";
import { join } from "path";

const resend = new Resend(process.env.RESEND_API_KEY);
const SHEET_RANGE =
  process.env.GOOGLE_SHEETS_EXHIBITOR_RANGE ?? "Exhibitors!A:Z";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const companyName = formData.get("companyName") as string;
    const companyAddress = formData.get("companyAddress") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const pincode = formData.get("pincode") as string;
    const country = formData.get("country") as string;
    const contactPersonName = formData.get("contactPersonName") as string;
    const designation = formData.get("designation") as string;
    const phone = formData.get("phone") as string;
    const alternatePhone = formData.get("alternatePhone") as string;
    const email = formData.get("email") as string;
    const website = formData.get("website") as string;
    const stallType = formData.get("stallType") as string;
    const stallSize = formData.get("stallSize") as string;
    const stallLocation = formData.get("stallLocation") as string;
    const productsServices = formData.get("productsServices") as string;
    const category = formData.get("category") as string;
    const electricityRequired = formData.get("electricityRequired") === "true";
    const furnitureRequired = formData.get("furnitureRequired") === "true";
    const additionalRequirements = formData.get(
      "additionalRequirements"
    ) as string;
    const paymentMode = formData.get("paymentMode") as string;
    const acceptedTerms = formData.get("acceptedTerms") === "true";

    // Cost calculations
    const stallRate = parseFloat(formData.get("stallRate") as string) || 0;
    const stallSqm = parseFloat(formData.get("stallSqm") as string) || 0;
    const subtotal = parseFloat(formData.get("subtotal") as string) || 0;
    const gst = parseFloat(formData.get("gst") as string) || 0;
    const totalAmount = parseFloat(formData.get("totalAmount") as string) || 0;

    // Validate required fields
    if (
      !companyName ||
      !companyAddress ||
      !city ||
      !state ||
      !pincode ||
      !contactPersonName ||
      !designation ||
      !phone ||
      !email ||
      !stallType ||
      !stallSize ||
      !productsServices ||
      !category ||
      !paymentMode ||
      !acceptedTerms
    ) {
      return NextResponse.json(
        { error: "Please provide all required registration details." },
        { status: 400 }
      );
    }

    // Handle logo upload
    const logoFile = formData.get("logo") as File | null;
    let logoFileName = "";
    let logoPath = "";

    if (logoFile) {
      const bytes = await logoFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const sanitizedCompanyName = companyName
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();
      logoFileName = `${sanitizedCompanyName}_${timestamp}_${logoFile.name}`;

      // Save to public/uploads directory
      const uploadsDir = join(process.cwd(), "public", "uploads", "logos");
      logoPath = join(uploadsDir, logoFileName);

      try {
        await writeFile(logoPath, buffer);
        logoPath = `/uploads/logos/${logoFileName}`;
      } catch (error) {
        console.error("Error saving logo file:", error);
        logoPath = "";
      }
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

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: SHEET_RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            timestamp,
            companyName,
            companyAddress,
            city,
            state,
            pincode,
            country,
            contactPersonName,
            designation,
            phone,
            alternatePhone,
            email,
            website,
            stallType,
            stallSize,
            stallSqm,
            stallRate,
            stallLocation,
            productsServices,
            category,
            electricityRequired ? "Yes" : "No",
            furnitureRequired ? "Yes" : "No",
            additionalRequirements,
            paymentMode,
            subtotal,
            gst,
            totalAmount,
            logoPath,
            acceptedTerms ? "Yes" : "No",
          ],
        ],
      },
    });

    // Send email notification
    const { error } = await resend.emails.send({
      from: "74th IPC Pharma Expo <dev@ravindrachoudhary.in>",
      to: ["expo@74ipc.com", "dev@ravindrachoudhary.in"],
      cc: [email],
      subject: `New Exhibitor Registration: ${companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2d8a2f; border-bottom: 3px solid #ff6b35; padding-bottom: 10px;">
            New Exhibitor Registration
          </h2>
          
          <h3 style="color: #2d8a2f; margin-top: 20px;">Company Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${companyName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Address:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${companyAddress}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>City:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${city}, ${state} - ${pincode}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Country:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${country}</td>
            </tr>
            ${
              website
                ? `<tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Website:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="${website}">${website}</a></td>
            </tr>`
                : ""
            }
          </table>

          <h3 style="color: #2d8a2f; margin-top: 20px;">Contact Person</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${contactPersonName}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Designation:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${designation}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            ${
              alternatePhone
                ? `<tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Alternate Mobile:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${alternatePhone}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
          </table>

          <h3 style="color: #ff6b35; margin-top: 20px;">Stall Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Stall Type:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${stallType}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Stall Size:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${stallSize} (${stallSqm} sqm)</td>
            </tr>
            ${
              stallLocation
                ? `<tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Location:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${stallLocation}</td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Rate per sqm:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">₹${stallRate.toLocaleString(
                "en-IN"
              )}</td>
            </tr>
          </table>

          <h3 style="color: #2d8a2f; margin-top: 20px;">Products & Services</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Category:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${category}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Description:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${productsServices}</td>
            </tr>
          </table>

          <h3 style="color: #2d8a2f; margin-top: 20px;">Additional Requirements</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Electricity:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${
                electricityRequired ? "Yes" : "No"
              }</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Furniture:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${
                furnitureRequired ? "Yes" : "No"
              }</td>
            </tr>
            ${
              additionalRequirements
                ? `<tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; vertical-align: top;"><strong>Other Requirements:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${additionalRequirements}</td>
            </tr>`
                : ""
            }
          </table>

          <h3 style="color: #ff6b35; margin-top: 20px;">Cost Breakdown</h3>
          <table style="width: 100%; border-collapse: collapse; background-color: #f9f9f9;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Subtotal:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${subtotal.toLocaleString(
                "en-IN"
              )}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>GST (18%):</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${gst.toLocaleString(
                "en-IN"
              )}</td>
            </tr>
            <tr style="background-color: #2d8a2f; color: white;">
              <td style="padding: 12px; font-size: 18px;"><strong>Grand Total:</strong></td>
              <td style="padding: 12px; text-align: right; font-size: 18px;"><strong>₹${totalAmount.toLocaleString(
                "en-IN"
              )}</strong></td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 8px; font-size: 12px; color: #666;">
                Minimum 25% advance payment required: ₹${(
                  totalAmount * 0.25
                ).toLocaleString("en-IN")}
              </td>
            </tr>
          </table>

          <h3 style="color: #2d8a2f; margin-top: 20px;">Payment Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Preferred Payment Mode:</strong></td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${paymentMode}</td>
            </tr>
          </table>

          ${
            logoPath
              ? `
          <h3 style="color: #2d8a2f; margin-top: 20px;">Logo</h3>
          <p>Logo file uploaded: <a href="${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }${logoPath}">${logoFileName}</a></p>
          `
              : ""
          }

          <div style="margin-top: 30px; padding: 20px; background-color: #f0f9ff; border-left: 4px solid #2d8a2f;">
            <p style="margin: 0;"><strong>Submitted At:</strong> ${new Date(
              timestamp
            ).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              dateStyle: "full",
              timeStyle: "long",
            })}</p>
          </div>

          <div style="margin-top: 30px; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ff6b35;">
            <p style="margin: 0; font-size: 14px;"><strong>Action Required:</strong> Please contact the exhibitor within 24-48 hours with booking confirmation and payment instructions.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      // Don't fail the request if email fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Exhibitor registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
