# Quick Start Guide for Firebase Phone Authentication

## Prerequisites

1. Firebase account
2. Firebase project created
3. Phone authentication enabled in Firebase Console

## Step-by-Step Setup

### 1. Install Firebase (if not already installed)

```bash
npm install firebase
```

### 2. Configure Firebase

1. Open `src/firebase.js`
2. Replace the config object with your Firebase project config:
   - Go to Firebase Console > Project Settings > General
   - Scroll to "Your apps" section
   - Copy the `firebaseConfig` values

### 3. Enable Phone Authentication

1. Firebase Console > Authentication > Sign-in method
2. Click on "Phone"
3. Enable it
4. Click "Save"

### 4. Add Test Phone Number (For Testing)

1. Firebase Console > Authentication > Sign-in method > Phone
2. Scroll to "Phone numbers for testing"
3. Click "Add phone number"
4. Enter phone number in E.164 format: `+1234567890` (include country code)
5. Enter the OTP code you want to use for testing (e.g., `123456`)
6. Click "Save"

### 5. Test the Application

1. Start your app: `npm start`
2. Enter your test phone number (without the +, just the digits: `1234567890`)
3. Click "Send OTP"
4. Enter the test OTP code you set in Firebase Console
5. You should be signed in!

## Important Notes

### Phone Number Format

- **User Input**: Enter digits only (e.g., `1234567890`)
- **Firebase Format**: Automatically formatted to E.164 (`+1234567890`)
- **Test Numbers**: Must match exactly what you entered in Firebase Console

### Country Code

- The current implementation assumes the first digit(s) are the country code
- For US numbers: Enter `1` followed by 10 digits (e.g., `11234567890` → `+11234567890`)
- For other countries, include the full country code

### Testing

- Use test phone numbers during development to avoid SMS charges
- Test phone numbers work instantly (no real SMS sent)
- Remove test numbers before production deployment

## Common Issues

### "Invalid phone number"

- Make sure you've entered the full number including country code
- Check that the number matches your test phone number exactly

### reCAPTCHA not working

- Check browser console for errors
- Ensure Firebase config is correct
- Make sure phone authentication is enabled in Firebase Console

### OTP not received

- If using test phone number, use the OTP code you set in Firebase Console
- Check that phone authentication is enabled
- Check browser console for errors
