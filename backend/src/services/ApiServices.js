import rentSchema from "../model/RentSchema.js";

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

const getApiRentById = async (id) => {
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

const postApiRent = async (data) => {
  try {
    const rentData = {
      ...data,
      rentTenant:
        typeof data.rentTenant === "string" && data.rentTenant.trim() !== ""
          ? data.rentTenant.trim()
          : "No Tenant",
    };
    const rent = new rentSchema(rentData);
    const saved = await rent.save();
    return {
      success: true,
      data: saved,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error saving rent",
    };
  }
};

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
    };
  }
};

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

export default {
  getApiRent,
  getApiRentById,
  postApiRent,
  putApiRent,
  deleteApiRent,
};
