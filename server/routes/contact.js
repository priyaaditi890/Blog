
const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// Define route handler for the contact page
router.get('/contact', (req, res) => {
  // Render the contact page view
  res.render('contact'); // Assuming you have a view named contact.ejs
});

// Define route handler to save contact form data to MongoDB
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Create a new contact instance
    const newContact = new Contact({
      name,
      email,
      message
    });
    // Save the contact to the database
    await newContact.save();
    res.send('Contact saved successfully!');
  } catch (error) {
    res.status(500).send('Error saving contact: ' + error.message);
  }
});

// Export the router
module.exports = router;
