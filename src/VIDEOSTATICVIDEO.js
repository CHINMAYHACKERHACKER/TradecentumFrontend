import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VIDEOSTATICVIDEO = () => {
    const [USERVIDEOLIST, setUSERVIDEOLIST] = useState([]);
    const [SEARCH, setSEARCH] = useState("");
    const navigate = useNavigate();

    const METHOD = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERVIDEOVIDEO`);
            setUSERVIDEOLIST(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const VIDEOFUNCTION = (
        ID,
        VIDEOONE,
        TITLE
    ) => {
            navigate(`/video/${VIDEOONE}/${TITLE}/${ID}`);
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        METHOD();
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary bg-white fixed-top">
                <div className="container-fluid">
                    <div
                        className="input-group input-group-sm mb-1 rounded-pill"
                        style={{ maxWidth: "500px", marginRight: "25%" }}
                    >
                        <input
                            type="text"
                            className="form-control rounded-start"
                            placeholder="Search Videos"
                            aria-label="Search"
                            aria-describedby="search-button"
                            onChange={(e) => setSEARCH(e.target.value)}
                        />
                    </div>
                </div>
            </nav>
            <br />
            <br />

            <div
                className="video-container"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                {USERVIDEOLIST
                    .filter((value) => {
                        if (SEARCH === "") {
                            return value;
                        } else if (
                            value.TITLE.toLowerCase().includes(SEARCH.toLowerCase())
                        ) {
                            return value;
                        }
                    })
                    .map((value, index) => (
                        <div
                            key={index}
                            className="video-item"
                            style={{
                                width: "30%",
                                margin: "10px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div
                                className="video-wrapper"
                                style={{
                                    width: "100%",
                                    position: "relative",
                                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)",
                                }}
                            ><br/>
                                <video
                                    src={`${process.env.REACT_APP_BACKEND_URL}/${value.VIDEOONE}`}
                                    type="video/mp4"
                                    style={{
                                        width: "100%",
                                        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.3)", // Adding the box shadow directly to the video
                                    }}
                                    onClick={() =>
                                        VIDEOFUNCTION(
                                            value.id,
                                            value.VIDEOONE,
                                            value.TITLE
                                        )
                                    }
                                ></video>
                            </div>
                            <br />
                            <p
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                <h6>{value.TITLE}</h6>
                            </p>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default VIDEOSTATICVIDEO;
