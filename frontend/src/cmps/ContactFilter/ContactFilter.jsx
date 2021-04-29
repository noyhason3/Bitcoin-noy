import React from 'react';
import { useForm } from '../../hooks/useForm';
import './ContactFilter.scss';

export const ContactFilter = (props) => {
  const [filterBy, handleChange] = useForm({ name: '' }, props.onChangeFilter);

  const { name } = filterBy;
  return (
    <form
      onSubmit={(ev) => ev.preventDefault()}
      className='contact-filter-container'
    >
      <label htmlFor='name' className='contact-filter-label'>
        Search:{' '}
      </label>
      <input
        type='text'
        id='name'
        name='name'
        value={name}
        onChange={handleChange}
        className='contact-filter-input'
      />
    </form>
  );
};
