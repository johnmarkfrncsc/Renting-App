import React, { useState } from "react";
import api from "../../api/axios";

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
      <div className="relative w-full max-w-sm sm:max-w-md bg-base-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-base-300">
          <h2 className="text-xl md:text-2xl font-bold text-base-content">
            Delete Property
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-base-200 rounded-full transition-colors text-base-content/60"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
              {error}
            </div>
          )}

          <p className="text-sm text-base-content/70">
            Are you sure you want to delete this property? This action cannot be
            undone.
          </p>

          {/* Property Preview */}
          <div className="flex items-center gap-3 p-4 bg-base-300 rounded-lg border border-base-300">
            {property.rentImageURL ? (
              <img
                src={property.rentImageURL}
                alt={property.rentTitle}
                className="w-12 h-12 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div className="w-12 h-12 bg-base-300 rounded-lg shrink-0" />
            )}
            <div className="min-w-0">
              <p className="font-semibold text-sm text-base-content truncate capitalize">
                {property.rentTitle}
              </p>
              <p className="text-xs text-base-content/60 truncate">
                {property.rentAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 border-t border-base-300 **:cursor-pointer">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-bold text-base-content/60 hover:text-base-content bg-transparent hover:bg-base-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
            className="px-5 py-2.5 text-sm font-bold bg-error text-error-content rounded-lg hover:bg-error/90 transition-all shadow-sm disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
