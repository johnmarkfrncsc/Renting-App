import rentSchema from "../../model/RentSchema.js";

const putApiRent = async (id, data, userId) => {
  try {
    const rent = await rentSchema.findById(id);

    if (!rent) {
      return {
        success: false,
        message: "Rent not found",
        status: 404,
      };
    }

    if (rent.userId !== userId) {
      return {
        success: false,
        message: "Unauthorized",
        status: 403,
      };
    }

    const updated = await rentSchema.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error updating rent",
      data: null,
    };
  }
};

export default putApiRent;
