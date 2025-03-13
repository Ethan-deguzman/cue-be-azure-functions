// services/userService.js
const userRepository = require('../repositories/userRepository');

async function fetchAllUsers() {
  return await userRepository.getAllUsers();
}

module.exports = { fetchAllUsers };
