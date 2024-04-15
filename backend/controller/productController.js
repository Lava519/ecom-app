const { getProduct, getProducts } = require('../queries/productQueries.js');
const imagePrefix = 'http://localhost:3000/';

const products =  async (req, res) => {
  let data = await getProducts([]);
    for(let i = 0; i < data.length; ++i)
      data[i].Image = `${imagePrefix}${data[i].Image}.jpg`;
    res.status(200).send({products: data});
};

const product =  async (req, res) => {
  const id = req.query.id;
  let data = await getProduct([id]);
  data[0].Image = `${imagePrefix}${data[0].Image}.jpg`;
  res.send({data})
};

const post = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.sendStatus(200);
}

module.exports = {
  products,
  product,
  post
}
