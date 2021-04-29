import React from 'react';
import { Link } from 'react-router-dom';

import './ContactPreview.scss';

export const ContactPreview = ({ contact }) => {
  return (
    <Link to={'/contact/' + contact._id}>
      <div className='contact-Preview'>
        <img
          className='person-img'
          src={`https://i.pravatar.cc/150?u=${contact._id}`}
          alt=''
        />
        <p className='contact-name'>{contact.name}</p>
      </div>
    </Link>
  );
};
