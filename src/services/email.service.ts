import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_APP,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (from: string, to: string, subject: string, text: string) => {
  return new Promise((resolve, reject) => {
    const msg = {
      from,
      to,
      subject,
      html: text,
    };

    transporter.sendMail(msg, (error, info) => {
      if (error) {
        reject(false);
      } else {
        console.log('Email đã được gửi: ' + info.response);
        resolve(true);
      }
    });
  });
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */

const verifyEmailAccount = async (to: string) => {
  const subject = 'Verify Account';
  const from = '"Verify from! 👻" <truonghoanghuy98@gmail.com>';
  const text = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #333;
    }

    p {
      font-size: 16px;
      color: #777;
    }

    .code {
      background-color: green;
      color: #fff;
      font-size: 20px;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin-top: 10px;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3>Dear User,</h3>
    <p>Thank you for signing up with our service. Your account has been successfully verified.</p>
    <div class="code">Complete !</div>
  </div>
  <div class="footer">
    <p>If you did not sign up for this service, please ignore this email.</p>
  </div>
</body>
</html>`;
  return await sendEmail(from, to, subject, text);
};

const sendResetPasswordEmail = async (to: string, code: string) => {
  const subject = 'Reset Password';
  const from = '"Reset Password from! 👻" <truonghoanghuy98@gmail.com>';
  const text = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    .container {
      background-color: #ffffff;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h3 {
      color: #333;
    }

    p {
      font-size: 16px;
      color: #777;
    }

    .code {
      background-color: green;
      color: #fff;
      font-size: 20px;
      padding: 10px;
      text-align: center;
      border-radius: 5px;
      margin-top: 10px;
    }

    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 14px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="container">
    <h3>Dear User,</h3>
    <p>Thank you for using our service. You have requested to reset your password.</p>
    <p>Your reset password code is:</p>
    <div class="code">${code}</div>
  </div>
  <div class="footer">
    <p>If you did not request to reset your password, please ignore this email.</p>
  </div>
</body>
</html>
`;
  return await sendEmail(from, to, subject, text);
};

export { transporter, sendEmail, verifyEmailAccount, sendResetPasswordEmail };
