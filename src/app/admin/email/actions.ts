"use server";

import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "8558d2002@smtp-brevo.com",
    pass: "sdptb0nhN3q4Yfg1",
  },
});

export const sendEmail = async (content: string) => {
  const info = await transporter.sendMail({
    from: "developers@shareperks.in", // sender address
    to: "sourav0w@gmail.com", // list of receivers
    subject: "SharePerks Alert", // Subject line
    html: content, // html body
  });

  return info;
};
