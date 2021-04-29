import React, { useState } from 'react';

export const TransferFund = (props) => {
  const [amount, setAmount] = useState('');

  const handleChange = ({ target }) => {
    console.log(target);
    const value = target.type === 'number' ? +target.value : target.value;
    setAmount(value);
  };

  return (
    <section className='transfer-fund'>
      <h1>Transfer coins to {props.contact.name}:</h1>
      <form
        onSubmit={() => props.onTransferCoins(amount)}
        className='form-basic'
      >
        <div className='basic-container'>
          <label htmlFor='name' className='contact-filter-label'>
            Amount:{' '}
          </label>
          <input
            required
            type='number'
            id='amount'
            name='amount'
            value={amount}
            onChange={handleChange}
          />
        </div>
        <button>Transfer</button>
      </form>
    </section>
  );
};
