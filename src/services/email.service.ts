import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';

const publicPath = path.join(__dirname, '../../public');

const emailVerify = path.join(publicPath, 'email_verify', 'email.html');

const emailResetPwd = path.join(publicPath, 'email_reset_pwd', 'email.html');

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

const verifyEmailAccount = async (to: string, linkToVerify: string) => {
  const subject = 'Verify Account';
  const from = '"Verify from! 👻" <truonghoanghuy98@gmail.com>';
  const emailVerifyHtml = fs.readFileSync(emailVerify, 'utf-8');

  const text = ejs.render(emailVerifyHtml, { linkToVerify });
  return await sendEmail(from, to, subject, text);
};

const sendResetPasswordEmail = async (to: string, code: string) => {
  const subject = 'Reset Password';
  const from = '"Reset Password from! 👻" <truonghoanghuy98@gmail.com>';
  const text = ejs.render(emailResetPwd, { code });
  return await sendEmail(from, to, subject, text);
};

export { transporter, sendEmail, verifyEmailAccount, sendResetPasswordEmail };
