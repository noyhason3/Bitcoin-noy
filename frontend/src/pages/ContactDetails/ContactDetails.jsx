import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { transferCoins } from '../../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactById,
  removeContact,
} from '../../store/actions/contactActions';

import './ContactDetails.scss';
import { TransferFund } from '../../cmps/TransferFund/TransferFund';
import { MoveList } from '../../cmps/MoveList';

export const ContactDetails = (props) => {
  const contact = useSelector((state) => state.contactReducer.currContact);
  const user = useSelector((state) => state.userReducer.currUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactById(props.match.params.id));
    console.log(props);
  }, [props.match.params.id]);

  const onRemoveContact = async () => {
    await dispatch(removeContact(contact._id));
    props.history.goBack();
  };

  const onTransferCoins = async (amount) => {
    console.log(amount);
    await dispatch(transferCoins({ contact, amount }));
    props.history.push('/');
  };

  const getMoves = () => {
    const moves = user?.moves?.filter((move) => {
      return move.to === contact.name;
    });
    return moves;
  };
  if (!contact) return <div>Loading contact.....</div>;
  return (
    <section className='contact-details'>
      <p>Name: {contact.name}</p>
      <p>
        <img
          className='person-img'
          src={`https://i.pravatar.cc/150?u=${contact._id}`}
          alt=''
        />
      </p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>

      <TransferFund contact={contact} onTransferCoins={onTransferCoins} />
      <MoveList moves={getMoves()} />

      <div className='nav-btns'>
        <button onClick={onRemoveContact} className='btn'>
          Delete
        </button>
        <button className='btn'>
          <Link className='link' to={'/contact/edit/' + contact._id}>
            Edit
          </Link>
        </button>
        <button className='btn back-btn'>
          <Link className='link' to='/contacts'>
            Back
          </Link>
        </button>
      </div>
    </section>
  );
};
