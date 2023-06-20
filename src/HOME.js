import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';
import './TraderDashboard.css';
import IMAGE from "./IMAGE/pexels-ivan-babydov-7788006.jpg";

const HOME = () => {
    const [showDashboard, setShowDashboard] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userUniqueId, setUserUniqueId] = useState("");
    const [ISPAIDUSER, setISPAIDUSER] = useState(false);

    const navigate = useNavigate();

    const toggleDashboard = () => {
        setShowDashboard(!showDashboard);
    };

    const logoutFunction = () => {
        navigate("/login");
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/USERSIGNDATA`)
            .then((response) => {
                setUserData(response.data);
            });
        setUserUniqueId(localStorage.getItem("USERGENERATEDUNIQUEID"));
    }, []);

    return (
        <div className="user-trading-homepage">
            <header className="header">
                <nav className="navigation">
                    <ul>
                        {/* Add any navigation items here */}
                    </ul>
                </nav>
                {userData.map((value, i) => {
                    if (value.USERGENERATEUNIQUEID === userUniqueId) {
                        return (
                            <h1 className="header-title">Welcome, {value.USERNAME}</h1>
                        );
                    }
                })}
                <div>
                    <button className="logout-button" onClick={logoutFunction}>Logout</button>
                </div>
                {!ISPAIDUSER ? (
                    <>
                        <button type="button" className="upgrade-button">
                            Upgrade
                        </button>
                    </>
                ) : null}
            </header>
            <section className="main-section">
                <aside className={`left-dashboard ${showDashboard ? 'show' : ''}`}>
                    <ul className="dashboard-links">
                        <li>
                            <Link to="/signal">Signal</Link>
                        </li>
                        <li>
                            <Link to="/market">Crypto market</Link>
                        </li>
                        <li>
                            <Link to="/EconomicCalendar">Economic Calendar</Link>
                        </li>
                        <li>
                            <Link to="/CROSSRATE">Crossrate</Link>
                        </li>
                        <li>
                            <Link to="/videostaticvideo">Trading Videos</Link>
                        </li>
                        <li>
                            <Link to="/market">Trade Now</Link>
                        </li>
                    </ul>
                </aside>
                <section className="dashboard-section">
                    {/* Dashboard items */}
                </section>
                <div className="toggle-dashboard-button" onClick={toggleDashboard}>
                    <i className={`fas fa-${showDashboard ? 'chevron-left' : 'chevron-right'}`}></i>
                </div>
            </section>
            <footer className="footer">
                <p>&copy; 2023 jettradefx. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HOME;
