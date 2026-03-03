import React, { useState } from "react";
import api from "../api/axios";

const AddListingModal = ({ isOpen, onClose, onListingAdded }) => {
  const [formData, setFormData] = useState({
    rentTitle: "",
    rentDescription: "",
    rentCategory: "",
    rentStatus: "",
    rentPrice: "",
    rentAddress: "",
    rentImageURL: "",
  });

  const rentCategories = [
    "House",
    "Unit 1BR",
    "Unit 2BR",
    "Unit Penthouse",
    "Room",
    "Dorm",
  ];

  const rentStatus = ["Occupied", "Vacant", "Under Renovation"];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.rentTitle ||
      !formData.rentDescription ||
      !formData.rentCategory ||
      !formData.rentStatus ||
      !formData.rentPrice ||
      !formData.rentAddress
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.post("/rents", {
        ...formData,
        rentPrice: parseFloat(formData.rentPrice),
      });

      if (response.data.success || response.status === 201) {
        setFormData({
          rentTitle: "",
          rentDescription: "",
          rentCategory: "",
          rentStatus: "",
          rentPrice: "",
          rentAddress: "",
          rentImageURL: "",
        });

        if (onListingAdded) onListingAdded();
        onClose();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create listing. Please try again.",
      );
      console.error("Error creating listing:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      {/* Modal Container */}
      <div
        className="
          relative w-full
          max-w-sm
          sm:max-w-md
          md:max-w-md
          lg:max-w-lg
          bg-white
          rounded-2xl
          shadow-2xl
          flex flex-col
          max-h-[90vh]
          
          overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Add Unit Listing
          </h2>

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form */}
        <form className="space-y-5 p-6 overflow-y-auto" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Rent Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Listing Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rentTitle"
              placeholder="e.g. Modern Studio at Blue Sky Towers"
              value={formData.rentTitle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>

          {/* Rent Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="3"
              name="rentDescription"
              placeholder="Tell us about the unit..."
              value={formData.rentDescription}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
            />
          </div>

          {/* Rent Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="rentCategory"
              value={formData.rentCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white"
            >
              <option value="">Select category</option>
              {rentCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Rent Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="rentStatus"
              value={formData.rentStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all bg-white"
            >
              <option value="">Status</option>
              {rentStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Image URL */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Price */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Price (Monthly) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="rentPrice"
                placeholder="₱ 15000.00"
                value={formData.rentPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>

            {/* Image URL */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                name="rentImageURL"
                placeholder="https://..."
                value={formData.rentImageURL}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
              />
            </div>
          </div>

          {/* Rent Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="rentAddress"
              placeholder="Street, City, Zip, Country"
              value={formData.rentAddress}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A1A1A] rounded-lg hover:bg-black transition-all shadow-sm disabled:opacity-50"
            >
              {isLoading ? "Creating..." : "Add Property"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingModal;
