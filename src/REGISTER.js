import React from "react";
import { useState } from "react";
import IMAG from "./IMAGE/peakpx.jpg";
import './REGISTERUI.css';
import axios from "axios";
import { useEffect } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const REGISTER = () => {

    const [REFERRALID, setREFERRALID] = useState("");
    const [SELECTEDREFERLID, setSELECTEDREFERLID] = useState("");
    const [USERNAME, setUSERNAME] = useState("");
    const [MOBILENUMBER, setMOBILENUMBER] = useState("");
    const [EMAIL, setEMAIL] = useState("");
    const [Adress, setADRESS] = useState("");
    const [GENDER, setGENDER] = useState("");
    const [CITIZENSHIP, setCITIZENSHIP] = useState("")
    const [panNumber, setPanNumber] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [INDIAIMAGE, setINDIAIMAGE] = useState("");


    //OTHER COUNTRY DATA
    const [idNumber, setIDNumber] = useState("");

    //OTHER COUNTRY DATA
    const [OTHERIMAGE, setOTHERIMAGE] = useState("");

    const [USERID, setUSERID] = useState("");

    const [PASSWORD, setPASSWORD] = useState("");

    const [PASSWORDTEXT, setPASSWORDTEXT] = useState("password");

    const [USERGENERATEDUNIQUEID, setUSERGENERATEDUNIQUEID] = useState("");

    const [duration, setDuration] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isActive, setIsActive] = useState(true);


    const NAVIGATE = useNavigate();

    const USERGENERATEDID = uuidv4();

    const currentDate = new Date();

    const hours = currentDate.getHours(); // Get the current hour (0-23)
    const minutes = currentDate.getMinutes(); // Get the current minute (0-59)
    const seconds = currentDate.getSeconds(); // Get the current second (0-59)

    const CITIZENSHIPFUNCTION = (event) => {
        setCITIZENSHIP(event.target.value);
    }

    const PANNUMBERFUNCTION = (event) => {
        setPanNumber(event.target.value);
    }

    const ADHARNUMBERFUNCTION = (event) => {
        setAadharNumber(event.target.value);
    }

    const handleIDNumberChange = (event) => {
        setIDNumber(event.target.value);
    }

    const GENDERFUNCTION = (e) => {
        setGENDER(e.target.value);
    }

    const FUNCTIONMAETHOD = () => {
        setPASSWORDTEXT("tex");
    }

    const handleReferralIDSelection = (e) => {
        setSELECTEDREFERLID(e.target.value);
    }


    const SIGNUPFUNCTION = (event) => {
        const Form = new FormData();
        Form.append("REFERLID", REFERRALID);
        Form.append("SELECTEDREFERLID", SELECTEDREFERLID);
        Form.append("USERNAME", USERNAME);
        Form.append("MOBILENUMBER", MOBILENUMBER);
        Form.append("EMAIL", EMAIL);
        Form.append("Adress", Adress);
        Form.append("GENDER", GENDER);
        Form.append("CITIZENSHIP", CITIZENSHIP);
        Form.append("INDIAPANNUMBER", panNumber);
        Form.append("INDIAADHARNUMBER", aadharNumber);
        // Form.append("INDIAIMAGE", INDIAIMAGE);
        Form.append("OTHERCOUNTRYIDNUMBER", idNumber);
        // Form.append("OTHERIMAGE", OTHERIMAGE);
        Form.append("USERID", USERID);
        Form.append("PASSWORD", PASSWORD);
        Form.append("USERGENERATEDUNIQUEID", USERGENERATEDUNIQUEID);

        for (let i = 0; i <= INDIAIMAGE.length; i++) {
            if (CITIZENSHIP == "India") {
                Form.append('INDIAIMAGE', INDIAIMAGE[i]);
            }

            if (CITIZENSHIP == "other") {
                Form.append("OTHERIMAGE", INDIAIMAGE[i]);
            }
        }
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/SIGN`, Form);

        localStorage.setItem("USERGENERATEDUNIQUEID", USERGENERATEDUNIQUEID);
        NAVIGATE("/User");
    }

    useEffect(() => {
        setUSERGENERATEDUNIQUEID(USERGENERATEDID);
        localStorage.setItem("CURRENTTIME", `${hours}:${minutes}:${seconds}`);
    }, [])



    useEffect(() => {
        let startTime = new Date().getTime();

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setIsActive(false);
                sendSessionData();
            } else {
                setIsActive(true);
            }
        };

        const sendSessionData = () => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - startTime;

            // Convert elapsed time to hours, minutes, and seconds
            const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
            const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

            setDuration({ hours, minutes, seconds });

            // Send the duration to the backend
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/session`, { duration: elapsedTime })
                .then(response => {
                    console.log('Duration sent to the server');
                })
                .catch(error => {
                    console.error('Error sending duration:', error);
                });
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-lg-7 col-md-8 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <a className="nav-link active" data-toggle="tab" href="#signup">
                                Create Account
                            </a>
                        </div>
                        <div className="card-body">
                            <div id="signup" className="tab-pane">
                                <form onSubmit={SIGNUPFUNCTION}>
                                    <div className="form-group">
                                        <label htmlFor="referralId">Referral ID:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Referral ID"
                                            onChange={(e) => setREFERRALID(e.target.value)}
                                        />
                                        <small className="form-text text-muted">
                                            If you don't have a referral ID, choose an official ID:
                                        </small>
                                        <select
                                            className="form-control mt-2"
                                            value={SELECTEDREFERLID}
                                            onChange={handleReferralIDSelection}
                                        >
                                            <option value="">Choose Official ID</option>
                                            <option value="official1">Official ID 1</option>
                                            <option value="official2">Official ID 2</option>
                                            <option value="official3">Official ID 3</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            onChange={(e) => setUSERNAME(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Mobile Number:</label>
                                        <PhoneInput
                                            country={'us'}
                                            value={MOBILENUMBER}
                                            onChange={(phone) => setMOBILENUMBER(phone)}
                                        />
                                        {MOBILENUMBER.trim() === "" && (
                                            <small className="form-text text-danger">
                                                Mobile number is required
                                            </small>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter Email (optional)"
                                            onChange={(e) => setEMAIL(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Address:</label>
                                        <textarea
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter Address"
                                            onChange={(e) => setADRESS(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="referralId">Select Gender:</label>
                                        <select
                                            className="form-control mt-2"
                                            value={GENDER}
                                            onChange={GENDERFUNCTION}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="referralId">Select citizenship:</label>
                                        <select
                                            className="form-control mt-2"
                                            value={CITIZENSHIP}
                                            onChange={CITIZENSHIPFUNCTION}
                                        >
                                            <option value="">Select citizenship</option>
                                            <option value="India">India</option>
                                            <option value="other">Other Country</option>
                                        </select>
                                    </div>
                                    {CITIZENSHIP === "India" && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="panNumber">PAN Number:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={panNumber}
                                                    onChange={PANNUMBERFUNCTION}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="aadharNumber">Aadhar Number:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={aadharNumber}
                                                    onChange={ADHARNUMBERFUNCTION}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pwd">
                                                    Upload Both Pan Card and Aadhar Card Image:
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setINDIAIMAGE(e.target.files)}
                                                    multiple
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                    {CITIZENSHIP === "other" && (
                                        <>
                                            <div className="form-group">
                                                <label htmlFor="idNumber">ID Number:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={idNumber}
                                                    onChange={handleIDNumberChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pwd">
                                                    Upload Driving Licence/Passport:
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={(e) => setINDIAIMAGE(e.target.files)}
                                                    required
                                                />
                                            </div>
                                        </>
                                    )}
                                    <div className="form-group">
                                        <label htmlFor="pwd">User Id:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter User Id"
                                            onChange={(e) => setUSERID(e.target.value)}
                                            minLength={8}
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password:</label>
                                        <div className="input-group">
                                            <input
                                                type={PASSWORDTEXT}
                                                className="form-control"
                                                placeholder="Enter Password"
                                                onChange={(e) => setPASSWORD(e.target.value)}
                                                minLength={8}
                                                maxLength={15}
                                                required
                                            />
                                            <div className="input-group-append">
                                                <span
                                                    className="input-group-text"
                                                    onClick={FUNCTIONMAETHOD}
                                                >
                                                    <i className="far fa-eye"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Create Account
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default REGISTER;
