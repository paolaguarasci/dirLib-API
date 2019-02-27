import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const from = '"Dir Lib" <info@dirlib.com>';

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to DirLib",
    text: `
    Welcome to Dirlib, please confirm your email.
    
    ${user.generateConfirmationUrl()}
    `
  };
  console.log("email inviata! ", user.email);
  transport.sendMail(email);
}
