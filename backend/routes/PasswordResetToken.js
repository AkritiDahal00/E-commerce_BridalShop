const mongoose = require('mongoose');

const passwordResetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' } // Token expires after 1 hour
});

module.exports = mongoose.model('PasswordResetToken', passwordResetTokenSchema);