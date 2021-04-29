import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import { bitcoinService } from '../../services/bitcoinService.js';
import './MarketpriceChart.scss';

export const MarketpriceChart = () => {
  const [chartData, setChartData] = useState(null);
  const [chartLabels, setChartLabels] = useState(null);

  useEffect(async () => {
    const chartData = await bitcoinService.getMarketPrice();
    setChartData(chartData.yAxisData);
    setChartLabels(chartData.xAxisData);
  }, []);

  const data = {
    labels: chartLabels,

    datasets: [
      {
        label: 'Average USD market price across major bitcoin exchange',
        data: chartData,
        fill: false,
        backgroundColor: 'orange',
        borderColor: 'orange',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          
        },
        
      ],
    },
    font: {
      size: 26
  },
  };

  return (
    <section className="marketprice-chart">
      <Line data={data} options={options} />
    </section>
  );
};
