const jwt = require('jsonwebtoken');
require('dotenv').config();
const Vendor = require('../models/Vendor');

const secretKey = process.env.JWT_SECRET;
console.log("JWT_SECRET:", process.env.JWT_SECRET);


const verifyToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "token required re batta!" });
  }

  try {
    console.log("Verifying token with:", secretKey); // DEBUG

    const decoded = jwt.verify(token, secretKey);

    const vendor = await Vendor.findById(decoded.vendorId);
    if (!vendor) {
      return res.status(404).json({ error: "vendor not found" });
    }

    req.vendorId = vendor._id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
