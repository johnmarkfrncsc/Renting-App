import deleteApiRentService from "../../services/ApiServices/deleteApiRent.js";

const deleteApiRent = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only landlords can delete a listing",
      });
    }

    const { id } = req.params;
    const userId = req.user.id || req.user._id;

    const result = await deleteApiRentService(id, userId);

    if (!result.success) {
      return res.status(result.status || 404).json({
        success: false,
        message: result.message || "Rent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rent deleted successfully",
    });
  } catch (error) {
    console.error("deleteApiRent error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in deleting rent",
    });
  }
};

export default deleteApiRent;
