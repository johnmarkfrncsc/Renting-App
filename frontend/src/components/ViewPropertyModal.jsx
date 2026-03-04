import React, { useState, useEffect } from "react";
import api from "../api/axios";

const ViewPropertyModal = ({ isOpen, onClose, property, onUpdate }) => {
  // Viewing/editing state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    property ? { ...property } : {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const rentCategory = [
    "house",
    "unit 1BR",
    "unit 2BR",
    "unit penthouse",
    "room",
    "dorm",
  ];

  const rentStatus = ["occupied", "vacant", "under renovation"];

  // Sync formData with property prop when it changes
  useEffect(() => {
    if (property) {
      setFormData({ ...property });
      setIsEditing(false);
      setError("");
    }
  }, [property?._id]);

  if (!isOpen || !property) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  // Handle Close/Cancel - Reset everything and close modal
  const handleCloseModal = () => {
    setFormData({ ...property }); // Reset form to original property data
    setError(""); // Clear any error messages
    setIsEditing(false); // Reset to viewing state
    onClose(); // Close the modal
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await api.put(`/rents/${property._id}`, {
        ...formData,
        rentPrice: parseFloat(formData.rentPrice),
      });
      onUpdate(response.data); // Update parent component with new data
      onClose(); // Close the modal after successful update
      setIsEditing(false); // Reset to viewing state
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update property. Try again.",
      );
      console.error("Error updating property:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="
          relative w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg
          bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Property" : "View Property"}
          </h2>

          <button
            onClick={handleCloseModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5 p-6 overflow-y-auto" onSubmit={handleSave}>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Rent Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Listing Title
            </label>
            <input
              type="text"
              name="rentTitle"
              value={formData.rentTitle}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Rent Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              name="rentDescription"
              value={formData.rentDescription}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all resize-none ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Rent Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Category
            </label>
            <select
              name="rentCategory"
              value={formData.rentCategory}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            >
              <option value="" disabled>
                Select Unit Type
              </option>
              {rentCategory.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Rent Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Status
            </label>
            <select
              name="rentStatus"
              value={formData.rentStatus}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${isEditing ? "bg-white" : "bg-gray-100 cursor-not-allowed"}`}
            >
              <option value="" disabled>
                Select Status
              </option>
              {rentStatus.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Price & Image URL */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Price (Monthly)
              </label>
              <input
                type="number"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                name="rentImageURL"
                value={formData.rentImageURL}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${isEditing ? "bg-white" : "bg-gray-100"}`}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Full Address
            </label>
            <input
              type="text"
              name="rentAddress"
              value={formData.rentAddress}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all ${isEditing ? "bg-white" : "bg-gray-100"}`}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A1A1A] rounded-lg hover:bg-black transition-all shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#1A1A1A] rounded-lg hover:bg-black transition-all shadow-sm"
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewPropertyModal;
