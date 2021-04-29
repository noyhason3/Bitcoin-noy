import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { signUp } from '../../store/actions/userActions';
import './Signup.scss';

export const Signup = () => {
  let [userCred, setUserCred] = useState({
    fullname: '',
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = ({ target }) => {
    let field = target.name;
    let value = target.value;
    setUserCred({ ...userCred, [field]: value });
  };

  const onSignup = async (ev) => {
    ev.preventDefault();
    await dispatch(signUp(userCred));
    history.push('/');
  };

  return (
    <section className='signup'>
      <h1>Please enter your details:</h1>

      <form onSubmit={onSignup} className='form-basic'>
        <h2>Signup</h2>

        <div className='basic-container'>
          <label htmlFor='fullname' className='contact-filter-label'>
            fullname:{' '}
          </label>
          <input
            required
            type='text'
            id='fullname'
            name='fullname'
            value={userCred.fullname}
            onChange={handleChange}
          />
        </div>
        <div className='basic-container'>
          <label htmlFor='username' className='contact-filter-label'>
            username:{' '}
          </label>
          <input
            required
            type='text'
            id='username'
            name='username'
            value={userCred.username}
            onChange={handleChange}
          />
        </div>
        <div className='basic-container'>
          <label htmlFor='password' className='contact-filter-label'>
            password:{' '}
          </label>
          <input
            required
            type='text'
            id='password'
            name='password'
            value={userCred.password}
            onChange={handleChange}
          />
        </div>
        <button>Sign up</button>
      </form>
    </section>
  );
};
