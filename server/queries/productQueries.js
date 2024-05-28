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
const getMaxProductID = async () => {
  const QUERY = "SELECT COUNT(ProductID) as id from Products;"
  let res = await query(QUERY);
  data = res[0].id;
  return data;
}
const uploadProduct = async (input) => {

  const QUERY = "INSERT INTO Products ( SellerID, Name, Description, Price, Image ) VALUES (?, ?, ?, ?, ?);"
  let data = await query(QUERY, input);
  return data;
}
module.exports = {
  getProduct,
  getProducts,
  getMaxProductID,
  uploadProduct
}
