import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import JoLPlayer from "jol-player";
import "./CSS/VIDEOPLAYER.css";

const VIDEO = () => {
    const PARAM = useParams();
    console.log("PARAM", PARAM);

    const videoRef = useRef();
    const [theme, setTheme] = useState("#ffb821");
    const [isShowMultiple, setIsShowMultiple] = useState(true);

    const onProgressMouseUp = (val) => {
        console.log("onProgressMouseUp", val);
    };

    const onEndEd = (val) => {
        console.log("onEndEd", val);
    };

    const onPause = (val) => {
        console.log("onPause", val);
    };

    const onProgressMouseDown = (val) => {
        console.log("onProgressMouseDown", val);
    };

    const onPlay = (val) => {
        console.log("onPlay", val);
    };

    const onTimeChange = (val) => {
        console.log("onTimeChange", val);
    };

    const onvolumechange = (val) => {
        console.log("onvolumechange", val);
    };

    const onError = () => {
        console.log("onError");
    };

    const onQualityChange = (val) => {
        console.log("onQualityChange", val);
    };

    const videoMethod = (status) => {
        if (status === "play") {
            videoRef.current.play();
        } else if (status === "pause") {
            videoRef.current.pause();
        } else if (status === "load") {
            videoRef.current.load();
        } else if (status === "volume") {
            videoRef.current.setVolume(86);
        } else if (status === "seek") {
            videoRef.current.seek(500);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white fixed-top">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/videostaticvideo">
                                    Videos
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br />
            <br />
            <div className="VIDEO-container">
                <video
                    ref={videoRef}
                    src={`${process.env.REACT_APP_BACKEND_URL}/VIDEO/${PARAM.VIDEOONE}`}
                    type="video/mp4"
                    width="55%"
                    controls
                    style={{
                        marginLeft: "10%",
                    }}
                ></video>
                <p style={{
                    marginLeft: "11%",
                }}>{PARAM.TITLE}</p>
            </div>
        </>
    );
}

export default VIDEO;
