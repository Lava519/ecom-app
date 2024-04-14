const mariadb = require('mariadb');
require('dotenv').config();

const pool = mariadb.createPool({ 
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE 
});

const query = async(QUERY, input) => {
  let conn;
  let data;
  try {
    conn = await pool.getConnection();
    data = await conn.query(QUERY, input);
  } catch (err) {
    console.log(err);
  } finally {
    if ( conn ) conn.release();
  }
  return data;
}

module.exports = query;
