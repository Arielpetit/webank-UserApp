import { useEffect, useState } from "react";
import OtpInput from "./pages/OtpInput.tsx";
import "./App.css";
import Register from "./pages/Register.tsx";

export default function App() {
  //State variables to manage OTP inputs , minutes and seconds
  const [otp, setOtp] = useState("1234");
  const onChange = (value: string) => setOtp(value);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

  //Function to resend OTP
  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      //Decrease seconds if greater than 0
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      //When seconds reach 0 , decrease minutes if greater than 0
      if (seconds === 0) {
        if (minutes === 0) {
          //Stop the countdown when both minutes and seconds are 0
          clearInterval(interval);
        } else {
          //Reset seconds to 59 and decrease minutes by 1
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      //Cleanup:stop the interval when the component unmounts
      clearInterval(interval);
    };
  }, [seconds, minutes]); //Re-run this effect whenever 'seconds' changes

  return (
    <>
      <div>
        <Register />;
      </div>
      <div className="container">
        <h1>OTP Verification</h1>
        <h4>Enter the verification code we just sent to your phone number</h4>
        <OtpInput value={otp} valueLength={4} onChange={onChange} />
        <button>Verify</button>
      </div>

      <div className="countdown-text">
        <p>
          Resend OTP in {""}
          <span style={{ fontWeight: 600 }}>
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>

        {/* button to resend OTP */}
        <p>
          Didn't you receive the OTP?{" "}
          <button
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#007FFF",
              background: "none",
              border: "none",
              cursor: seconds > 0 || minutes > 0 ? "not-allowed" : "pointer",
            }}
            onClick={resendOTP}
          >
            Resend OTP
          </button>
        </p>
      </div>
    </>
  );
}
