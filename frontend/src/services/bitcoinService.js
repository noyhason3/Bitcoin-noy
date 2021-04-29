import { utilService } from './utilService.js';
import axios from 'axios';
import { storageService } from './storageService.js';
var moment = require('moment');

export const bitcoinService = {
  getRate,
  getMarketPrice,
  // getConfirmedTransactions
};

 async function getRate(coins) {
  try {
    const { data } = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    );
    const rate = 2956015242*data;
    // const rate = (1 / data);
    return rate;
  } catch (err) {
    console.log('Service got Error:', err);
  }
}

// function getConfirmedTransactions(){
//     return axios.get(`https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json`)
//     .then(res => {
//         console.log('Service Got Res:', res);
//         return res.data;
//     })
//     .catch(err => {
//         console.log('Service got Error:', err);
//     })
// }

function getMarketPrice() {
  return axios
    .get(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    )
    .then((res) => {
      console.log('Service Got Res:', res);
      const xAxisData = [];
      const yAxisData = [];
      res.data.values.forEach(({ y }) => {
        yAxisData.push(y);
      });
      res.data.values.forEach(({ x }) => {
        const xAsDate = moment(x).format('MM/DD/YYYY - HH:MM')
        xAxisData.push(xAsDate);
      });
      // return res.data;
      return {xAxisData,yAxisData};
    })
    .catch((err) => {
      console.log('Service got Error:', err);
    });
}
