import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from 'react-phone-input-2';

const MOBILEOTP = () => {

    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOTP] = useState('');
    const [otpSent, setOTPSent] = useState(false);

    const NAVIGATE = useNavigate();



    const handleSendOTP = (e) => {
        e.preventDefault();
        if (mobileNumber == "") {
            alert("Pls Enter Mobile Number");
        }

        if (mobileNumber !== "") {
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}/sendOTP`, { mobileNumber })
                .then(() => {
                    setOTPSent(true);
                    console.log('OTP sent successfully');
                })
                .catch((error) => {
                    console.error('Error sending OTP:', error);
                });
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/verifyOTP`, { mobileNumber, OTP: otp })
            .then(() => {
                alert("OTP verification successful");
            })
            .catch((error) => {
                alert("Error verifying OTP");
                console.error('Error verifying OTP:', error);
            });
        NAVIGATE("/forgotpassword");
    }

    return <>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#f5f5f5',
            }}
        >
            <div
                style={{
                    width: '400px',
                    padding: '20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                {!otpSent ? (
                    <form onSubmit={handleSendOTP}>
                        <label htmlFor="mobileNumber" style={{ display: 'block', marginBottom: '10px' }}>
                            Mobile Number:
                        </label>
                        <PhoneInput
                            country={'us'}
                            value={mobileNumber}
                            onChange={(phone) => setMobileNumber(phone)}
                        /><br />
                        {/* <input
                            type="text"
                            id="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        /> */}
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Send OTP
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOTP}>
                        <label htmlFor="otp" style={{ display: 'block', marginBottom: '10px' }}>
                            OTP:
                        </label>
                        <input
                            type="text"
                            id="otp"
                            value={otp}
                            onChange={(e) => setOTP(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                padding: '10px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                backgroundColor: '#007bff',
                                color: '#fff',
                                padding: '10px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
                            Verify OTP
                        </button>
                    </form>
                )}
            </div>
        </div>
    </>
}

export default MOBILEOTP;