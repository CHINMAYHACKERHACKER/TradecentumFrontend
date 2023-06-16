import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import "./CSS/TECHSIGNAL.css";

const TECHNICALSIGNAL = () => {
    const [data, setData] = useState(null);
    const [ISPAIDUSER, setISPAIDUSER] = useState(false);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000); // Fetch data every minute
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    const fetchData = async () => {
        try {
            const APIKEY = ISPAIDUSER ? 'PAID_API_KAY' : '20abae5f3dmsh71196f7a8f7a3b4p141095jsn7c0c4b1def65';
            const response = await axios.get('https://alpha-vantage.p.rapidapi.com/query', {
                params: {
                    time_period: '60',
                    interval: '5min',
                    series_type: 'close',
                    function: 'SMA',
                    symbol: 'MSFT',
                    datatype: 'json',
                },
                headers: {
                    'X-RapidAPI-Key': APIKEY,
                    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                },
            });
            const indicatorData = response.data['Technical Analysis: SMA'];
            setData(indicatorData);
        } catch (error) {
            console.error(error);
        }
    };

    const formatChartData = () => {
        if (!data) {
            return null;
        }

        const labels = Object.keys(data);
        const values = Object.values(data).map((entry) => parseFloat(entry['SMA']));

        return {
            labels,
            datasets: [
                {
                    label: 'SMA',
                    data: values,
                    borderColor: '#8884d8',
                    pointRadius: 0,
                },
            ],
        };
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/signal">
                            Stock Time Series
                        </Link>
                        <Link className="nav-item nav-link" to="/forex">
                            Forex
                        </Link>
                        <Link className="nav-item nav-link" to="/crypto">
                            Digital And Cryptocurrency
                        </Link>
                    </div>
                    {/* {!ISPAIDUSER ? (
                        <>
                            <button type="button" className="btn btn-primary" style={{ marginLeft: '61%', marginTop: '0%' }}>
                                Upgrade
                            </button>
                        </>
                    ) : null} */}
                </div>
            </nav>

            <div className="chart-container">
                {data ? (
                    <>
                        <Line data={formatChartData()} />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

        </>
    );
}

export default TECHNICALSIGNAL;
