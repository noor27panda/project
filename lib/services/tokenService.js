const jwt = require("jsonwebtoken")
console.log(process.env.secretkey)

const getToken = (data, expiresIn = "10h") =>
  jwt.sign(data, process.env.secretkey, { expiresIn });
const verifyToken = (token) => {
  let result = null;
  try {
    const payload = jwt.verify(token, process.env.secretkey);
    if (payload) {
      result = payload;
    }
  } catch (e) {
    result = e
  }
  return result;
};

module.exports = {
  getToken,
  verifyToken,
};