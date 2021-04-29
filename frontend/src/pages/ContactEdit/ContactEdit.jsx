import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { contactService } from '../../services/contactService';
import { saveContact } from '../../store/actions/contactActions';
import './ContactEdit.scss';

export const ContactEdit = (props) => {
  const [contact, setContact] = useState(null);
  const [errMsg, setErrMsg] = useState('');
  const dispatch = useDispatch();

  useEffect(async () => {
    const { id } = props.match.params;
    try {
      const contact = id
        ? await contactService.getById(id)
        : contactService.getEmptyContact();
      setContact(contact);
    } catch (err) {
      setErrMsg({ errMsg: 'Contact Not Found!' });
    }
  }, []);

  const onSaveContact = async (ev) => {
    ev.preventDefault();
    await dispatch(saveContact(contact));
    props.history.push('/contacts');
  };

  const handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    setContact({ ...contact, [field]: value });
  };

  if (!contact) return <div>{errMsg || 'Loading...'}</div>;
  const { name, phone, email } = contact;
  return (
    <form className='contact-edit' onSubmit={onSaveContact}>
      <label htmlFor='name'>Name</label>
      <input
        required
        type='text'
        id='name'
        value={name}
        onChange={handleChange}
        name='name'
      />

      <label htmlFor='phone'>phone</label>
      <input
        required
        type='text'
        id='phone'
        value={phone}
        onChange={handleChange}
        name='phone'
      />

      <label htmlFor='email'>email</label>
      <input
        required
        type='email'
        id='email'
        value={email}
        onChange={handleChange}
        name='email'
      />

      <button className='btn'>Save Contact</button>
    </form>
  );
};
