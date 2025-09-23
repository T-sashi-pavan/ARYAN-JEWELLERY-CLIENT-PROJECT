# Gmail App Password Setup Guide

## Why You Need an App Password

When using Gmail with 2-factor authentication enabled, you cannot use your regular Gmail password for third-party applications. You need to generate a special "App Password" that is a 16-character code.

## Steps to Generate Gmail App Password:

### 1. Enable 2-Factor Authentication (if not already enabled)
- Go to your Google Account: https://myaccount.google.com/
- Click "Security" in the left sidebar
- Under "Signing in to Google", click "2-Step Verification"
- Follow the steps to enable 2FA

### 2. Generate App Password
- In the same "Security" section
- Under "Signing in to Google", click "App passwords"
- You might need to sign in again
- Select "Mail" as the app
- Select "Other (custom name)" as the device
- Enter "Aryan Jewels Admin Panel" as the name
- Click "Generate"

### 3. Copy the App Password
- Gmail will show you a 16-character password like: `abcd efgh ijkl mnop`
- Copy this password (ignore the spaces)

### 4. Update Your .env File
- Replace `your-16-char-app-password` in the .env file with the generated password
- Example:
```properties
EMAIL_FROM=sashipavan111111@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

### 5. Restart the Backend Server
After updating the .env file, restart your backend server to apply the changes.

## Current Status
The system will now show a helpful error message if the email is not configured properly, instead of a generic server error.

## Test the Email Function
Once configured properly, the "Send Password Reset Email" button will send a professional email to your Gmail address with password reset instructions.