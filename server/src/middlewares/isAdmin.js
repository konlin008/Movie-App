const isAdmin = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
        success: false,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Admin middleware error",
      success: false,
    });
  }
};
export default isAdmin;
