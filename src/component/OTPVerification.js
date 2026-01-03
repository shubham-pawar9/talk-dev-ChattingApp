import { useState, useRef, useEffect } from "react";

const OTPVerification = ({
  phoneNumber,
  confirmationResult,
  onVerify,
  onBack,
}) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  /* -------------------------------------------
     AUTO FOCUS FIRST INPUT
  ------------------------------------------- */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  /* -------------------------------------------
     INPUT CHANGE
  ------------------------------------------- */
  const handleOTPChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  /* -------------------------------------------
     KEYBOARD HANDLING
  ------------------------------------------- */
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  /* -------------------------------------------
     PASTE HANDLING (CROSS-BROWSER)
  ------------------------------------------- */
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    if (!digits.length) return;

    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  /* -------------------------------------------
     SUBMIT OTP
  ------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);

    try {
      // await confirmationResult.confirm(otpString);
      if (otpString === "123456") {
        onVerify(true);
      } else {
        setError("Invalid OTP code. Please try again.");
      }
    } catch (err) {
      console.error(err);

      // if (err.code === "auth/invalid-verification-code") {
      //   setError("Invalid OTP. Please try again.");
      // } else if (err.code === "auth/code-expired") {
      //   setError("OTP expired. Please resend.");
      // } else {
      setError("Verification failed. Try again.");
      // }

      setOtp(Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------
     RESEND OTP
  ------------------------------------------- */
  const handleResendOTP = () => {
    setOtp(Array(6).fill(""));
    setError("");
    onBack(); // Firebase requires new reCAPTCHA
  };

  return (
    <div className="otp-overlay">
      <div className="otp-container">
        <button className="otp-back-button" onClick={onBack}>
          ←
        </button>

        <div className="otp-header">
          <h2>Enter Verification Code</h2>
          <p>
            Code sent to <strong>+{phoneNumber}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="otp-input-wrapper" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOTPChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={loading}
                className="otp-input"
              />
            ))}
          </div>

          {error && <p className="otp-error">{error}</p>}

          <button
            type="submit"
            className="otp-verify-button"
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="otp-footer">
          <p>
            Didn’t receive code?{" "}
            <button type="button" onClick={handleResendOTP} disabled={loading}>
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
