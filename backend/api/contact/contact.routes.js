const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addContact, updateContact,getContact, getContacts, deleteContact} = require('./contact.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getContacts)
router.get('/:id', log, getContact)
router.post('/',  requireAuth, addContact)
// router.put('/:id', updateContact)
router.put('/:id',  requireAuth, updateContact)
router.delete('/:id', deleteContact)
// router.delete('/:id',  requireAuth, deleteContact)

module.exports = router