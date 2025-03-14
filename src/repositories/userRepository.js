// repositories/userRepository.js
const sql = require('../config/db');
const { mapUsers } = require('../models/userModel');

async function getAllUsers() {
  const query = `
    SELECT
      u.USER_ID AS userId,
      u.FIRSTNAME AS firstname,
      u.LASTNAME AS lastname,
      c.CUSTOMER_ID AS customerId,
      c.NAME AS customerName,
      r.ROLE_ID AS roleId,
      r.NAME AS roleName
    FROM [dbo].[USER] u
    LEFT JOIN [dbo].[CUSTOMER_USER_MAP] uc ON u.USER_ID = uc.USER_ID
    LEFT JOIN [dbo].[CUSTOMER] c ON uc.CUSTOMER_ID = c.CUSTOMER_ID
    LEFT JOIN [dbo].[ROLE] r ON uc.ROLE_ID = r.ROLE_ID
  `;
  try {
    const result = await sql.query(query);
    return mapUsers(result.recordset);
} catch (error) {
    console.error('Query error:', error);
    throw error;
}
}

module.exports = { getAllUsers };