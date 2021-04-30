import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.WEBSITE_EMAIL,
    pass: process.env.WEBSITE_EMAIL_PASSWORD,
  },
});

export default function SendMail(
  title: string,
  to: string,
  content: string
): Promise<void> {
  const mailOptions = {
    from: process.env.WEBSITE_EMAIL,
    to,
    subject: title || "BDE Mail",
    html: content,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err: unknown) => {
      if (err) reject(err);
      else resolve();
    });
  });
}
