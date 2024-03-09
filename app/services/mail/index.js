const nodemailer = require('nodemailer');
const Mustache = require('mustache');
const fs = require('fs');
const { emailAddress, emailPassword } = require('../../config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for port 465
  auth: {
    user: emailAddress,
    pass: emailPassword,
  },
});

const otpMail = async (userEmail, data) => {
  try {
    let template = fs.readFileSync('app/views/email/otp.html', 'utf-8');

    let message = {
      from: emailAddress,
      to: userEmail,
      subject: 'Otp for registration :',
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { otpMail };
