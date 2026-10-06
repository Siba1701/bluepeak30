import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, budget, timeline, description } = body;

    // 1. Validation
    if (!name || !email || !projectType || !description) {
      return NextResponse.json(
        {
          success: false,
          error: "Please fill in all required fields: Name, Email, Project Type, and Description.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide a valid email address.",
        },
        { status: 400 }
      );
    }

    const adminRecipient = process.env.CONTACT_TO_EMAIL || "ascreater401@gmail.com";
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    // 2. Persist to Neon Postgres
    let inquiryId: number | null = null;
    try {
      if (process.env.DATABASE_URL) {
        const result = await sql`
          INSERT INTO inquiries (
            name, email, phone, company, project_type, budget, timeline, description
          ) VALUES (
            ${name},
            ${email},
            ${phone || null},
            ${company || null},
            ${projectType},
            ${budget || null},
            ${timeline || null},
            ${description}
          )
          RETURNING id;
        `;
        if (result && result.length > 0) {
          inquiryId = result[0].id as number;
          console.log(`✓ Inquiry #${inquiryId} successfully saved to Neon PostgreSQL.`);
        }
      } else {
        console.warn("DATABASE_URL is not configured; skipping database persistence.");
      }
    } catch (dbError) {
      console.error("Failed to persist inquiry to Neon PostgreSQL:", dbError);
    }
    // Trigger n8n lead automation after successful Neon persistence
    if (inquiryId && process.env.N8N_WEBHOOK_URL) {
      try {
        const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lead_id: inquiryId,
            name,
            email,
            phone: phone || null,
            company: company || null,
            project_type: projectType,
            budget: budget || null,
            timeline: timeline || null,
            description,
            source: "BluePeak Website",
          }),
        });

        if (!n8nResponse.ok) {
          console.error(
            "n8n webhook failed:",
            n8nResponse.status,
            await n8nResponse.text()
          );
        } else {
          console.log(
            `Lead #${inquiryId} successfully sent to n8n.`
          );
        }
      } catch (n8nError) {
        console.error(
          "Failed to trigger n8n webhook:",
          n8nError
        );
      }
    } else {
      console.warn(
        "n8n webhook not triggered: missing inquiryId or N8N_WEBHOOK_URL."
      );
    }
    // Text for Admin Email
    const adminMailText = `NEW PROJECT REQUEST

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Company: ${company || "Not provided"}
Project Type: ${projectType}
Budget: ${budget || "Not specified"}
Timeline: ${timeline || "Not specified"}

PROJECT DESCRIPTION
-------------------
${description}
`;

    // HTML for Admin Email
    const adminMailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E2E8F0; border-radius: 8px; background-color: #FFFFFF; color: #12213A;">
        <div style="background-color: #1769FF; color: #FFFFFF; padding: 16px 20px; border-radius: 6px; margin-bottom: 20px;">
          <h2 style="margin: 0; font-size: 20px;">NEW PROJECT REQUEST</h2>
          <p style="margin: 4px 0 0; font-size: 13px; opacity: 0.9;">Submitted via BluePeak Web Co. Contact Form</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name:</td><td>${name}</td></tr>
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${email}" style="color: #1769FF;">${email}</a></td></tr>
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${phone || "Not provided"}</td></tr>
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${company || "Not provided"}</td></tr>
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Project Type:</td><td><strong style="color: #1769FF;">${projectType}</strong></td></tr>
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Budget:</td><td>${budget || "Not specified"}</td></tr>
          <tr style="border-bottom: 1px solid #F1F5F9;"><td style="padding: 8px 0; font-weight: bold;">Timeline:</td><td>${timeline || "Not specified"}</td></tr>
        </table>

        <h3 style="margin: 20px 0 8px; font-size: 16px; border-bottom: 2px solid #1769FF; padding-bottom: 6px;">PROJECT DESCRIPTION</h3>
        <div style="background-color: #F8FAFC; padding: 16px; border-radius: 6px; border: 1px solid #E2E8F0; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${description}</div>
        
        <p style="margin-top: 24px; font-size: 12px; color: #64748B;">
          You can reply directly to this email to respond to ${name}.
        </p>
      </div>
    `;

    // Confirmation text for Customer
    const customerMailText = `Hi ${name},

Thank you for contacting BluePeak Web Co.

We've successfully received your project requirements.

Our team will review your request and get back to you with the next steps.

Best regards,
BluePeak Web Co.
`;

    // Confirmation HTML for Customer
    const customerMailHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 28px; border: 1px solid #E2E8F0; border-radius: 10px; background-color: #FFFFFF; color: #12213A;">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 24px;">
          <div style="width: 32px; height: 32px; background-color: #1769FF; border-radius: 6px; color: #FFF; text-align: center; line-height: 32px; font-weight: bold; font-size: 16px; display: inline-block;">B</div>
          <span style="font-weight: 800; font-size: 18px; letter-spacing: 0.04em; color: #0B1B33;">BLUEPEAK WEB CO.</span>
        </div>
        
        <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569;">Thank you for contacting BluePeak Web Co.</p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569;">We've successfully received your project requirements for <strong>${projectType}</strong>.</p>
        <p style="font-size: 15px; line-height: 1.6; color: #475569;">Our technical and design team will review your inquiry in detail and get back to you within 24 hours with next steps and scheduling options.</p>

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #E2E8F0; font-size: 14px; color: #64748B;">
          <p style="margin: 0;">Best regards,</p>
          <p style="margin: 4px 0 0; font-weight: bold; color: #0B1B33;">BluePeak Web Co.</p>
          <p style="margin: 2px 0 0; font-size: 12px;"><a href="mailto:ascreater401@gmail.com" style="color: #1769FF;">ascreater401@gmail.com</a></p>
        </div>
      </div>
    `;

    // 2. Check if real credentials are set
    const hasValidCredentials =
      gmailUser &&
      gmailAppPassword &&
      !gmailUser.includes("yourgmail@gmail.com") &&
      !gmailAppPassword.includes("your_gmail_app_password");

    if (hasValidCredentials) {
      // Setup Nodemailer transport with Gmail SMTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      // 1. Send Admin Email
      await transporter.sendMail({
        from: `"BluePeak Web Co. Inquiries" <${gmailUser}>`,
        to: adminRecipient,
        replyTo: email,
        subject: `New Website Project Request — ${name}`,
        text: adminMailText,
        html: adminMailHtml,
      });

      // 2. Send Customer Confirmation Email
      await transporter.sendMail({
        from: `"BluePeak Web Co." <${gmailUser}>`,
        to: email,
        subject: `We've received your project request — BluePeak Web Co.`,
        text: customerMailText,
        html: customerMailHtml,
      });

      return NextResponse.json({
        success: true,
        inquiryId,
        message: "Project request sent and saved successfully.",
      });
    } else {
      // Development / Test fallback mode: Log details to console cleanly
      console.log("=================================================");
      console.log("📨 BLUEPEAK CONTACT ENQUIRY [MOCK / DEV LOG]");
      console.log("To Admin:", adminRecipient);
      console.log(`Subject: New Website Project Request — ${name}`);
      console.log("Reply-To:", email);
      console.log("Admin Email Content:\n", adminMailText);
      console.log("-------------------------------------------------");
      console.log("To Customer:", email);
      console.log("Subject: We've received your project request — BluePeak Web Co.");
      console.log("Customer Confirmation:\n", customerMailText);
      console.log("=================================================");

      return NextResponse.json({
        success: true,
        simulated: true,
        inquiryId,
        message:
          inquiryId
            ? "Project inquiry saved successfully to Neon PostgreSQL."
            : "Project inquiry processed and validated.",
      });
    }
  } catch (error: any) {
    console.error("Error in /api/contact:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Something went wrong while sending your request.",
      },
      { status: 500 }
    );
  }
}
