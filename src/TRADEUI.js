import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

const TRADEUI = () => {
    const [USERPAYEDDATA, setUSERPAYEDDATA] = useState([]);
    const [USERPAYEDUNIQUEID, setUSERPAYEDUNIQUEID] = useState("");
    const NAVIGATE = useNavigate();

    const REGISTERFUNCTION = () => {
        NAVIGATE("/Email");
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/CHARGES`).then((res) => {
            setUSERPAYEDDATA(res.data);
        });
        setUSERPAYEDUNIQUEID(localStorage.getItem("USERPAYINGUNIQUEID"));
    }, []);

   useEffect(() => {
  if (Array.isArray(USERPAYEDDATA) && USERPAYEDDATA.length > 0) {
    const userPayedData = USERPAYEDDATA.find(
      (value) =>
        value.USERUNIQUEID === USERPAYEDUNIQUEID && value.USEREMAILEMAIL === value.EMAIL
    );
    if (userPayedData) {
      NAVIGATE("/register");
    }
  }
}, [USERPAYEDDATA, USERPAYEDUNIQUEID, NAVIGATE]);


    return (
        <div className="homepage">
            <header className="hero-section">
                <h1>Welcome to JETTRADE FX</h1>
                <p>Explore the world of currency trading</p>
                <div className="button-group">
                    <button
                        type="button"
                        className="bt"
                        style={{ marginLeft: "37%" }}
                        onClick={REGISTERFUNCTION}
                    >
                        Register
                    </button>
                    <div className="button-gap" />
                    <button className="bt">Learn More</button>
                </div>
            </header>

            <section className="features-section">
                <div className="feature">
                    <i className="fas fa-chart-line"></i>
                    <h3>Real-Time Trading</h3>
                    <p>Access live currency exchange rates and trade in real-time.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-calendar-alt"></i>
                    <h3>Market Analysis</h3>
                    <p>Stay updated with market trends and make informed trading decisions.</p>
                </div>
                <div className="feature">
                    <i className="fas fa-globe"></i>
                    <h3>Global Market</h3>
                    <p>Trade in the forex market which operates 24/5 across different time zones.</p>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to start trading?</h2>
                <button className="btn">Create an Account</button>
            </section>

            <footer className="footer">
                <p>Copyright @jettradefx 2023. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TRADEUI;
