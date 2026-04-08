const ValidateRent = (req, res, next) => {
  try {
    const {
      rentTitle,
      rentDescription,
      rentCategory,
      rentType,
      rentPrice,
      rentStatus,
      rentDetails,
      rentLocation,
      rentImages,
    } = req.body;

    // Required string fields
    const requiredStrings = { rentTitle, rentDescription };

    for (const [fieldName, value] of Object.entries(requiredStrings)) {
      if (!value || typeof value !== "string" || value.trim() === "") {
        return res.status(400).json({
          success: false,
          message: `${fieldName} is required and must be a non-empty string`,
        });
      }
    }

    // rentTitle specific rules
    const trimmedTitle = rentTitle.trim();

    if (trimmedTitle.length < 10 || trimmedTitle.length > 60) {
      return res.status(400).json({
        success: false,
        message: "rentTitle must be between 10 and 60 characters",
      });
    }
    if (/^\d+$/.test(trimmedTitle)) {
      return res.status(400).json({
        success: false,
        message: "rentTitle cannot be numbers only",
      });
    }
    if (!/[a-zA-Z]/.test(trimmedTitle)) {
      return res.status(400).json({
        success: false,
        message: "rentTitle must contain letters",
      });
    }
    if (/^(.)\1+$/.test(trimmedTitle)) {
      return res.status(400).json({
        success: false,
        message: "rentTitle cannot be a single repeated character",
      });
    }
    if (/^(.{1,3})\1{2,}$/.test(trimmedTitle)) {
      return res.status(400).json({
        success: false,
        message: "rentTitle cannot consist of repeating patterns",
      });
    }

    // rentCategory
    const validCategories = ["condo", "house", "apartment", "dorm"];

    if (
      !rentCategory ||
      !validCategories.includes(rentCategory.toLowerCase())
    ) {
      return res.status(400).json({
        success: false,
        message: `rentCategory must be one of: ${validCategories.join(", ")}`,
      });
    }

    // rentType
    const validTypes = ["studio", "1BR", "2BR", "3BR", "loft", "mezzanine"];

    if (!rentType || !validTypes.includes(rentType)) {
      return res.status(400).json({
        success: false,
        message: `rentType must be one of: ${validTypes.join(", ")}`,
      });
    }

    // rentStatus
    const validStatus = ["available", "occupied", "reserved"];

    if (rentStatus && !validStatus.includes(rentStatus.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `rentStatus must be one of: ${validStatus.join(", ")}`,
      });
    }

    // rentPrice
    if (rentPrice === undefined || isNaN(rentPrice)) {
      return res.status(400).json({
        success: false,
        message: "rentPrice is required and must be a number",
      });
    }
    if (rentPrice < 2000 || rentPrice > 100000) {
      return res.status(400).json({
        success: false,
        message: "rentPrice must be between 2000 and 100000",
      });
    }

    // rentDetails
    if (!rentDetails || typeof rentDetails !== "object") {
      return res.status(400).json({
        success: false,
        message: "rentDetails is required",
      });
    }
    if (!rentDetails.bedrooms || isNaN(rentDetails.bedrooms)) {
      return res.status(400).json({
        success: false,
        message: "rentDetails.bedrooms is required and must be a number",
      });
    }
    if (!rentDetails.bathrooms || isNaN(rentDetails.bathrooms)) {
      return res.status(400).json({
        success: false,
        message: "rentDetails.bathrooms is required and must be a number",
      });
    }

    //rentLocation
    if (!rentLocation || typeof rentLocation !== "object") {
      return res.status(400).json({
        success: false,
        message: "rentLocation is required",
      });
    }
    if (
      !rentLocation.fullAddress ||
      typeof rentLocation.fullAddress !== "string" ||
      rentLocation.fullAddress.trim().length < 10
    ) {
      return res.status(400).json({
        success: false,
        message:
          "rentLocation.fullAddress is required and must be at least 10 characters",
      });
    }
    if (
      !rentLocation.city ||
      typeof rentLocation.city !== "string" ||
      rentLocation.city.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "rentLocation.city is required",
      });
    }

    // rentImages
    if (!rentImages || !Array.isArray(rentImages) || rentImages.length === 0) {
      return res.status(400).json({
        success: false,
        message: "rentImages must be a non-empty array of image URLs",
      });
    }

    next();
  } catch (error) {
    console.error("Error in ValidateRent middleware:", error);
    res.status(500).json({
      success: false,
      message: "Error in validation middleware",
    });
  }
};

export default ValidateRent;
