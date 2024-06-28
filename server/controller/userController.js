const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require("fs");
const { getUser, setUser, setImage, authenticateUser } = require('../queries/userQueries.js');

const imagePrefix = 'http://localhost:3000/';
const register = async (req, res) => {
  const fname = req.body.fname;
  const username = req.body.username;
  const password = req.body.password;
  if ( fname && username && password ) {
    if( fname.length > 4 && username.length > 4 && password.length > 4 ) {
      let user = await getUser([username]);
      if ( user.length > 0 )
        return res.sendStatus(202);
      else {
        bcrypt.genSalt(saltRounds, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
            user = await setUser([fname, username, hash]);
          })
        })
      }
      return res.status(200).send();
    }
  }
  return res.sendStatus(400);
}


const getUserID  = (req, res) => {
  res.send({id: req.user.id});
}

const login = async (req, res)=> {
  const username = req.body.username;
  const password = req.body.password;
  let user = await getUser([username]);
  if (user.length === 0)
    res.status(202).send({message: "Wrong Username"});
  else {
    const id = user[0].UserID;
    const hash = user[0].Password;
    bcrypt.compare(password, hash, function (err, result) {
      if (result) {
        const accessToken = jwt.sign({ exp: Math.floor(Date.now() / 1000) + 60*60*24, user: username, id: id }, process.env.JWT_SECRET);
        res.json({ accessToken: accessToken });
      }
      else
        res.status(202).send({message: "Wrong Password"});
    });
  }     
}

const image = async( req, res ) => {
  const image = req.body.Image;
  const id = req.body.UserID;
  const fileName = `avatar-${id}`;
  const path = __dirname + '/../images/' + fileName+".jpg";
  const bufferData = Buffer.from(image.split(',')[1], 'base64');
  fs.writeFile(path, bufferData, async () => {
    await setImage([fileName, id]);;
  });
  res.sendStatus(200);
}

const authenticate = async (req, res) => {
  const id = req.user.id;
  let data = await authenticateUser([id]);
  data[0].Avatar = `${imagePrefix}${data[0].Avatar}.jpg`;
  res.send({data});
}

module.exports = {
  login,
  register,
  authenticate,
  image,
  getUserID,
}
