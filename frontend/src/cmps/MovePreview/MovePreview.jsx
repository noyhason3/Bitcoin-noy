import React from 'react';
import './MovePreview.scss';
var moment = require('moment');

export const MovePreview = ({ move }) => {
  return (
    <div className='move-preview'>
      <p className='move-to'>To: {move.to}</p>
      <p className='move-at'>
        At: {moment(move.at).format('MM/DD/YYYY, HH:MM')}
      </p>
      <p className='move-amount'>Amount: {move.amount} coins</p>
    </div>
  );
};
