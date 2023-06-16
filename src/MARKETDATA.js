import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CryptoTable = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://cryptocurrency-market.p.rapidapi.com/api/crypto',
        headers: {
          'X-RapidAPI-Key': '20abae5f3dmsh71196f7a8f7a3b4p141095jsn7c0c4b1def65',
          'X-RapidAPI-Host': 'cryptocurrency-market.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        const responseData = response.data;

        if (Array.isArray(responseData.result)) {
          setCryptoData(responseData.result);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (number) => {
    return number.toLocaleString();
  };

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={tableHeaderStyle}>Name</th>
          <th style={tableHeaderStyle}>Symbol</th>
          <th style={tableHeaderStyle}>Current Price</th>
          <th style={tableHeaderStyle}>Market Cap</th>
          <th style={tableHeaderStyle}>Volume</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((crypto) => {
          const priceChangePercentage = crypto.price_change_percentage_24h;
          const priceChangeColor = priceChangePercentage >= 0 ? 'green' : 'red';

          return (
            <tr key={crypto.id}>
              <td style={tableCellStyle}>
                <img src={crypto.image} alt={crypto.name} style={cryptoImageStyle} />
                {crypto.name}
              </td>
              <td style={tableCellStyle}>{crypto.symbol}</td>
              <td style={tableCellStyle}>${formatNumber(crypto.current_price)}</td>
              <td style={tableCellStyle}>${formatNumber(crypto.market_cap)}</td>
              <td style={{ ...tableCellStyle, color: priceChangeColor }}>
                {priceChangePercentage.toFixed(2)}%
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const cryptoImageStyle = {
  width: '20px',
  height: '20px',
  marginRight: '10px',
  verticalAlign: 'middle',
};

export default CryptoTable;
