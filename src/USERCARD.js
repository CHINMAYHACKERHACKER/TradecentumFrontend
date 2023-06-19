import React from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const USERCARD = () => {

    const [LOGINUSERNAME, setLOGINUSERNAME] = useState("");
    const [LOGINPASSWORD, setLOGINPASSWORD] = useState("");
    const [LOGINUSERUNIQUEID, setLOGINUSERUNIQUEID] = useState("");
    const [USERDATA, setUSERDATA] = useState([]);


    const NAVIGATE = useNavigate();

    const PAYFUNCTION=()=>{
        NAVIGATE("/Email");
    }

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/USERSIGNDATA`)
            .then((RES) => {
                console.log("respaone", RES.data);
                setUSERDATA(RES.data);
            })
        setLOGINUSERUNIQUEID(localStorage.getItem("USERGENERATEDUNIQUEID"));
    }, [])

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "100px" // Adjust the margin top value to move the card down
            }}
        >
            <div style={cardStyle}>
                <div style={cardBodyStyle}>
                    <h5 style={cardTitleStyle}>Welcome To JETTRADE FX</h5>
                    {
                        USERDATA.map((value, i) => {
                            if (value.USERGENERATEUNIQUEID == LOGINUSERUNIQUEID) {
                                return <>
                                    <p style={cardTextStyle}>Username:{value.USERNAME}</p>
                                    <p style={cardTextStyle}>Password:{value.PASSWORD}</p>
                                </>
                            }
                        })
                    }
                    <button style={buttonStyle} className="btn btn-primary" onClick={PAYFUNCTION}>
                        Pay now to activate your account
                    </button>
                </div>
            </div>
        </div>
    );
}

const cardStyle = {
    margin: "0 auto",
    width: "80%", // Adjust the width of the card as needed
    maxWidth: "400px", // Set a maximum width for responsiveness
    height: "300px", // Adjust the height of the card as needed
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", // Add box shadow for 3D effect
};

const cardBodyStyle = {
    padding: "20px",
};

const cardTitleStyle = {
    fontSize: "1.8rem", // Increase the font size for a bigger title
    marginBottom: "10px",
};

const cardTextStyle = {
    fontSize: "1.2rem", // Increase the font size for a bigger text
};

const buttonStyle = {
    marginTop: "10px",
};

export default USERCARD;
