import React, { useState } from 'react';
import axios from 'axios';

const CROSSRATE = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [error, setError] = useState(null);

  const convertCurrency = async () => {
    setError(null);

    const options = {
      method: 'GET',
      url: 'https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert',
      params: {
        from: 'USD',
        to: 'EUR',
        amount,
      },
      headers: {
        'X-RapidAPI-Key': '20abae5f3dmsh71196f7a8f7a3b4p141095jsn7c0c4b1def65',
        'X-RapidAPI-Host': 'currency-conversion-and-exchange-rates.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setConvertedAmount(response.data.result);
    } catch (error) {
      setError('An error occurred during the currency conversion.');
      console.error(error);
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    convertCurrency();
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0',
  };

  const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div>
      <div className="card" style={cardStyle}>
        <form onSubmit={handleSubmit}>
          <label>
            Amount:
            <input type="number" value={amount} onChange={handleAmountChange} style={inputStyle} />
          </label>
          <button type="submit" style={buttonStyle}>Convert</button>
        </form>

        {convertedAmount && (
          <>
            <h2>Conversion Result</h2>
            <p>From: USD</p>
            <p>To: EUR</p>
            <p>Amount: {amount}</p>
            <p>Converted Amount: {convertedAmount}</p>
          </>
        )}

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default CROSSRATE;
