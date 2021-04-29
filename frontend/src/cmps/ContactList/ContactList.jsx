import React from 'react';
import { ContactPreview } from '../ContactPreview';
import { Link } from 'react-router-dom';
import './ContactList.scss';

export const ContactList = ({ contacts }) => {
  return (
    <section className='contact-list'>
      <ul className='contact-ul'>
        {contacts.map((contact) => (
          <li key={contact._id} className='contact-li'>
            <ContactPreview contact={contact} />
          </li>
        ))}
      </ul>
      <div className="add-btn-container">
        <Link to={'/contact/edit'} className='btn add-btn'>
          Add
        </Link>
      </div>
    </section>
  );
};
