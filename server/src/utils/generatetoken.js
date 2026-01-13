import jwt from "jsonwebtoken";

const generateToken = (userData) => {
  const token = jwt.sign(
    { userId: userData._id, role: userData.role },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

export default generateToken;
