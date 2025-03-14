const express = require('express');
const userService = require('./services/userService');

const app = express();
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = app;
