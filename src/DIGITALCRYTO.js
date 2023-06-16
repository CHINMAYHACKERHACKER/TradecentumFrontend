import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import './CSS/TRADESIGNAL.css';

const DIGITALCRYTO = () => {
    const [data, setData] = useState(null);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [ISPAIDUSER, setISPAIDUSER] = useState(false);

    useEffect(() => {
        fetchAllTimeSeriesData();
        const interval = setInterval(fetchAllTimeSeriesData, 60000); // Fetch data every minute
        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    const fetchAllTimeSeriesData = async () => {
        const timeSeriesFunctions = [
            {
                functionName: 'DIGITAL_CURRENCY_WEEKLY',
                params: {
                    market: 'CNY',
                    symbol: 'BTC',
                },
            },
            // {
            //     functionName: 'CURRENCY_EXCHANGE_RATE',
            //     params: {
            //         from_currency: 'BTC',
            //         to_currency: 'USD',
            //     },
            // },
            // {
            //     functionName: 'DIGITAL_CURRENCY_DAILY',
            //     params: {
            //         market: 'CNY',
            //         symbol: 'BTC',
            //     },
            // },
            // {
            //     functionName: 'DIGITAL_CURRENCY_MONTHLY',
            //     params: {
            //         market: 'CNY',
            //         symbol: 'BTC',
            //     },
            // },
        ];

        for (const { functionName, params } of timeSeriesFunctions) {
            await fetchData(functionName, params);
        }
    };

    const fetchData = async (functionName, params) => {
        try {
            const APIKEY = ISPAIDUSER ? 'PAID_API_KEY' : '20abae5f3dmsh71196f7a8f7a3b4p141095jsn7c0c4b1def65';
            const response = await axios.get('https://alpha-vantage.p.rapidapi.com/query', {
                params: {
                    function: functionName,
                    ...params, // Include additional parameters for the API call
                },
                headers: {
                    'X-RapidAPI-Key': APIKEY,
                    'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                },
            });

            // Process the response data based on the function name
            let timeSeriesData = null;
            if (functionName === 'DIGITAL_CURRENCY_WEEKLY') {
                timeSeriesData = response.data['Time Series (Digital Currency Weekly)'];
            } else if (functionName === 'CURRENCY_EXCHANGE_RATE') {
                timeSeriesData = response.data['Realtime Currency Exchange Rate'];
            } else if (functionName === 'DIGITAL_CURRENCY_DAILY') {
                timeSeriesData = response.data['Time Series (Digital Currency Daily)'];
            } else if (functionName === 'DIGITAL_CURRENCY_MONTHLY') {
                timeSeriesData = response.data['Time Series (Digital Currency Monthly)'];
            }

            const formattedData = Object.entries(timeSeriesData).map(([timestamp, signalData]) => ({
                timestamp,
                ...signalData,
            }));
            setData((prevData) => (prevData ? [...prevData, ...formattedData] : formattedData));
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const formatChartData = () => {
        if (!data) {
            return null;
        }

        const labels = data.map((signal) => signal.timestamp);
        const openValues = data.map((signal) => parseFloat(signal['1a. open (CNY)']));
        const highValues = data.map((signal) => parseFloat(signal['2a. high (CNY)']));
        const lowValues = data.map((signal) => parseFloat(signal['3a. low (CNY)']));
        const closeValues = data.map((signal) => parseFloat(signal['4a. close (CNY)']));
        const volumeValues = data.map((signal) => parseFloat(signal['5. volume']));
        const marketcapValues = data.map((signal) => parseFloat(signal['6. market cap (USD)']));

        return {
            labels,
            datasets: [
                {
                    label: 'Open',
                    data: openValues,
                    borderColor: '#8884d8',
                    pointRadius: 0,
                },
                {
                    label: 'High',
                    data: highValues,
                    borderColor: '#FF0000',
                    pointRadius: 0,
                },
                {
                    label: 'Low',
                    data: lowValues,
                    borderColor: '#00FF00',
                    pointRadius: 0,
                },
                {
                    label: 'Close',
                    data: closeValues,
                    borderColor: '#0000FF',
                    pointRadius: 0,
                },
                {
                    label: 'Volume',
                    data: volumeValues,
                    borderColor: '#FFFF00',
                    pointRadius: 0,
                },
                {
                    label: 'Market Cap',
                    data: marketcapValues,
                    borderColor: '#FFA500',
                    pointRadius: 0,
                },
            ],
        };
    };

    const handlePointClick = (points) => {
        if (points.length > 0) {
            const selectedTimestamp = points[0].xLabel;
            const selectedDataPoint = data.find((signal) => signal.timestamp === selectedTimestamp);
            setSelectedPoint(selectedDataPoint);
        }
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
                        <Link className="nav-item nav-link " to="/signal">
                            Stock Time Series
                        </Link>

                        <Link className="nav-item nav-link " to="/crypto">
                            Digital And Cryptocurrency
                        </Link>

                        <Link className="nav-item nav-link " to="/TechnicalSignal">
                            Technical Indicators
                        </Link>
                    </div>
                    {/* {!ISPAIDUSER ? (
                        <>
                            <button type="button" className="btn btn-primary" style={{ marginLeft: '50%', marginTop: '0%' }}>
                                Upgrade
                            </button>
                        </>
                    ) : null} */}
                </div>
            </nav>

            <div className="chart-container">
                {data ? (
                    <>
                        <Line
                            data={formatChartData()}
                            options={{
                                onClick: (_, points) => handlePointClick(points),
                            }}
                        />
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                        <th>Volume</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((signal) => (
                            <tr
                                key={signal.timestamp}
                                className={selectedPoint?.timestamp === signal.timestamp ? 'selected' : ''}
                            >
                                <td>{signal.timestamp}</td>
                                <td>{signal['1a. open (CNY)']}</td>
                                <td>{signal['2a. high (CNY)']}</td>
                                <td>{signal['3a. low (CNY)']}</td>
                                <td>{signal['4a. close (CNY)']}</td>
                                <td>{signal['5. volume']}</td>
                                <td>{signal['6. market cap (USD)']}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default DIGITALCRYTO;
