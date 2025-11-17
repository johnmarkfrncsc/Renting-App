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
    const fieldTypes = {
      rentTitle: String,
      rentDescription: String,
      rentCategory: String,
      rentAddress: String,
      rentImageURL: String,
      rentPrice: Number,
    };

    //4th try
    for (let i = 0; i < requiredFields.length; i++) {
      // store to looped requiredFields in 'fields'
      const fieldName = requiredFields[i];
      //expectedType = looked in to fieldTypes {object} and find the type assigned to this 'fields'
      const expectedType = fieldTypes[fieldName];

      const value = req.body[fieldName];

      if (value === undefined) {
        return res
          .status(400)
          .json({ message: `${fieldName} can't be empty field` });
      }

      if (expectedType === String) {
        if (typeof value !== "string") {
          return res
            .status(400)
            .json({ message: "must input a string ex: abcd.." });
        }

        const trimmedValue = value.trim();

        if (trimmedValue === "") {
          return res.status(400).json({
            message: `${fieldName} can't have empty string`,
          });
        }
      } else if (expectedType === Number) {
        if (typeof value !== "number") {
          return res
            .status(400)
            .json({ message: "must input a number ex: 12345.." });
        }
        if (isNaN(value)) {
          return res.status(400).json({ message: "you've input a NaN" });
        }
      }
    }

    next();
  } catch (error) {
    console.log("Error in validation line 9");
    res.status(500).json({ message: "Error in validation middleware" });
  }
};

export default ValidateRent;
