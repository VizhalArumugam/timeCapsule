const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const moment = require("moment-timezone");
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
  response.status(200).send("Hello! The server is running.");
});

app.post("/", (request, response) => {
  const { to, subject, body, date } = request.body;

  if (!to || !subject || !body || !date) {
    return response
      .status(400)
      .send("Missing required fields: to, subject, body, or date.");
  }

  const parsedDate = moment.tz(date, "YYYY-MM-DDTHH:mm:ss", "UTC");
  parsedDate = parsedDate.add(5, "hours").add(30, "minutes");

  if (!parsedDate.isValid()) {
    return response
      .status(400)
      .send("Invalid date format. Use ISO 8601 (e.g., 2024-12-17T05:00:00Z).");
  }
  console.log(`Email scheduled for: ${parsedDate.format()}`);
  schedule.scheduleJob(parsedDate.toDate(), async () => {
    const mailData = {
      from: process.env.SMTP_USER,
      to: to,
      subject: subject,
      html: body,
    };

    try {
      const info = await transporter.sendMail(mailData);
      console.log("Email sent:", info.response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  });

  response
    .status(200)
    .send(`Email scheduled successfully for ${parsedDate.toDate()}.`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

