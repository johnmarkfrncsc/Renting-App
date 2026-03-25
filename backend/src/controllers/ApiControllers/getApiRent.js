import getApiRentService from "../../services/ApiServices/getApiRent.js";

const getApiRent = async (req, res) => {
  try {
    const { rentCategory } = req.query;
    const result = await getApiRentService(rentCategory);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.message || "Error in fetching all rents",
      });
    }
    return res.status(200).json({
      success: true,
      message: "You've successfully fetched all rents",
      data: result.data,
    });
  } catch (error) {
    console.error("getApiRent error:", error);
    return res.status(500).json({
      success: false,
      message: "Error in fetching all rents",
    });
  }
};

export default getApiRent;
