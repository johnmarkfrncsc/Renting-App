import { useRef, useState } from "react";
import api from "../api/axios";
import { CloudUpload, X } from "lucide-react";

const AddListingSidebar = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    rentTitle: "",
    rentDescription: "",
    rentCategory: "",
    rentStatus: "",
    rentTenant: "",
    rentPrice: "",
    rentAddress: "",
    rentImageURL: "",
  });

  const rentCategories = [
    "house",
    "unit 1br",
    "unit 2br",
    "unit penthouse",
    "room",
    "dorm",
  ];

  const rentStatusOptions = ["occupied", "vacant", "under renovation"];

  const fileInputRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadImageToCloudinary = async () => {
    const cloudinaryData = new FormData();
    cloudinaryData.append("file", imageFile);
    cloudinaryData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
    );
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        },
      );
      const data = await response.json();
      return data.secure_url; // Return the uploaded image URL
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (imageFile) {
      const storedImageUrl = await uploadImageToCloudinary();

      if (!storedImageUrl) {
        setError("Image upload failed. Please try again");
        setIsLoading(false);
        return;
      }
      try {
        const response = await api.post("/rents", {
          ...formData,
          rentPrice: parseFloat(formData.rentPrice),
          rentImageURL: storedImageUrl,
        });

        if (response.data.success || response.status === 201) {
          onSuccess();
          handleClose();
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to create listing. Please try again.",
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Please upload an image for the property.");
    }
  };

  const handleClose = () => {
    setFormData({
      rentTitle: "",
      rentDescription: "",
      rentCategory: "",
      rentStatus: "",
      rentTenant: "",
      rentPrice: "",
      rentAddress: "",
      rentImageURL: "",
    });
    setImagePreview(null);
    setImageFile(null);
    setError("");
    onClose();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.match("image.*")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
      setError("Please select a valid image file");
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (!isOpen) return null;

  return (
    <div>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-gray-transparent bg-clip-padding 
        backdrop-filter backdrop-blur-sm bg-opacity-10"
        onClick={handleClose}
      />

      {/* Sidebar Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[400px] md:w-[480px] bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b 
        border-gray-200"
        >
          <h1 className="text-xl font-bold tracking-tight">Add Property</h1>
          <X
            type="button"
            className="cursor-pointer hover:bg-gray-200 hover:rounded-full"
            onClick={handleClose}
          />
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Row 1: Title + Category */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className={labelClass}>
                  Property Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rentTitle"
                  placeholder="e.g. Modern Studio at Blue Sky Towers"
                  value={formData.rentTitle}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>
                  Property Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="rentCategory"
                  value={formData.rentCategory}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="">Select category</option>
                  {rentCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Price + Status */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className={labelClass}>
                  Price (Monthly) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="rentPrice"
                  placeholder="2,000 to 30,000"
                  value={formData.rentPrice}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  name="rentStatus"
                  value={formData.rentStatus}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="">Select status</option>
                  {rentStatusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 3: Address - full width */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className={labelClass}>Tenant Name</label>
                <input
                  type="text"
                  name="rentTenant"
                  placeholder="e.g. Juan dela Cruz"
                  value={formData.rentTenant}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>
              <div className="flex-1">
                <label className={labelClass}>
                  Property Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rentAddress"
                  placeholder="Street, City, Zip, Country"
                  value={formData.rentAddress}
                  onChange={handleInputChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Row 4: Description - full width */}
            <div>
              <label className={labelClass}>
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                name="rentDescription"
                placeholder="Tell us about the property..."
                value={formData.rentDescription}
                onChange={handleInputChange}
                className={`${inputClass} resize-none`}
              />
              <label className={labelClass}>Upload Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current.click()}
                className="border-2 border-dashed border-gray-200 rounded-lg h-48 flex flex-col items-center justify-center cursor-pointer object-cover "
              >
                {imagePreview ? (
                  <div className="relative w-full h-48">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageRemove();
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-500 transition-colors"
                    >
                      <span className="sr-only">Remove Image</span>
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <CloudUpload />
                    <p>
                      Drag & Drop here Or{" "}
                      <span className="text-indigo-600 font-semibold">
                        Click to browse
                      </span>
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleClose}
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? "Creating please wait..." : "Save Property"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListingSidebar;
