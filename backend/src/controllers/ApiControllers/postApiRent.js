import postApiRentService from "../../services/ApiServices/postApiRent.js";

const postApiRent = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.id || req.user._id;

    const result = await postApiRentService({
      ...data,
      userId,
    });

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Rent created successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("postApiRent error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in post request",
    });
  }
};

export default postApiRent;
