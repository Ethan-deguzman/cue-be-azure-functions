// repositories/userRepository.js
const sql = require('../config/db');

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
    const rows = result.recordset;

    // group rows by user
    const userMap = new Map();
    rows.forEach(row => {
      if (!userMap.has(row.userId)) {
        userMap.set(row.userId, {
          userId: row.userId,
          firstname: row.firstname,
          lastname: row.lastname,
          customers: [],
        });
      }
      if (row.customerId) {
        userMap.get(row.userId).customers.push({
          customerId: row.customerId,
          customerName: row.customerName,
          role: {
            roleId: row.roleId,
            roleName: row.roleName,
          },
        });
      }
    });

    return Array.from(userMap.values());
  } catch (error) {
    console.error('Query error:', error);
    throw error;
  }
}

module.exports = { getAllUsers };
