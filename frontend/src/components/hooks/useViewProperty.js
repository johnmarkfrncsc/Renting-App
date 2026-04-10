import { useState, useEffect, useRef } from "react";
import api from "../../api/axios";

export const useViewProperty = ({ property, onClose, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    if (property) {
      setFormData({ ...property });
      setExistingImages(property.rentImages || []);
      setNewImageFiles([]);
      setNewImagePreviews([]);
      setIsEditing(false);
      setError("");
    }
  }, [property?._id]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleDetails = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentDetails: {
        ...prev.rentDetails,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleLocation = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentLocation: { ...prev.rentLocation, [name]: value },
    }));
  };

  const handleAmenity = (value) => {
    setFormData((prev) => ({
      ...prev,
      rentAmenities: prev.rentAmenities?.includes(value)
        ? prev.rentAmenities.filter((a) => a !== value)
        : [...(prev.rentAmenities || []), value],
    }));
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.type.match("image.*"),
    );
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleRemoveExisting = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancelEdit = () => {
    setFormData({ ...property });
    setExistingImages(property.rentImages || []);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setIsEditing(false);
    setError("");
  };

  const handleClose = () => {
    setFormData({ ...property });
    setIsEditing(false);
    setError("");
    onClose();
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: data },
    );
    const json = await res.json();
    return json.secure_url;
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError("");
    try {
      const uploadedURLs = await Promise.all(
        newImageFiles.map(uploadToCloudinary),
      );
      const rentImages = [...existingImages, ...uploadedURLs];

      await api.put(`/rents/${property._id}`, {
        ...formData,
        rentImages,
        rentPrice: parseFloat(formData.rentPrice),
        rentDetails: {
          ...formData.rentDetails,
          bedrooms: parseInt(formData.rentDetails?.bedrooms),
          bathrooms: parseInt(formData.rentDetails?.bathrooms),
          floorArea: formData.rentDetails?.floorArea
            ? parseFloat(formData.rentDetails.floorArea)
            : undefined,
          floorLevel: formData.rentDetails?.floorLevel
            ? parseInt(formData.rentDetails.floorLevel)
            : undefined,
        },
      });

      onUpdate();
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update property. Try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    formData,
    isLoading,
    error,
    existingImages,
    newImageFiles,
    newImagePreviews,
    fileInputRef,
    handleInput,
    handleDetails,
    handleLocation,
    handleAmenity,
    handleNewImages,
    handleRemoveExisting,
    handleRemoveNew,
    handleCancelEdit,
    handleClose,
    handleSave,
  };
};
