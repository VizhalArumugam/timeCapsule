const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const schedule = require('node-schedule');

const app = express();
app.use(cors());
app.use(express.json());

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harsithharsith217@gmail.com', // Replace with your email
    pass: 'pnqm yiob vyrb mtxd', // Replace with your app-specific password
  },
});

// Helper function to schedule the email
const scheduleEmail = (to, subject, text, attachment, scheduleDate) => {
  const mailOptions = {
    from: 'harsithharsith217@gmail.com', // Replace with your email
    to,
    subject,
    text,
    attachments: [
      {
        filename: attachment.originalname,
        path: attachment.path,
      },
    ],
  };

  // Schedule the email
  schedule.scheduleJob(scheduleDate, async () => {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  });
};

// Endpoint to send an email immediately or schedule it
app.post('/send-email', upload.single('attachment'), async (req, res) => {
  const { to, subject, text, schedule } = req.body;
  const attachment = req.file;
  
  try {
    let scheduleDate = new Date(schedule);

    // If schedule is provided, schedule the email
    if (schedule) {
      console.log(`Email scheduled for: ${scheduleDate}`);
      scheduleEmail(to, subject, text, attachment, scheduleDate);
      res.status(200).json({ message: 'Email scheduled successfully!' });
    } else {
      // Send email immediately if no schedule is provided
      const mailOptions = {
        from: 'harsithharsith217@gmail.com', // Replace with your email
        to,
        subject,
        text, // Now correctly passed text from frontend
        attachments: [
          {
            filename: attachment.originalname,
            path: attachment.path,
          },
        ],
      };

      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent immediately!', info });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to process the email', error });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
