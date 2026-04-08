import rentSchema from "../../model/RentSchema.js";

const getApiRent = async (filters) => {
  try {
    const query = {};

    const { rentCategory, rentType } = filters;

    if (rentCategory) {
      query.rentCategory = rentCategory;
    }

    if (rentType) {
      query.rentType = rentType;
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
