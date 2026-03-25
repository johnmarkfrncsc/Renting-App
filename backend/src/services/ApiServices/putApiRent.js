import rentSchema from "../../model/RentSchema.js";

const putApiRent = async (id, data) => {
  try {
    const updated = await rentSchema.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) {
      return {
        success: false,
      };
    }
    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
    };
  }
};

export default putApiRent;
