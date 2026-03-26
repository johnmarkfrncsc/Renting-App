import React, { useState, useEffect } from "react";
import api from "../../api/axios";

const rentCategory = [
  "house",
  "unit 1br",
  "unit 2br",
  "unit penthouse",
  "room",
  "dorm",
];

const rentStatus = ["occupied", "vacant", "under renovation"];

const ViewPropertyModal = ({ isOpen, onClose, property, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(() =>
    property ? { ...property } : {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleCloseModal = () => {
    setFormData({ ...property });
    setError("");
    setIsEditing(false);
    onClose();
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
      onUpdate(response.data);
      onClose();
      setIsEditing(false);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update property. Try again.",
      );
      console.error("Error updating property:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // reusable input class
  const inputClass = (editable = true) =>
    `w-full px-4 py-3 rounded-lg border border-base-300 bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
      !editable ? "bg-base-200 cursor-not-allowed" : ""
    }`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg bg-base-100 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-base-300">
          <h2 className="text-xl md:text-2xl font-bold text-base-content">
            {isEditing ? "Edit Property" : "View Property"}
          </h2>
          <button
            onClick={handleCloseModal}
            className="p-2 hover:bg-base-200 rounded-full transition-colors text-base-content/60"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5 p-6 overflow-y-auto" onSubmit={handleSave}>
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
              {error}
            </div>
          )}

          {/* Listing Title */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1.5">
              Listing Title
            </label>
            <input
              type="text"
              name="rentTitle"
              value={formData.rentTitle}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              name="rentDescription"
              value={formData.rentDescription}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={`${inputClass(isEditing)} resize-none`}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1.5">
              Category
            </label>
            <select
              name="rentCategory"
              value={formData.rentCategory}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
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

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1.5">
              Status
            </label>
            <select
              name="rentStatus"
              value={formData.rentStatus}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={inputClass(isEditing)}
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

          {/* Tenant Name */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1.5">
              Tenant Name
            </label>
            <input
              type="text"
              name="rentTenant"
              value={formData.rentTenant || ""}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          {/* Price & Image URL */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-base-content mb-1.5">
                Price (Monthly)
              </label>
              <input
                type="number"
                name="rentPrice"
                value={formData.rentPrice}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={inputClass(isEditing)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-base-content mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                name="rentImageURL"
                value={formData.rentImageURL}
                onChange={handleInputChange}
                readOnly={!isEditing}
                className={inputClass(isEditing)}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1.5">
              Full Address
            </label>
            <input
              type="text"
              name="rentAddress"
              value={formData.rentAddress}
              onChange={handleInputChange}
              readOnly={!isEditing}
              className={inputClass(isEditing)}
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-base-300">
            <button
              type="button"
              onClick={handleCloseModal}
              className={`px-5 py-2.5 text-sm font-bold text-base-content/60 hover:text-base-content bg-transparent hover:bg-base-200 rounded-lg transition-colors ${
                isEditing ? "visible" : "invisible"
              }`}
            >
              Cancel
            </button>
            {isEditing ? (
              <>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-all shadow-sm disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-all shadow-sm"
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
