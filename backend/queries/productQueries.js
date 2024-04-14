const query = require('./pool.js');

const getProduct = async (input) => {
  const QUERY = "SELECT ProductID, Name, Description, Price, Image FROM Products WHERE ProductID=?;";
  let data = await query(QUERY, input);
  return data;
} 

const getProducts = async (input) => {
  const QUERY = "SELECT ProductID, Name, Description, Price, Image FROM Products;";
  let data = await query(QUERY, input);
  return data;
} 

module.exports = {
  getProduct,
  getProducts
}
