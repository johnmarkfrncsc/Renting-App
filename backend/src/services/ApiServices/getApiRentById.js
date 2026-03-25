import rentSchema from "../../model/RentSchema.js";

const getApiRentbyId = async (id) => {
  try {
    const rent = await rentSchema.findById(id);

    if (!rent) {
      return {
        success: false,
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
      data: null,
    };
  }
};

export default getApiRentbyId;
