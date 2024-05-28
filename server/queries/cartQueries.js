const query = require('./pool.js');

const getCart = async (input) => {
  const QUERY = "SELECT * FROM Cart WHERE UserID=? AND ProductID=?;";
  let data = await query(QUERY, input);
  return data;
} 

const setCart = async (input) => {
  const QUERY = "INSERT INTO Cart (UserID, ProductID, Quantity) VALUES ( ?, ?, ? );";
  let data = await query(QUERY, input);
  return data;
} 

const updateCartItem = async (input) => {
  const QUERY = "UPDATE Cart SET Quantity=Quantity+? WHERE UserID=? AND ProductID=?;";
  let data = await query(QUERY, input)
  return data;
} 

const listCartItems = async (input) => {
  const QUERY = "SELECT Products.ProductID, Products.Image, Products.Name,Products.Price, Cart.Quantity FROM Products RIGHT JOIN Cart ON Products.ProductID = Cart.ProductID WHERE Cart.UserID=?;";
  let data = await query(QUERY, input);
  return data;
} 

const deleteCartItem = async (input) => {
  const QUERY = "DELETE FROM Cart WHERE UserID=? AND ProductID=?;";
  let data = await query(QUERY, input);
  return data;
} 

module.exports = {
  getCart,
  setCart,
  updateCartItem,
  listCartItems,
  deleteCartItem
}
