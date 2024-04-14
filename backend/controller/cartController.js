const { deleteCartItem, listCartItems, updateCartItem, getCart, setCart } = require('../queries/cartQueries.js');
const imagePrefix = 'http://localhost:3000/';

const deleteCart = async (req, res) => {
  let conn;
  const userID = req.user.id;
  const productID = req.body.productID;
  let data = deleteCartItem([userID, productID]);
  res.sendStatus(200);
};

const cartItems = async (req, res) => {
  const id = req.user.id;
  let data = await listCartItems([id]);
  for (let i = 0; i < data.length; ++i)
    data[i].Image = `${imagePrefix}${data[i].Image}.jpg`;
  res.send(data);
};

const cart = async (req, res) => {
  const productID = req.body.productID;
  const quantity = req.body.quantity;
  const userID = req.body.userID;
  let data = await getCart([userID, productID]);
    if (data.length != 0)
      data = updateCart([quantity, userID, productID]);
    else
      data = setCart([userID, productID, quantity]);
  res.sendStatus(201);
};

module.exports = {
  deleteCart,
  cartItems,
  cart
}
