// utils/sendOtp.js
const nodemailer = require('nodemailer');

// Generate and send OTP via email
async function sendOtpToEmail(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const transporter = nodemailer.createTransport({ /* your SMTP config */ });
  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Your Registration OTP',
    text: `Your OTP is: ${otp}`,
  });
  return otp;
}

module.exports = { sendOtpToEmail };
