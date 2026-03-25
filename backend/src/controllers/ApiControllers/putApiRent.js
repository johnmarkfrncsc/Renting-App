import putApiRentService from "../../services/ApiServices/putApiRent.js";

const putApiRent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await putApiRentService(id, data);

    if (!result.success) {
      return res.status(404).json({
        success: false,
        message: "Rent not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rent updated successfully",
      data: result.data,
    });
  } catch (error) {
    console.error("putApiRent error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in updating rent",
    });
  }
};

export default putApiRent;
