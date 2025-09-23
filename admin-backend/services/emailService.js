import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Create transporter
const createTransporter = () => {
  console.log('Creating email transporter...');
  console.log('Email From:', process.env.EMAIL_FROM);
  console.log('Password provided:', process.env.EMAIL_PASSWORD ? 'Yes' : 'No');
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASSWORD || 'your-app-password'
    },
    debug: true, // Enable debug mode
    logger: true // Enable logging
  });
};

// Generate reset token
export const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Send password reset email
export const sendPasswordResetEmail = async (adminEmail, adminName, resetToken) => {
  try {
    console.log(`Attempting to send password reset email to: ${adminEmail}`);
    
    const transporter = createTransporter();
    
    // Test the connection first
    console.log('Testing email connection...');
    await transporter.verify();
    console.log('Email connection verified successfully');
    
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@aryanjewels.com',
      to: adminEmail,
      subject: 'Admin Password Reset Request - Aryan\'s Jewels',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
          <p>Hi ${adminName},</p>
          <p>You requested a password reset for your admin account at Aryan's Jewels.</p>
          <p>Click the button below to reset your password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p><strong>This link will expire in 1 hour.</strong></p>
          <p>If you didn't request this reset, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p style="color: #666; font-size: 12px;">
            This is an automated email. Please do not reply to this email.
          </p>
        </div>
      `
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Password reset email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending password reset email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      responseCode: error.responseCode
    });
    return { success: false, error: error.message };
  }
};

// Send password reset confirmation email
export const sendPasswordResetConfirmation = async (adminEmail, adminName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@aryanjewels.com',
      to: adminEmail,
      subject: 'Password Successfully Reset - Aryan\'s Jewels',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #28a745; text-align: center;">Password Reset Successful</h2>
          <p>Hi ${adminName},</p>
          <p>Your password has been successfully reset for your admin account at Aryan's Jewels.</p>
          <p>If you didn't make this change, please contact the system administrator immediately.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This is an automated email. Please do not reply to this email.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Password reset confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending password reset confirmation email:', error);
    return { success: false, error: error.message };
  }
};