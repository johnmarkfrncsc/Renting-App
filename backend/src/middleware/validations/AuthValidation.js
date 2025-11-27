import jwt from "jsonwebtoken";

const AuthValidation = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token in provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Error in Auth Validation Middleware", error);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default AuthValidation;
