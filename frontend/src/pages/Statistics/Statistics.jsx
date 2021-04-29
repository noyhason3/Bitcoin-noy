import React from 'react';
import { MarketpriceChart } from '../../cmps/MarketpriceChart';
import './Statistics.scss';


export const Statistics = () => {
  return (
    <section className="statistics">
      <h1 className="marketprice-chart-title">Market Price (USD)</h1>
      <MarketpriceChart />
    </section>
  );
};
