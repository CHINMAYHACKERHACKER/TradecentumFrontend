import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const FORGOTPASSWORD = () => {
    const [OTP, setOTP] = useState("");
    const [PASSWORD, setPASSWORD] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const FORGOTPASSWORDFUNCTION = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/FORGOTPASSWORD`, {
            OTP: OTP,
            PASSWORD: PASSWORD
        });
        alert("Your New Password Is " + PASSWORD);
    };

    const buttonStyle = submitted
        ? {
            padding: "10px 20px",
            backgroundColor: "#45a049",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
        }
        : {
            padding: "10px 20px",
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
        };

    const buttonHoverStyle = {
        backgroundColor: submitted ? "#45a049" : "#4caf50"
    };

    return (
        <>
            <br />
            <br />
            <br />
            <div
                style={{
                    width: "400px",
                    margin: "0 auto",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}
            >
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    <h2>Change Password</h2>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    <form onSubmit={FORGOTPASSWORDFUNCTION}>
                        <div
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            <label htmlFor="previousPassword">Otp:</label>
                            <input
                                type="text"
                                id="previousPassword"
                                value={OTP}
                                onChange={(e) => setOTP(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                            />
                        </div>
                        <div
                            style={{
                                marginBottom: "20px"
                            }}
                        >
                            <label htmlFor="newPassword">New Password:</label>
                            <input
                                type="password"
                                id="newPassword"
                                value={PASSWORD}
                                onChange={(e) => setPASSWORD(e.target.value)}
                                required
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px"
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                ...buttonStyle,
                                ":hover": buttonHoverStyle
                            }}
                        >
                            Submit
                        </button> <Link to="/register" style={{ marginLeft: "55%" }}>Login</Link>
                    </form>
                </div>
            </div>

        </>
    );
}

export default FORGOTPASSWORD;
