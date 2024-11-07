import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          'https://api.currencyfreaks.com/v2.0/rates/latest?apikey=1218b6ef8d6c407a81ed610b9b8a70bb&symbols=CAD,IDR,JPY,CHF,EUR,GBP'
        );
        const rates = response.data.rates;

        const formattedRates = [
          { currency: 'CAD', rate: parseFloat(rates.CAD) },
          { currency: 'IDR', rate: parseFloat(rates.IDR) },
          { currency: 'JPY', rate: parseFloat(rates.JPY) },
          { currency: 'CHF', rate: parseFloat(rates.CHF) },
          { currency: 'EUR', rate: parseFloat(rates.EUR) },
          { currency: 'GBP', rate: parseFloat(rates.GBP) },
        ].map(({ currency, rate }) => ({
          currency,
          exchangeRate: rate,
          weBuy: rate * 1.05,
          weSell: rate * 0.95,
        }));

        setExchangeRates(formattedRates);
      } catch (error) {
        console.error("Error fetching exchange rates", error);
      }
    };

    fetchExchangeRates();
  }, []);

  return (
    <div className="app-container">
      <h1>Currency Exchange Rates</h1>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy</th>
            <th>Exchange Rate</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map(({ currency, weBuy, exchangeRate, weSell }) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{weBuy.toFixed(4)}</td>
              <td>{exchangeRate.toFixed(4)}</td>
              <td>{weSell.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='info-text'>
        Rates are based on 1 USD <br />
        This application uses API from currencyfreaks.com       
      </p>
    </div>
  )
}

export default App;
