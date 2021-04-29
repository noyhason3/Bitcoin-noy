const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
const asyncLocalStorage = require('../../services/als.service');

async function query(filterBy = {}) {
  try {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('contact');
    const contacts = await collection.find(criteria).toArray();

    return contacts;
  } catch (err) {
    logger.error('cannot find reviews', err);
    throw err;
  }
}

async function getById(contactId) {
  try {
    const collection = await dbService.getCollection('contact');
    // const contact = await collection.findOne({ _id: contactId });
    const contact = await collection.findOne({ _id: ObjectId(contactId) });

    return contact;
  } catch (err) {
    logger.error(`while finding contact ${contactId}`, err);
    throw err;
  }
}

async function remove(contactId) {
  try {
    const store = asyncLocalStorage.getStore();
    // const { userId, isAdmin } = store;
    const collection = await dbService.getCollection('contact');
    // remove only if user is owner/admin
    const query = { _id: ObjectId(contactId) };
    // if (!isAdmin) query.byUserId = ObjectId(userId);
    await collection.deleteOne(query);
    // return await collection.deleteOne({ _id: ObjectId(contactId), byUserId: ObjectId(userId) })
  } catch (err) {
    logger.error(`cannot remove contact ${contactId}`, err);
    throw err;
  }
}

async function add(contact) {
  try {
    // peek only updatable fields!
    const contactToAdd = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };
    const collection = await dbService.getCollection('contact');
    await collection.insertOne(contactToAdd);
    return contactToAdd;
  } catch (err) {
    logger.error('cannot insert contact', err);
    throw err;
  }
}

async function update(contact) {
  try {
    const contactToSave = {
      _id: ObjectId(contact._id),
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };
    const collection = await dbService.getCollection('contact');
    await collection.updateOne(
      { _id: contactToSave._id },
      { $set: contactToSave }
    );
    return contactToSave;
  } catch (err) {
    logger.error('cannot insert contact', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  let criteria = {};
  if (filterBy.name) {
    const txtCriteria = { $regex: filterBy.name, $options: 'i' };
    criteria = {
      name: txtCriteria,
    };
  }
  console.log(criteria);
  return criteria;
}

module.exports = {
  query,
  remove,
  add,
  update,
  getById,
};
