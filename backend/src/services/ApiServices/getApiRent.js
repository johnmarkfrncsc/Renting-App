import rentSchema from "../../model/RentSchema.js";

const getApiRent = async (filters) => {
  try {
    const query = {};

    const { rentCategory, rentType } = filters;

    if (rentCategory) {
      const categories = rentCategory.split(",");
      query.rentCategory = { $in: categories };
    }
    if (rentType) {
      const types = rentType.split(",");
      query.rentType = { $in: types };
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
