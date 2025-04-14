const mysql = require('mysql2');
const pool = mysql.createPool({
  host: '34.46.122.159', // Or use socketPath for Cloud SQL Proxy
  password: 'mysql123',
  database: 'taskdb'
});
module.exports = pool.promise();
