const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 5500;
require("dotenv").config();
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: true,
});
app.get("/", (request, response) => {
  response.send("hello").status(200);
});
app.post("/", (request, response) => {
  const { to, subject, body } = request.body;

  const mailData = {
    to: to,
    subject: subject,
    html: body,
  };
  transporter.sendMail(mailData, (err, info) => {
    if (err) {
      return response.status(500).json({ error: "Failed to send email." });
    }

    response.status(200).json({ message: "Email sent successfully!", info });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
