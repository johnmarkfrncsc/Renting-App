import deleteApiRentService from "../../services/ApiServices/deleteApiRent.js";

const deleteApiRent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteApiRentService(id);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: "Rent not found",
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
