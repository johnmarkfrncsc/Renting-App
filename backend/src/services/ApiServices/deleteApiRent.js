import rentSchema from "../../model/RentSchema.js";

const deleteApiRent = async (id, userId) => {
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

    await rentSchema.findByIdAndDelete(id);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error deleting rent",
    };
  }
};

export default deleteApiRent;
