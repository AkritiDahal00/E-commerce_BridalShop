const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const PasswordResetToken = require('./index.js');

const router = express.Router();

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a unique token
    const token = crypto.randomBytes(20).toString('hex');

    // Save the token, email, and timestamp in MongoDB
    const passwordResetToken = new PasswordResetToken({
      email: email,
      token: token,
    });
    await passwordResetToken.save();

    // Send an email with a link containing the token
    const transporter = nodemailer.createTransport({
      // Configure your SMTP transporter
    });

    const mailOptions = {
      from: 'akritidahal000@gmail.com',
      to: email,
      subject: 'Password Reset',
      html: `<p>Click the following link to reset your password: <a href="http://localhost:3000/reset-password/${token}">Reset Password</a></p>`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email.' });
  }
});

module.exports = router;

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the token in MongoDB
    const passwordResetToken = await PasswordResetToken.findOne({ token: token });
    if (!passwordResetToken) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    // Perform password reset for the user
    // Add your logic to update the user's password using newPassword

    // Delete the token from MongoDB after successful password reset
    await passwordResetToken.delete();

    res.json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error resetting password.' });
  }
});