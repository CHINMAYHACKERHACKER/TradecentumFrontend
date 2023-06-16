import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EconomicCalendar = () => {
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date
        const response = await axios.get(
          `https://financialmodelingprep.com/api/v3/economic_calendar?from=${currentDate}&apikey=ef79243d91460cb4950ce95ba7f68204`
        );
        const latestData = response.data;

        // Get previous day's data
        const previousDate = new Date();
        previousDate.setDate(previousDate.getDate() - 1);
        const formattedPreviousDate = previousDate.toISOString().split('T')[0];
        const previousResponse = await axios.get(
          `https://financialmodelingprep.com/api/v3/economic_calendar?from=${formattedPreviousDate}&apikey=ef79243d91460cb4950ce95ba7f68204`
        );
        const previousData = previousResponse.data;

        // Combine latest and previous data
        const combinedData = [...latestData, ...previousData];
        setCalendarData(combinedData);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchData();
  }, []);

  const getImpactColor = (impact) => {
    if (impact === 'High') {
      return '#ff0000'; // Red for high impact
    } else if (impact === 'Medium') {
      return '#ffa500'; // Orange for medium impact
    } else {
      return '#008000'; // Green for low impact
    }
  };

  const tableHeaderStyles = {
    borderBottom: '1px solid #ccc',
    padding: '10px',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '14px',
  };

  return (
    <div>
      <h1>Economic Calendar</h1>
      <table
        style={{
          borderCollapse: 'collapse',
          width: '100%',
          border: '1px solid #ccc',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          borderRadius: '5px',
        }}
      >
        <thead>
          <tr>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Event</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Date</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Country</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Actual</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Previous</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Change</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Change Percentage</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Estimate</th>
            <th style={{ backgroundColor: '#f2f2f2', ...tableHeaderStyles }}>Impact</th>
          </tr>
        </thead>
        <tbody>
          {calendarData.map((event, index) => (
            <tr
              key={index}
              style={{
                borderBottom: '1px solid #ccc',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
              }}
            >
              <td style={{ padding: '10px' }}>{event.event}</td>
              <td style={{ padding: '10px' }}>{event.date}</td>
              <td style={{ padding: '10px' }}>{event.country}</td>
              <td style={{ padding: '10px' }}>{event.actual}</td>
              <td style={{ padding: '10px' }}>{event.previous}</td>
              <td style={{ padding: '10px' }}>{event.change}</td>
              <td style={{ padding: '10px' }}>{event.changePercentage}</td>
              <td style={{ padding: '10px' }}>{event.estimate}</td>
              <td
                style={{
                  padding: '10px',
                  color: '#fff',
                  backgroundColor: getImpactColor(event.impact),
                }}
              >
                {event.impact}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EconomicCalendar;
