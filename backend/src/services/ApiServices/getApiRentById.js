import rentSchema from "../../model/RentSchema.js";

const getApiRentById = async (id) => {
  try {
    const rent = await rentSchema.findById(id);

    if (!rent) {
      return {
        success: false,
        message: "Rent not found",
        data: null,
      };
    }
    return {
      success: true,
      data: rent,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error fetching rent",
      data: null,
    };
  }
};

export default getApiRentById;
