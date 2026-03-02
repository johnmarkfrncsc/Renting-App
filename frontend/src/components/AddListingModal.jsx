import React, { useState } from "react";
import api from "../api/axios";

const AddListingModal = ({ isOpen, onClose, onListingAdded }) => {
  const [formData, setFormData] = useState({
    rentTitle: "",
    rentDescription: "",
    rentCategory: "",
    rentPrice: "",
    rentAddress: "",
    rentImageURL: "",
  });

  const rentCategories = [
    "House",
    "Unit 1BR",
    "Unit 2BR",
    "UnitPenthouse",
    "Room",
    "Dorm",
  ];

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

    // Validation
    if (
      !formData.rentTitle ||
      !formData.rentDescription ||
      !formData.rentCategory ||
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
        // Reset form
        setFormData({
          rentTitle: "",
          rentDescription: "",
          rentCategory: "",
          rentPrice: "",
          rentAddress: "",
          rentImageURL: "",
        });

        // Call callback if provided
        if (onListingAdded) {
          onListingAdded();
        }

        // Close modal
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 mx-4">
        {/* Top Header & "X" Close Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            Add Unit Listing
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Error Message */}
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
              value={formData.rentTitle}
              onChange={handleInputChange}
              placeholder="e.g. Modern Studio at Blue Sky Towers"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
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
              value={formData.rentDescription}
              onChange={handleInputChange}
              placeholder="Tell us about the unit..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none"
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
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 
             focus:outline-none focus:ring-2 focus:ring-black/5 
             focus:border-black transition-all bg-white"
            >
              <option value="">Select category</option>
              {rentCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Rent Price & Rent URL (Two Columns) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Price (Monthly) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-2.5 text-gray-400">$</span>
                <input
                  type="number"
                  name="rentPrice"
                  value={formData.rentPrice}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                name="rentImageURL"
                value={formData.rentImageURL}
                onChange={handleInputChange}
                placeholder="https://..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
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
              value={formData.rentAddress}
              onChange={handleInputChange}
              placeholder="Street, City, Zip, Country"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#1A1A1A] rounded-lg hover:bg-black transition-all shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 animate-spin">⏳</span> Creating...
                </>
              ) : (
                <>
                  <span className="mr-2 text-lg">+</span> Add Property
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListingModal;
