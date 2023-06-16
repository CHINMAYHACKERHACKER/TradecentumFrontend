import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import './CSS/TRADESIGNAL.css';

const TRADINGSIGNAL = () => {
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
                functionName: 'TIME_SERIES_INTRADAY',
                params: {
                    interval: '5min',
                    symbol: 'MSFT',
                    datatype: 'json',
                    output_size: 'compact'
                },
            },
            // {
            //     functionName: 'TIME_SERIES_DAILY_ADJUSTED',
            //     params: {
            //         symbol: 'MSFT',
            //         outputsize: 'compact',
            //         datatype: 'json'
            //     },
            // },

            // {
            //     functionName: 'TIME_SERIES_DAILY',
            //     params: {
            //         symbol: 'MSFT',
            //         outputsize: 'compact',
            //         datatype: 'json'
            //     },
            // },

            // {
            //     functionName: 'TIME_SERIES_WEEKLY_ADJUSTED',
            //     params: {
            //         symbol: 'MSFT',
            //         datatype: 'json'
            //     },
            // },
            // {
            //     functionName: 'TIME_SERIES_WEEKLY',
            //     params: {
            //         symbol: 'MSFT',
            //         datatype: 'json'
            //     },
            // },
            // {
            //     functionName: 'TIME_SERIES_MONTHLY_ADJUSTED',
            //     params: {
            //         symbol: 'MSFT',
            //         datatype: 'json'
            //     },
            // },
            // {
            //     functionName: 'TIME_SERIES_MONTHLY',
            //     params: {
            //         symbol: 'MSFT',
            //         datatype: 'json'
            //     },
            // },
            // {
            //     functionName: 'GLOBAL_QUOTE',
            //     params: {
            //         function: 'GLOBAL_QUOTE',
            //         symbol: 'MSFT',
            //         datatype: 'json'
            //     },
            // },
            // {
            //     functionName: 'SYMBOL_SEARCH',
            //     params: {
            //         keywords: 'microsoft',
            //         datatype: 'json'
            //     },
            // },
            // {
            //     functionName: 'GLOBAL_QUOTE',
            //     params: {
            //         symbol: 'TSLA'
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
            if (functionName === 'TIME_SERIES_INTRADAY') {
                timeSeriesData = response.data['Time Series (5min)'];
            } else if (functionName === 'TIME_SERIES_DAILY_ADJUSTED') {
                timeSeriesData = response.data['Time Series (Daily)'];
            } else if (functionName === 'TIME_SERIES_DAILY') {
                timeSeriesData = response.data['Time Series (Daily)'];
            } else if (functionName === 'TIME_SERIES_WEEKLY_ADJUSTED') {
                timeSeriesData = response.data['Weekly Adjusted Time Series'];
            } else if (functionName === 'TIME_SERIES_WEEKLY') {
                timeSeriesData = response.data['Weekly Time Series'];
            } else if (functionName === 'TIME_SERIES_MONTHLY_ADJUSTED') {
                timeSeriesData = response.data['Monthly Adjusted Time Series'];
            } else if (functionName === 'TIME_SERIES_MONTHLY') {
                timeSeriesData = response.data['Monthly Time Series'];
            } else if (functionName === 'GLOBAL_QUOTE') {
                timeSeriesData = { 'Global Quote': response.data['Global Quote'] };
            } else if (functionName === 'SYMBOL_SEARCH') {
                timeSeriesData = response.data['bestMatches'];
            }

            const formattedData = Object.entries(timeSeriesData).map(([timestamp, signalData]) => ({
                timestamp,
                ...signalData,
            }));
            setData((prevData) => {
                return prevData ? [...prevData, ...formattedData] : formattedData;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const formatChartData = () => {
        if (!data) {
            return null;
        }

        const labels = data.map((signal) => signal.timestamp);
        const openValues = data.map((signal) => parseFloat(signal['1. open']));
        const highValues = data.map((signal) => parseFloat(signal['2. high']));
        const lowValues = data.map((signal) => parseFloat(signal['3. low']));
        const closeValues = data.map((signal) => parseFloat(signal['4. close']));
        const volumeValues = data.map((signal) => parseInt(signal['5. volume']));

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

                        <Link className="nav-item nav-link " to="/forex">
                            Forex
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
                                <td>{signal['1. open']}</td>
                                <td>{signal['2. high']}</td>
                                <td>{signal['3. low']}</td>
                                <td>{signal['4. close']}</td>
                                <td>{signal['5. volume']}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
}

export default TRADINGSIGNAL;
