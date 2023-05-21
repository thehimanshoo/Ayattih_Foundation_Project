const jwt = require("jsonwebtoken");

const authenticate = async (request, response, next) => {
  // Getting Token from header file
  let token = request.header("x-auth-token");
  if (!token) {
    return response
      .status(401)
      .json({ msg: "No Token... Authorization denined" });
  } 

  try {
    // Verifying token
    // After storing verified token 'decode' is nothing but 'payload' of 'jwt' token
    let decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // putting 'user' data to 'request.user' which is nothing but our "payload"
    request.user = decoded.user;

    next();
  } catch (err) {
    return response.status(401).json({ err: "Token is not valid" });
  }
};

module.exports = authenticate;
