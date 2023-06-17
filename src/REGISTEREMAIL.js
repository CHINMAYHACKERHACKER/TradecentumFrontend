import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";

const REGISTEREMAIL = () => {
    const [EMAIL, setEMAIL] = useState("");
    const [USERGENERATEDUNIQUEID, setUSERGENERATEDUNIQUEID] = useState("");


    const USERGENERATEDID = uuidv4();


    const FORGOTPASSWORDFUNCTION = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/EMAILBEFOREPAY`, {
            EMAIL: EMAIL,
            USERGENERATEDUNIQUEID: USERGENERATEDUNIQUEID,
        });
        localStorage.setItem("USERPAYINGUNIQUEID", USERGENERATEDUNIQUEID);
        window.location.href=`https://buy.stripe.com/test_aEU5kzaYm4t73ni7ss`
    }

    useEffect(() => {
        setUSERGENERATEDUNIQUEID(USERGENERATEDID);
    }, [])

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#45a049",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    };

    const buttonHoverStyle = {
        backgroundColor: "#45a049"
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
                <div style={{ textAlign: "center", marginBottom: "20px" }}></div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <form onSubmit={FORGOTPASSWORDFUNCTION}>
                        <div style={{ marginBottom: "20px" }}>
                            <label htmlFor="newPassword">Enter Your Email:</label>
                            <input
                                type="email"
                                id="newPassword"
                                value={EMAIL}
                                onChange={(e) => setEMAIL(e.target.value)}
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
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default REGISTEREMAIL;
