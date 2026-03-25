import rentSchema from "../../model/RentSchema.js";

const deleteApiRent = async (id) => {
  try {
    const deleted = await rentSchema.findByIdAndDelete(id);

    if (!deleted) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export default deleteApiRent;
