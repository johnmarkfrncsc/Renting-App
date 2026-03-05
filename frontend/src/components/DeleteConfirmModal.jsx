import React, { useState } from "react";
import api from "../api/axios";

const DeleteConfirmModal = ({ isOpen, onClose, onDelete, property }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !property) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");

    try {
      await api.delete(`/rents/${property._id}`);
      onDelete();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete property. Try again.",
      );
      console.error("Error removing property:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="
          relative w-full max-w-sm sm:max-w-md md:max-w-md lg:max-w-lg
          bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Delete Property
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-700">
            Are you sure you want to delete this property? This action cannot be
            undone.
          </p>

          {/* Property Preview */}
          <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg border border-gray-200">
            {property.rentImageURL ? (
              <img
                src={property.rentImageURL}
                alt={property.rentTitle}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
            )}
            <div className="min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate capitalize">
                {property.rentTitle}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {property.rentAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-sm disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
