// models/userModel.js
function mapUsers(rows) {
    const userMap = new Map();

    rows.forEach((row) => {
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
}

module.exports = { mapUsers };
