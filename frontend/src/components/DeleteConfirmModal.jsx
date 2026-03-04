import React, { useState, useEffect } from "react";
import api from "../api/axios";

const DeleteConfirmModal = ({ isOpen, onClose, onDelete, property }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await api.delete(`/rents/${property._id}`);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="
          relative w-full max-w-sm
          bg-white rounded-2xl shadow-2xl flex flex-col
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
        <div className="p-6">
          <p className="text-gray-700 text-center mb-2">
            Are you sure you want to delete this property?
          </p>
          <p className="text-gray-500 text-center text-sm">
            <strong>"{property.rentTitle}"</strong>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors"
          >
            No
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all shadow-sm"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
