import rentSchema from "../../model/RentSchema.js";

const postApiRent = async (data) => {
  try {
    const rentData = {
      ...data,
      rentTenant:
        typeof data.rentTenant === "string" && data.rentTenant.trim() !== ""
          ? data.rentTenant.trim()
          : "No Tenant",
    };
    const rent = await new rentSchema(rentData).save();
    return {
      success: true,
      data: rent,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error saving rent",
    };
  }
};

export default postApiRent;
