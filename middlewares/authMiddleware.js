const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWFmNTViMzRhNGVjYmUwOTEzMWJmZDIiLCJpYXQiOjE3MDU5OTAxOTMsImV4cCI6MTcwNTk5Mzc5M30.q41fALKBrMilWYiFEPt9uN3d-MQdL1pM5cDOKJPLCEs"
    if (!token) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }

    // console.log(token,process.env.jwt_secret);

    const decodedToken = jwt.verify(token, process.env.jwt_secret);
    req.params.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};
