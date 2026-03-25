import rentSchema from "../../model/RentSchema.js";

const getApiRent = async (rentCategory) => {
  try {
    const query = {};

    if (rentCategory) {
      query.rentCategory = {
        $regex: rentCategory,
        $options: "i",
      };
    }
    const rents = await rentSchema.find(query).sort({ createdAt: -1 });
    return {
      success: true,
      data: rents,
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong in getApiRent service",
      data: null,
    };
  }
};

export default getApiRent;
