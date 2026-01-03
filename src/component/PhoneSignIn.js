import { useState, useRef, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import OTPVerification from "./OTPVerification";

const PhoneSignIn = ({ onSignInSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const recaptchaVerifierRef = useRef(null);
  const recaptchaContainerRef = useRef(null);
  const formatPhoneNumber = (phone) => {
    // Format phone number with spaces for better readability
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 0) return "";
    if (cleaned.length <= 1) return "+" + cleaned;
    if (cleaned.length <= 4)
      return "+" + cleaned.slice(0, 1) + " " + cleaned.slice(1);
    if (cleaned.length <= 7)
      return (
        "+" +
        cleaned.slice(0, 1) +
        " " +
        cleaned.slice(1, 4) +
        " " +
        cleaned.slice(4)
      );
    return (
      "+" +
      cleaned.slice(0, 1) +
      " " +
      cleaned.slice(1, 4) +
      " " +
      cleaned.slice(4, 7) +
      " " +
      cleaned.slice(7, 15)
    );
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    // Only allow digits
    if (value.length <= 15) {
      setPhoneNumber(value);
      setError("");
    }
  };
  const validatePhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, ""); // Basic validation - at least 10 digits
    return cleaned.length >= 10;
  };
  // Initialize reCAPTCHA verifier
  // useEffect(() => {
  //   if (!recaptchaVerifierRef.current && recaptchaContainerRef.current) {
  //     recaptchaVerifierRef.current = new RecaptchaVerifier(
  //       auth,
  //       recaptchaContainerRef.current,
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           // reCAPTCHA solved, allow signInWithPhoneNumber
  //           console.log("reCAPTCHA verified");
  //         },
  //         "expired-callback": () => {
  //           // Response expired. Ask user to solve reCAPTCHA again.
  //           setError("reCAPTCHA expired. Please try again.");
  //         },
  //       }
  //     );
  //   }
  //   return () => {
  //     // Cleanup reCAPTCHA verifier on unmount
  //     if (recaptchaVerifierRef.current) {
  //       recaptchaVerifierRef.current.clear();
  //     }
  //   };
  // }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!phoneNumber.trim()) {
      setError("Please enter your phone number");
      return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number");
      return;
    }
    setLoading(true);
    try {
      // Format phone number in E.164 format for Firebase
      // Firebase requires: +[country code][number] (e.g., +1234567890)
      // phoneNumber state contains only digits, so we add the + prefix
      // For testing, ensure your test phone number in Firebase Console includes country code
      // const formattedPhone = "+" + phoneNumber; // Send OTP using Firebase
      // const confirmation = await signInWithPhoneNumber(
      //   auth,
      //   formattedPhone,
      //   recaptchaVerifierRef.current
      // );
      // setConfirmationResult(confirmation);
      setConfirmationResult(true);
      setLoading(false);
      setShowOTP(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
      // Handle specific error cases
      // if (error.code === "auth/invalid-phone-number") {
      //   setError("Invalid phone number format. Please check and try again.");
      // } else if (error.code === "auth/too-many-requests") {
      //   setError("Too many requests. Please try again later.");
      // } else if (error.code === "auth/quota-exceeded") {
      //   setError("SMS quota exceeded. Please try again later.");
      // } else {
      setError("Failed to send OTP. Please try again.");
      // }
      // Clear and reset reCAPTCHA on error
      // if (recaptchaVerifierRef.current) {
      //   recaptchaVerifierRef.current.clear();
      //   recaptchaVerifierRef.current = null;
      // }
    }
  };
  const handleOTPVerification = (verified) => {
    if (verified) {
      onSignInSuccess(phoneNumber);
    } else {
      setShowOTP(false);
      setConfirmationResult(null);
    }
  };
  if (showOTP && confirmationResult) {
    return (
      <OTPVerification
        phoneNumber={phoneNumber}
        confirmationResult={confirmationResult}
        onVerify={handleOTPVerification}
        onBack={() => {
          setShowOTP(false);
          setConfirmationResult(null);
        }}
      />
    );
  }
  return (
    <div className="phone-signin-overlay">
      <div className="phone-signin-container">
        <div className="phone-signin-header">
          <h2 className="phone-signin-title">Welcome to Talk Dev</h2>
          <p className="phone-signin-subtitle">
            {" "}
            Enter your phone number to get started{" "}
          </p>
        </div>
        <form className="phone-signin-form" onSubmit={handleSubmit}>
          <div className="phone-input-wrapper">
            <label htmlFor="phone" className="phone-label">
              {" "}
              Phone Number{" "}
            </label>
            <div className="phone-input-container">
              <span className="phone-prefix">+</span>
              <input
                type="tel"
                id="phone"
                className="phone-input"
                placeholder="1 234 567 8900"
                value={formatPhoneNumber(phoneNumber)}
                onChange={handlePhoneChange}
                autoFocus
                disabled={loading}
              />
            </div>{" "}
            {error && <span className="phone-error">{error}</span>}
          </div>
          <button
            type="submit"
            className="phone-signin-button"
            disabled={loading || !phoneNumber.trim()}
          >
            {" "}
            {loading ? "Sending OTP..." : "Send OTP"}{" "}
          </button>
        </form>
        <div className="phone-signin-footer">
          <p className="phone-signin-info">
            {" "}
            We'll send you a verification code via SMS{" "}
          </p>
        </div>{" "}
        {/* reCAPTCHA container - invisible */}
        <div ref={recaptchaContainerRef} id="recaptcha-container"></div>
      </div>
    </div>
  );
};
export default PhoneSignIn;
