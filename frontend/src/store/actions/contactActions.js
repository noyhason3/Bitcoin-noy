import { contactService } from '../../services/contactService';

export function loadContacts(filterBy) {
  return async (dispatch) => {
    const contacts = await contactService.query(filterBy);
    dispatch({ type: 'SET_CONTACTS', contacts });
  };
}
export function removeContact(contactId) {
  return async (dispatch) => {
    await contactService.deleteContact(contactId);
    dispatch({ type: 'REMOVE_CONTACT', contactId });
  };
}

export function getContactById(contactId) {
  return async (dispatch) => {
    const contact = await contactService.getById(contactId);
    dispatch({ type: 'SET_CONTACT', contact });
  };
}

export function saveContact(contact) {
  return async (dispatch) => {
    const isAdd = !contact._id;
    const updatedContact = await contactService.saveContact(contact);
    if (isAdd) dispatch({ type: 'ADD_CONTACT', contact: updatedContact });
    else dispatch({ type: 'UPDATE_CONTACT', updatedContact });
  };
}
