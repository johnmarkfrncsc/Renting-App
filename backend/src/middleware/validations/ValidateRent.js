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

    //4th try
    for (let i = 0; i < requiredFields.length; i++) {
      const fields = requiredFields[i];

      const value = req.body[fields];

      if (value === undefined) {
        return res
          .status(400)
          .json({ message: `${fields} can't be empty field` });
      }
      if (typeof value === "string") {
        const trimmedValue = value.trim();

        if (trimmedValue === "") {
          return res.status(400).json({
            message: `${fields} can't have empty string`,
          });
        }
        req.body[fields] = trimmedValue;
      }
    }

    next();
  } catch (error) {
    console.log("Error in validation line 9");
    res.status(500).json({ message: "Error in validation middleware" });
  }
};

export default ValidateRent;
