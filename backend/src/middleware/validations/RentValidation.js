const ValidateRent = (req, res, next) => {
  try {
    const fieldRequired = [
      "rentTitle",
      "rentDescription",
      "rentAddress",
      "rentCategory",
      "rentStatus",
      "rentTenant",
      "rentPrice",
      "rentImageURL",
    ];
    const fieldTypes = {
      rentTitle: String,
      rentDescription: String,
      rentCategory: String,
      rentStatus: String,
      rentTenant: String,
      rentAddress: String,
      rentImageURL: String,
      rentPrice: Number,
    };
    const fieldLengths = {
      rentTitle: { min: 10, max: 60 },
      // rentDescription: { min: 50, max: 250 },

      rentAddress: { min: 20, max: 70 },
      rentImageURL: String,
      rentPrice: { min: 2000, max: 30000 },
    };

    const validCategories = [
      "house",
      "unit 1br",
      "unit 2br",
      "unit penthouse",
      "room",
      "dorm",
    ];

    const validStatus = ["occupied", "vacant", "under renovation"];
    //4th try
    for (let i = 0; i < fieldRequired.length; i++) {
      // store to looped requiredFields in 'fields'
      const fieldName = fieldRequired[i];
      //expectedType = looked in to fieldTypes {object} and find the type assigned to this 'fields'
      const expectedType = fieldTypes[fieldName];
      const lengthRules = fieldLengths[fieldName];
      const value = req.body[fieldName];

      //if exist
      if (value === undefined) {
        return res
          .status(400)
          .json({ message: `${fieldName} can't be empty field` });
      }

      //Validate Type string

      if (expectedType === String) {
        if (typeof value !== "string") {
          return res
            .status(400)
            .json({ message: "must input a string ex: abcd.." });
        }

        const trimmedValue = value.trim(); //store the value that has been trim in trimmedValue
        if (trimmedValue === "") {
          return res.status(400).json({
            message: `${fieldName} can't have empty string`,
          });
        }
        if (fieldName === "rentTitle") {
          // Reject if title is numbers only
          if (/^\d+$/.test(trimmedValue)) {
            return res.status(400).json({
              message: `Title cannot be numbers only. Please provide a descriptive title.`,
            });
          }

          // Reject if title has no letters at all (e.g. "123 !!! 456")
          if (!/[a-zA-Z]/.test(trimmedValue)) {
            return res.status(400).json({
              message: `Title must contain letters.`,
            });
          }
          // Rejects "aaaaaaaaaa" - entire string is one repeated character
          if (/^(.)\1+$/.test(trimmedValue)) {
            return res.status(400).json({
              message: "Title cannot consist of a single repeated character.",
            });
          }
          // Rejects "ababababab", "abcabcabc" - repeating patterns
          if (/^(.{1,3})\1{2,}$/.test(trimmedValue)) {
            return res.status(400).json({
              message: "Title cannot consist of repeating patterns.",
            });
          }
        }

        //Validate string length
        if (lengthRules) {
          if (trimmedValue.length < lengthRules.min) {
            return res.status(400).json({
              message: `${trimmedValue} too short, minimum lenght is  ${lengthRules.min}`,
            });
          } else if (trimmedValue.length > lengthRules.max) {
            return res.status(400).json({
              message: `${trimmedValue} too long, , max lenght is  ${lengthRules.max}`,
            });
          }
        }
        //Validation for allowed category list
        if (fieldName === "rentCategory") {
          if (!validCategories.includes(trimmedValue.toLowerCase())) {
            return res.status(400).json({
              message: `${trimmedValue} is not a valid category. Valid categories are: ${validCategories} `,
            });
          }
        }

        //Validation for allowed status list
        if (fieldName === "rentStatus") {
          const statusLower = trimmedValue.toLowerCase();
          const validStatusLower = validStatus.map((s) => s.toLowerCase());
          if (!validStatusLower.includes(statusLower)) {
            return res.status(400).json({
              message: `${trimmedValue} is not a valid status. Valid statuses are: ${validStatus.join(", ")} `,
            });
          }
          req.body[fieldName] = statusLower;
        } else {
          req.body[fieldName] = trimmedValue.toLowerCase();
        }
      }
      //Validate Type number
      else if (expectedType === Number) {
        if (isNaN(value)) {
          return res.status(400).json({ message: "must input a number" });
        }

        //Validate number range
        if (value < lengthRules.min) {
          return res.status(400).json({
            message: `${value} is too low, minimum: ${lengthRules.min}`,
          });
        } else if (value > lengthRules.max) {
          return res.status(400).json({
            message: `${value} is too high, minimum: ${lengthRules.max}`,
          });
        }
      }
    }

    next();
  } catch (error) {
    console.log("Error in validation");
    res.status(500).json({ message: "Error in validation middleware" });
  }
};

export default ValidateRent;
