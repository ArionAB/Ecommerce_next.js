import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const password = process.env.PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions = {
  from: email,
  to: email,
  subject: "New message from your website",
};
