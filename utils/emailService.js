import nodemailer from "nodemailer";

const sendLowStockEmail = async (productName, stockCount) => {
  console.log(`[EMAIL SERVICE] Checking low stock for: ${productName} (${stockCount} left)`);
  
  // Create a placeholder check - you'll need to configure your real SMTP details in .env
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log("[EMAIL SERVICE] Skip sending: EMAIL_USER/EMAIL_PASS not set in .env");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `Low Stock Alert: ${productName}`,
    text: `The product "${productName}" is low on stock. Current count: ${stockCount}. Please restock soon.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SERVICE] Low stock email sent for ${productName}`);
  } catch (error) {
    console.error("[EMAIL SERVICE] Error sending email:", error.message);
    throw error;
  }
};

export default sendLowStockEmail;
