const logger = require('../../services/logger.service');
const userService = require('../user/user.service');
const socketService = require('../../services/socket.service');
const contactService = require('./contact.service');

async function getContact(req, res) {
  try {
      const contact = await contactService.getById(req.params.id);
      console.log('contact', contact);
      res.send(contact);
    } catch (err) {
        logger.error('Failed to get contact', err);
        res.status(500).send({ err: 'Failed to get contact' });
    }
}

async function getContacts(req, res) {
    try {
      const filterBy = req.query
    const contacts = await contactService.query(filterBy);
    res.send(contacts);
  } catch (err) {
    logger.error('Cannot get contacts', err);
    res.status(500).send({ err: 'Failed to get contacts' });
  }
}

async function deleteContact(req, res) {
  try {
    await contactService.remove(req.params.id);
    res.send({ msg: 'Deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete contact', err);
    res.status(500).send({ err: 'Failed to delete contact' });
  }
}

async function updateContact(req, res){
  try{
    const contact = req.body
    const savedContact = await contactService.update(contact);
    res.send(savedContact);
  } catch (err) {
    console.log(err);
    logger.error('Failed to update contact', err);
    res.status(500).send({ err: 'Failed to update contact' });
  }
}

async function addContact(req, res) {
  try {
    var contact = req.body;
    contact.byUserId = req.session.user._id;
    contact = await contactService.add(contact);

    // prepare the updated contact for sending out
    // contact.byUser = await userService.getById(contact.byUserId);
    // contact.aboutUser = await userService.getById(contact.aboutUserId);

    // console.log('CTRL SessionId:', req.sessionID);
    // socketService.broadcast({ type: 'contact-added', data: contact });
    // socketService.emitToAll({
    //   type: 'user-updated',
    //   data: contact.byUser,
    //   room: req.session.user._id,
    // });
    res.send(contact);
  } catch (err) {
    console.log(err);
    logger.error('Failed to add contact', err);
    res.status(500).send({ err: 'Failed to add contact' });
  }
}

module.exports = {
  getContact,
  getContacts,
  deleteContact,
  addContact,
  updateContact
};
