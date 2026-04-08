import rentSchema from "../../model/RentSchema.js";

const postApiRent = async (data) => {
  try {
    const rent = await new rentSchema(data).save();

    return {
      success: true,
      data: rent,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Error saving rent",
    };
  }
};

export default postApiRent;
