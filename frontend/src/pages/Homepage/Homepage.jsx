import React, { useEffect, useState } from 'react';
import { bitcoinService } from '../../services/bitcoinService';
import bitcoin from '../../assets/imgs/bitcoin.png';
import coins from '../../assets/imgs/coins.png';
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import './Homepage.scss';
import { MoveList } from '../../cmps/MoveList';

export const Homepage = () => {
  const [rate, setRate] = useState(null);
  const user = userService.getLoggedinUser() || {
    _id: 'guest',
    fullname: 'guest',
    username: 'guest',
    coins: 100,
  };

  useEffect(async () => {
    const rate = await bitcoinService.getRate(user.coins);
    setRate(rate.toLocaleString() + '$');
  }, []);

  return (
    <section className='homepage'>
      <div className='user-container'>
        <img
          className='person-img'
          src={`https://i.pravatar.cc/150?u=${user._id}`}
          alt=''
        />
        <h1 className='title'>Hello {user?.fullname}!</h1>
      </div>

      <div className='coins-container'>
        <img className='coins-img' src={coins} alt='' />
        <h2>Coins : {user?.coins}</h2>
      </div>
      <div className='BTC-container'>
        <img className='bitcoin-img' src={bitcoin} alt='' />
        <h2>BTC as USD : {rate}</h2>
      </div>

      <MoveList moves={user?.moves?.slice(-3, user.moves.length)} />
    </section>
  );
};
