import bcrypt from "bcryptjs";
const generateHashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to hash password",
      success: false,
    });
  }
};
export default generateHashPassword;
