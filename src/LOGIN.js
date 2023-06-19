import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const LOGIN = () => {
    const [LOGINUSERNAME, setLOGINUSERNAME] = useState("");
    const [LOGINPASSWORD, setLOGINPASSWORD] = useState("");
    const [LOGINUSERUNIQUEID, setLOGINUSERUNIQUEID] = useState("");

    const NAVIGATE = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/LOGIN`, {
                LOGINUSERNAME,
                LOGINPASSWORD,
                LOGINUSERUNIQUEID
            })
            .then((response) => {
                console.log("respaone", response);
                const { data } = response;
                // Check if the response indicates a successful login
                if (data.message === 'Valid username and password') {
                    // Perform any desired actions after successful login
                    // Navigate to the desired page
                    NAVIGATE("/home");
                } else if (data.message === 'Invalid username or password') {
                    // Perform any desired actions after successful login
                    // Navigate to the desired page
                    alert("Invalid username or password");
                }
            })
            .catch((error) => {
                console.error(error);
                // Handle error cases
            });
    };

    useEffect(() => {
        setLOGINUSERUNIQUEID(localStorage.getItem("USERGENERATEDUNIQUEID"));
    }, []);

    return (
        <>
            <div
                id="login"
                className="tab-pane active"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh"
                }}
            >
                <form
                    style={{
                        width: "400px",
                        padding: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    <div className="form-group">
                        <label htmlFor="email">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            onChange={(e) => setLOGINUSERNAME(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setLOGINPASSWORD(e.target.value)}
                        />
                    </div>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginRight: "1%" }}
                            onClick={handleLogin}
                        >
                            Login
                        </button>{" "}
                        <Link to="/otp" style={{ marginLeft: "1%" }}>
                            Forgot Password
                        </Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LOGIN;
