import getApiRentByIdService from "../../services/ApiServices/getApiRentById.js";

const getApiRentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getApiRentByIdService(id);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: result.message || "Rent not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Successfully fetched rent",
      data: result.data,
    });
  } catch (error) {
    console.error("getApiRentById error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in getting rent by id",
    });
  }
};

export default getApiRentById;
