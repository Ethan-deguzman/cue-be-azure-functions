const { app } = require('@azure/functions');
const userService = require('../services/userService');
const createHandler = require('azure-function-express').createHandler;
const expressApp = require('../expressApp');

app.http('getUsers', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    try {
      const users = await userService.fetchAllUsers();
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users),
      };
    } catch (error) {
      // 🔹 FIX: Use `context.error` instead of `context.log.error`
      context.error('Error in getUsers function:', error);
      
      return {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
      };
    }
  },
});
module.exports = createHandler(expressApp);