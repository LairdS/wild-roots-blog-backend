const jwt = require("jsonwebtoken");
const models = require("../models/");

const auth = (req, res, next) => {
     try {
    const token = req.header('x-auth-token');
    if (!token) 
        return res.status(401).json({ msg: 'No authentication token. Authorization denied.'});

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified)
         return res.status(401).json({ msg: 'Verification failed. Authorization denied.'});

    req.user = verified.id;
    next();
     } catch (err) {
         res.status(500).json({ error: err.message });
     }
    
  }; 
  
  module.exports = auth 

/*authService = {
  signUser: function (user) {
    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
      },
      "secretkey",
      {
        expiresIn: "1h",
      }
    );
    return token;
  },
};

module.exports = authService; */