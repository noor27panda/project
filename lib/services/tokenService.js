const jwt = require("jsonwebtoken")
 
const getToken = (data, expiresIn = "10h") =>
  jwt.sign(data, process.env.secretKey, { expiresIn });
const verifyToken = (token) => {
  let result = null;
  try {
    const payload = jwt.verify(token, process.env.secretKey);
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