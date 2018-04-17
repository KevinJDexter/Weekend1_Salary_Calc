// Connect to Express
const express = require('express');

// Initialize Express app
const app = express();
// Set value for which port to use
const PORT = 5000;

// Make so that the app listens to given port when run in terminal
// Required to make so 'localhost:PORT' opens page
app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
})

// Determines where the app looks for the 'index.html' folder
app.use(express.static('server/public'));