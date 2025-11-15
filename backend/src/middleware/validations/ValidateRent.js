const ValidateRent = (req, res, next) => {
  try {
    const requiredFields = [
      "rentTitle",
      "rentDescription",
      "rentAddress",
      "rentCategory",
      "rentPrice",
      "rentImageURL",
    ];
    if (requiredFields.some((fields) => !req.body[fields])) {
      res
        .status(400)
        .json({ message: "your loop validation is working. error 400" });
    }
    next();
  } catch (error) {
    console.log("Error in validation line 9");
    res.status(500).json({ message: "Error in validation middleware line 10" });
  }
};

export default ValidateRent;
