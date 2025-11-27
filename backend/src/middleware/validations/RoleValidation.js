const RoleValidation = (allowedRole) => {
  return (req, res, next) => {
    try {
      const UserRole = req.user.role;
      console.log("RoleValidation, req.user:", req.user); // check id, and role (will delete after)
      if (!allowedRole.includes(UserRole)) {
        return res
          .status(403)
          .json({ message: "Forbidden: You don't have permission" });
      }
      next();
    } catch (error) {
      console.log("Error in Role Validation in middleware", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default RoleValidation;
