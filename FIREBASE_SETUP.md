# Firebase Phone Authentication Setup Guide

## Step 1: Install Firebase SDK

Run this command in your project directory:

```bash
npm install firebase
```

## Step 2: Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select "Project settings"
5. Scroll down to "Your apps" section
6. Click on the Web icon (</>) to add a web app
7. Register your app (you can skip hosting setup for now)
8. Copy the `firebaseConfig` object

## Step 3: Configure Firebase in Your App

1. Open `src/firebase.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

## Step 4: Enable Phone Authentication in Firebase Console

1. In Firebase Console, go to **Authentication**
2. Click on **Get started** (if you haven't set up authentication)
3. Click on the **Sign-in method** tab
4. Click on **Phone** from the list of providers
5. **Enable** Phone authentication
6. Click **Save**

## Step 5: Set up reCAPTCHA (Required for Web)

Phone authentication on web requires reCAPTCHA. Firebase handles this automatically with the `RecaptchaVerifier`, but you need to:

1. In Firebase Console, go to **Authentication > Sign-in method**
2. Make sure **Phone** is enabled
3. The reCAPTCHA will be automatically handled by Firebase SDK

## Step 6: Configure Authorized Domains

1. In Firebase Console, go to **Authentication > Settings**
2. Scroll to **Authorized domains**
3. Make sure your development domain (`localhost`) is listed
4. For production, add your production domain

## Step 7: Testing with Test Phone Numbers (Optional)

For development/testing, you can add test phone numbers in Firebase Console:

1. Go to **Authentication > Sign-in method > Phone**
2. Scroll to **Phone numbers for testing**
3. Click **Add phone number**
4. Add your test phone number and OTP code
5. During testing, Firebase will use this OTP instead of sending SMS

**Note:** Test phone numbers must be in E.164 format (e.g., +1234567890)

## Important Notes:

- **Phone Number Format**: Phone numbers must be in E.164 format (e.g., +1234567890)
- **Country Code**: Make sure to include the country code with `+` prefix
- **reCAPTCHA**: reCAPTCHA is handled automatically and will appear when needed
- **Testing**: Use test phone numbers during development to avoid SMS charges
- **Production**: Remove test phone numbers before going to production

## Troubleshooting:

1. **"Invalid phone number"**: Make sure the phone number includes country code with `+`
2. **reCAPTCHA not appearing**: Check browser console for errors, make sure Firebase config is correct
3. **OTP not received**:
   - Check if you're using a test phone number
   - Verify Firebase project has phone authentication enabled
   - Check browser console for errors
4. **"Quota exceeded"**: Firebase free tier has limits on SMS. Use test phone numbers during development
