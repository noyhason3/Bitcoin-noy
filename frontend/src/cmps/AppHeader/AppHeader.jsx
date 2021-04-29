import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import hamburger from '../../assets/imgs/icon-hamburger.svg';

import './AppHeader.scss';

export const AppHeader = () => {
  const history = useHistory();

  const toggleMenu = () => {
    document.querySelector('.nav-bar').classList.toggle('open');
    document.querySelector('.main-screen').classList.toggle('open');
  };

  return (
    <section className='app-header'>
      <div className='main-screen' onClick={() => toggleMenu()}></div>

      <h1 onClick={() => history.push('/')} className='app-icon'>
        Mr.Bitcoin
      </h1>
      <button onClick={() => toggleMenu()} className='menu-btn'>
        <img  src={hamburger} alt='' />
      </button>
      <div className='nav-bar' onClick={() => toggleMenu()}>
        <NavLink className='nav-link' to='/'>
          Home{' '}
        </NavLink>
        <NavLink className='nav-link' to='/contacts'>
          Contacts{' '}
        </NavLink>
        <NavLink className='nav-link' to='/statistics'>
          Statistics
        </NavLink>
        <NavLink className='nav-link' to='/signup'>
          Sign-up!
        </NavLink>
      </div>
    </section>
  );
};
