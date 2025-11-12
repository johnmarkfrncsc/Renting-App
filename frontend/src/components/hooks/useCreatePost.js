import { useState } from "react";
import axios from "axios";

export function useCreatePost() {
  const [formData, setFormData] = useState({
    rentTitle: "",
    rentDescription: "",
    rentAddress: "",
    rentCategory: "",
    rentPrice: "",
    rentImageURL: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev, // Spread the formData, "prev" to copy existing data.
      [name]: value, //Computed property name, ex: name = rentTitle: & value = "House for rent".
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/rents`,
        formData
      );
      setSuccess(true);
      setFormData(response);
      console.log("Successfully created a new list:", response.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message); //MUST HAVE! MORE SPECIFIC CALLING FOR ERROR
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    success,
  };
}
