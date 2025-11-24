import ApiServices from "../services/ApiServices.js";

const getApiRent = async (req, res) => {
  try {
    const { rentCategory } = req.query;

    // Use the service to get filtered OR all data
    const result = await ApiServices.getApiRent(rentCategory);

    if (!result.success) {
      return res.status(500).json({
        message: result.message || "Error in fetching all rents",
      });
    }

    return res.status(200).json({
      success: true,
      message: "You've successfully fetched all rents",
      data: result.data,
    });
  } catch (error) {
    console.log("Error in fetching all rents", error);
    res.status(500).json({ messsage: "Error in fetching all rents" });
  }
};

// const getApiRent = async (req, res) => {
//   try {
//     const rents = await rentSchema.find().sort({ createdAt: -1 });
//     res
//       .status(200)
//       .json(rents, { messsage: "You've successfully fetched all rents" });
//   } catch (error) {
//     console.log("Error in fetching all rents", error);
//     res.status(500).json({ messsage: "Error in fetching all rents" });
//   }
// };

const getApiRentById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ApiServices.getApiRentById(id);

    if (!result.success) {
      return res.status(404).json({ message: "Rent not found" });
    }

    res.status(200).json({
      message: "Successfully fetched rent",
      data: result.data,
    });
  } catch (error) {
    console.log("Error in fetching a rent", error);
    res.status(500).json({ message: "Error in getting rent by id" });
  }
};

// const getApiRentById = async (req, res) => {
//   try {
//     const rentsById = await rentSchema.findById(req.params.id);
//     if (!rentsById) {
//       return res
//         .status(404)
//         .json({ message: "Bad Request, Rent is not found" });
//     }
//     res
//       .status(200)
//       .json(rentsById, { messsage: "You've successfully get a rent" });
//   } catch (error) {
//     console.log("Error in fetching a rent", error);
//     res.status(500).json({ messsage: "Error in getting a rent" });
//   }
// };

const postApiRent = async (req, res) => {
  try {
    const data = req.body;

    const result = await ApiServices.postApiRent(data);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(201).json({
      message: "Rent created successfully",
      data: result.data,
    });
  } catch (error) {
    console.log("Error in creating new rent", error);
    res.status(500).json({ message: "Error in post request" });
  }
};

// const postApiRent = async (req, res) => {
//   try {
//     const {
//       rentTitle,
//       rentDescription,
//       rentAddress,
//       rentCategory,
//       rentPrice,
//       rentImageURL,
//     } = req.body;
//     const newRents = new rentSchema({
//       rentTitle: rentTitle,
//       rentDescription: rentDescription,
//       rentAddress: rentAddress,
//       rentCategory: rentCategory,
//       rentPrice: rentPrice,
//       rentImageURL: rentImageURL,
//     });
//     const savedRents = await newRents.save();
//     res
//       .status(201)
//       .json(savedRents, { message: "You've successfully created a new rent" });
//   } catch (error) {
//     console.log("Error in creating a new rent", error);
//     res.status(400).json({ messsage: "Error 400 Bad Request" });
//   }
// };

const putApiRent = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await ApiServices.putApiRent(id, data);

    if (!result.success) {
      return res.status(404).json({ message: "Rent not found" });
    }

    res.status(200).json({
      message: "Rent updated successfully",
      data: result.data,
    });
  } catch (error) {
    console.log("Error in updating rent", error);
    res.status(500).json({ message: "Error in update request" });
  }
};

// const putApiRent = async (req, res) => {
//   try {
//     const {
//       rentTitle,
//       rentDescription,
//       rentAddress,
//       rentCategory,
//       rentPrice,
//       rentImageURL,
//     } = req.body;
//     const updateRent = await rentSchema.findByIdAndUpdate(
//       req.params.id,
//       {
//         rentTitle,
//         rentDescription,
//         rentAddress,
//         rentCategory,
//         rentPrice,
//         rentImageURL,
//       },
//       { new: true }
//     );
//     if (!updateRent) {
//       return res
//         .status(404)
//         .json({ message: "Bad request, The rent is not found" });
//     }
//     res
//       .status(200)
//       .json(updateRent, { message: "You've successfully updated the rent" });
//   } catch (error) {
//     console.log("Error in updating a rent", error);
//     res.status(500).json({ message: "Error in updating request" });
//   }
// };

const deleteApiRent = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ApiServices.deleteApiRent(id);

    if (!result.success) {
      return res.status(404).json({ message: "Rent not found" });
    }

    res.status(200).json({ message: "Rent deleted successfully" });
  } catch (error) {
    console.log("Error deleting rent", error);
    res.status(500).json({ message: "Error in delete request" });
  }
};

// const deleteApiRent = async (req, res) => {
//   try {
//     const deleteRent = await rentSchema.findByIdAndDelete(req.params.id);
//     if (!deleteRent) {
//       return res
//         .status(404)
//         .json({ message: "Bad Request, The rent is not found" });
//     }
//     res
//       .status(200)
//       .json(deleteRent, { messsage: "Successfully deleted the rent" });
//   } catch (error) {
//     console.log("Error in deleting a rent", error);
//     res.status(500).json({ message: "Error in deleting request" });
//   }
// };

export default {
  getApiRent,
  getApiRentById,
  putApiRent,
  postApiRent,
  deleteApiRent,
};
