import React, { useEffect, useState } from 'react';
import { ContactFilter } from '../../cmps/ContactFilter';
import { ContactList } from '../../cmps/ContactList';
import './Contacts.scss';
import { useDispatch, useSelector } from 'react-redux';
import { loadContacts } from '../../store/actions/contactActions';

export const Contacts = () => {
  const [filterBy, setFilterBy] = useState(null);
  const contacts = useSelector((state) => state.contactReducer.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadContacts(filterBy));
  }, [filterBy]);

  const onChangeFilter = (filterBy) => {
    setFilterBy(filterBy);
  };

  return (
    contacts && (
      <div className='contacts'>
        <h1>Contacts</h1>
        <ContactFilter onChangeFilter={onChangeFilter} />
        <ContactList contacts={contacts} />
      </div>
    )
  );
};
