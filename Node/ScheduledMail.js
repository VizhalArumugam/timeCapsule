const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

// Step 1: Set up the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harsithharsith217@gmail.com',
    pass: 'pnqm yiob vyrb mtxd', 
  },
});

const mailOptions = {
  from: 'harsithharsith217@gmail.com',
  to: '23z116@psgitech.ac.in',
  subject: 'Scheduled Email Test with Images and Videos',
  text: 'This is a test email sent using Node.js and scheduled with node-schedule. It includes images and videos.',
  attachments: [
    {
      filename: 'note.png', // Image attachment
      path: 'note.png',   // Path to the image file
    },
   /* {
      filename: 'example-video.mp4', // Video attachment
      path: './example-video.mp4',   // Path to the video file
    },*/
  ],
};

const date = new Date(2024, 11, 16, 9, 3, 0); 
console.log(`Email scheduled for: ${date}`);

schedule.scheduleJob(date, async () => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
});
