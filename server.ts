import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // JSON Body Parser
  app.use(express.json());

  // API Contact handler
  app.post("/api/contact", async (req, res) => {
    try {
      const { fullName, companyName, phone, email, userType, serviceNeeded, message } = req.body;

      if (!fullName || !phone) {
        return res.status(400).json({ 
          success: false, 
          error: "يرجى تعبئة الحقول الإلزامية (الاسم ورقم الهاتف)" 
        });
      }

      // Format userType in Arabic
      const clientTypeArabic = userType === "individuals" ? "أفراد" : "شركات / مؤسسات";

      // HTML body for the email
      const htmlContent = `
        <div style="direction: rtl; font-family: 'Tajawal', 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #050816; color: #ffffff; padding: 40px 20px; text-align: right;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0e0c25 0%, #04030f 100%); border-radius: 16px; border: 1px solid rgba(124, 92, 255, 0.2); overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            
            <!-- Header -->
            <div style="background: linear-gradient(90deg, #5b5cff 0%, #7c5cff 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #ffffff;">طويق لخدمات الذكاء الاصطناعي</h1>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #d1c9ff;">طلب تواصل جديد من الموقع الإلكتروني</p>
            </div>
            
            <!-- Body Content -->
            <div style="padding: 30px;">
              <h2 style="color: #7c5cff; border-bottom: 2px solid rgba(124, 92, 255, 0.2); padding-bottom: 10px; margin-top: 0; font-size: 18px;">تفاصيل الطلب:</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; color: #e2e8f0; font-size: 15px;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #7c5cff; width: 30%;">اسم العميل:</td>
                  <td style="padding: 10px 0; color: #ffffff;">${fullName}</td>
                </tr>
                ${companyName ? `
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #7c5cff;">اسم الشركة:</td>
                  <td style="padding: 10px 0; color: #ffffff;">${companyName}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #7c5cff;">رقم الجوال:</td>
                  <td style="padding: 10px 0; color: #ffffff; direction: ltr; text-align: right;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #7c5cff;">البريد الإلكتروني:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-family: monospace;">${email || 'غير مدخل'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #7c5cff;">نوع العميل:</td>
                  <td style="padding: 10px 0; color: #ffffff;">${clientTypeArabic}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #7c5cff;">الخدمة المطلوبة:</td>
                  <td style="padding: 10px 0; color: #ffffff; font-weight: bold;">${serviceNeeded}</td>
                </tr>
              </table>

              ${message ? `
              <div style="background-color: rgba(124, 92, 255, 0.05); border-right: 4px solid #7c5cff; padding: 15px; border-radius: 4px; margin-top: 20px; color: #e2e8f0;">
                <p style="margin: 0 0 5px 0; font-weight: bold; color: #7c5cff;">الرسالة أو التفاصيل الإضافية:</p>
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              ` : ''}
            </div>

            <!-- Footer -->
            <div style="background-color: rgba(0,0,0,0.2); padding: 20px; text-align: center; border-top: 1px solid rgba(124, 92, 255, 0.1); font-size: 12px; color: #aeb7cc;">
              <p style="margin: 0;">هذا البريد الإلكتروني مرسل تلقائياً من نظام بوابة طويق لخدمات الذكاء الاصطناعي.</p>
              <p style="margin: 5px 0 0 0;">جميع الحقوق محفوظة © ${new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      `;

      // Text version fallback
      const textContent = `
طلب تواصل جديد من منصة طويق لخدمات الذكاء الاصطناعي:
==================================================
اسم العميل: ${fullName}
${companyName ? `اسم الشركة: ${companyName}\n` : ''}رقم الجوال: ${phone}
البريد الإلكتروني: ${email || 'غير مدخل'}
نوع العميل: ${clientTypeArabic}
الخدمة المطلوبة: ${serviceNeeded}

الرسالة:
${message || 'لا توجد رسالة'}
      `;

      // Check if SMTP environment variables are configured
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;

      if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
        console.log(`Sending real email using SMTP: ${SMTP_HOST}`);
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: parseInt(SMTP_PORT || "587"),
          secure: SMTP_SECURE === "true",
          auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"بوابة طويق للذكاء الاصطناعي" <${SMTP_USER}>`,
          to: "fares.wael841@gmail.com",
          subject: `🔔 طلب جديد من طويق للذكاء الاصطناعي - ${fullName}`,
          text: textContent,
          html: htmlContent,
        });

        return res.status(200).json({ 
          success: true, 
          message: "تم إرسال رسالتك بنجاح! سنقوم بالتواصل معك في أقرب وقت." 
        });
      } else {
        // Safe mock fallback if credentials are not filled yet
        console.warn("SMTP_HOST, SMTP_USER, or SMTP_PASS is missing in environment variables.");
        console.log("=== MOCK EMAIL SENT ===");
        console.log(`To: fares.wael841@gmail.com`);
        console.log(`Subject: 🔔 طلب جديد من طويق للذكاء الاصطناعي - ${fullName}`);
        console.log(`Content:\n${textContent}`);
        console.log("=======================");

        return res.status(200).json({
          success: true,
          mock: true,
          message: "تم استقبال طلبك بنجاح وسنقوم بالتواصل معك! (ملاحظة للنظام: يرجى تهيئة متغيرات SMTP لإرسال البريد الإلكتروني الفعلي)"
        });
      }
    } catch (error: any) {
      console.error("Error in contact form submission:", error);
      return res.status(500).json({ 
        success: false, 
        error: "حدث خطأ أثناء محاولة إرسال رسالتك. يرجى المحاولة مرة أخرى لاحقاً." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
