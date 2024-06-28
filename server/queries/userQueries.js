const query = require('./pool.js');

const getUser = async (input) => {
  const QUERY = "SELECT UserID, UserName, Password FROM Users WHERE UserName=?;";
  let data = await query(QUERY, input);
  return data;
} 

const setUser = async (input) => {
  const QUERY = 'INSERT INTO Users (FullName, UserName, Password, Avatar, Role) VALUES (?, ?, ?, "none", "Seller");';
  let data = await query(QUERY, input);
  return data;
}

const setImage = async (input) => {
  const QUERY = 'UPDATE Users SET Avatar=? WHERE UserID=?;'
  let data = await query(QUERY, input);
  return data;
}

const authenticateUser = async (input) => {
  const QUERY = 'SELECT FullName, UserName, Avatar, Role FROM Users WHERE UserID = ?;';
  let data = await query(QUERY, input);
  return data;
}

module.exports = {
  getUser,
  setUser,
  setImage,
  authenticateUser
}
