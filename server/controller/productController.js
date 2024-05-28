const { getProduct, getProducts, getMaxProductID, uploadProduct } = require('../queries/productQueries.js');
const fs = require("fs");
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


const upload = async (req, res) => {
  console.log('size', req.body.Image.length);
  let file = req.body.Image;
  const userID = req.body.UserID;
  const maxID = await getMaxProductID();
  const fileName = `product-${maxID}-${userID}`;
  console.log(maxID);
  const path = __dirname + '/../images/' + fileName +".jpg";
  const bufferData = Buffer.from(file.split(',')[1], 'base64');
  fs.writeFile(path, bufferData, async () => {
    await uploadProduct([userID, req.body.Name, req.body.Description, req.body.Price, fileName]);
  });
  res.sendStatus(200);
}

module.exports = {
  products,
  product,
  upload
}
