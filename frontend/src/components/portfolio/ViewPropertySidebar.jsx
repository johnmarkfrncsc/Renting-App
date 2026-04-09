import { useState, useEffect, useRef } from "react";
import { X, CloudUpload } from "lucide-react";
import api from "../../api/axios";

const categoryOptions = ["condo", "house", "apartment", "dorm"];
const typeOptions = ["studio", "1BR", "2BR", "3BR", "loft", "mezzanine"];
const statusOptions = ["available", "occupied", "reserved"];
const amenityOptions = [
  "parking",
  "pool",
  "gym",
  "petsAllowed",
  "wifi",
  "security",
];

const ViewPropertySidebar = ({ isOpen, onClose, property, onUpdate }) => {
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

  if (!isOpen || !property) return null;

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

  const handleSave = async (e) => {
    e.preventDefault();
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

  const inputClass = (editable = true) =>
    `w-full px-4 py-3 rounded-lg border border-base-300 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
      editable ? "bg-base-200" : "bg-base-300 cursor-not-allowed"
    }`;

  const labelClass = "block text-sm font-semibold text-base-content mb-1.5";
  const sectionClass = "flex flex-col gap-4";

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] md:w-[580px] bg-base-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 shrink-0">
          <h2 className="text-xl font-bold text-base-content">
            {isEditing ? "Edit Property" : "View Property"}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-base-300 rounded-full transition-colors text-base-content/60 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSave}
          className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6"
        >
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
              {error}
            </div>
          )}

          {/* Images */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">Images</h3>

            {/* View state */}
            {!isEditing && (
              <div className="grid grid-cols-3 gap-2">
                {property.rentImages?.length > 0 ? (
                  property.rentImages.map((url, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg overflow-hidden bg-base-300"
                    >
                      <img
                        src={url}
                        alt={`property-${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-base-content/40 col-span-3">
                    No images uploaded
                  </p>
                )}
              </div>
            )}

            {/* Edit state*/}
            {isEditing && (
              <>
                {existingImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map((url, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden bg-base-300"
                      >
                        <img
                          src={url}
                          alt={`existing-${i}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExisting(i)}
                          className="absolute top-1 right-1 bg-error text-white rounded-full p-0.5 hover:bg-error/90 cursor-pointer"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New image previews */}
                {newImagePreviews.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {newImagePreviews.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-square rounded-lg overflow-hidden bg-base-300"
                      >
                        <img
                          src={src}
                          alt={`new-${i}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveNew(i)}
                          className="absolute top-1 right-1 bg-error text-white rounded-full p-0.5 hover:bg-error/90 cursor-pointer"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Image upload */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleNewImages}
                  className="hidden"
                  accept="image/*"
                  multiple
                />
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-base-300 rounded-lg h-28 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-base-300 transition-colors"
                >
                  <CloudUpload
                    size={22}
                    className="text-base-content/40 mb-1"
                  />
                  <p className="text-xs text-base-content/40">
                    Drag & Drop or{" "}
                    <span className="text-primary font-semibold">
                      Click to browse
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Basic Info */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">
              Basic Info
            </h3>
            <div>
              <label className={labelClass}>Listing Title</label>
              <input
                type="text"
                name="rentTitle"
                value={formData.rentTitle || ""}
                onChange={handleInput}
                readOnly={!isEditing}
                className={inputClass(isEditing)}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                rows={3}
                name="rentDescription"
                value={formData.rentDescription || ""}
                onChange={handleInput}
                readOnly={!isEditing}
                className={`${inputClass(isEditing)} resize-none`}
              />
            </div>
          </div>

          {/* Category & Type */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">
              Category & Type
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  name="rentCategory"
                  value={formData.rentCategory || ""}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                >
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Type</label>
                <select
                  name="rentType"
                  value={formData.rentType || ""}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                >
                  {typeOptions.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">
              Property Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.rentDetails?.bedrooms || ""}
                  onChange={handleDetails}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
              <div>
                <label className={labelClass}>Bathrooms</label>
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.rentDetails?.bathrooms || ""}
                  onChange={handleDetails}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
              <div>
                <label className={labelClass}>Floor Area (sqm)</label>
                <input
                  type="number"
                  name="floorArea"
                  value={formData.rentDetails?.floorArea || ""}
                  onChange={handleDetails}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
              <div>
                <label className={labelClass}>Floor Level</label>
                <input
                  type="number"
                  name="floorLevel"
                  value={formData.rentDetails?.floorLevel || ""}
                  onChange={handleDetails}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
            </div>
            <label
              className={`flex items-center gap-3 ${isEditing ? "cursor-pointer" : "cursor-not-allowed"}`}
            >
              <input
                type="checkbox"
                name="furnished"
                checked={formData.rentDetails?.furnished || false}
                onChange={handleDetails}
                disabled={!isEditing}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="text-sm font-medium">Furnished</span>
            </label>
          </div>

          {/* Location */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">
              Location
            </h3>
            <div>
              <label className={labelClass}>Full Address</label>
              <input
                type="text"
                name="fullAddress"
                value={formData.rentLocation?.fullAddress || ""}
                onChange={handleLocation}
                readOnly={!isEditing}
                className={inputClass(isEditing)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.rentLocation?.city || ""}
                  onChange={handleLocation}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
              <div>
                <label className={labelClass}>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.rentLocation?.district || ""}
                  onChange={handleLocation}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">
              Amenities
            </h3>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map((a) => {
                const isSelected = formData.rentAmenities?.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => isEditing && handleAmenity(a)}
                    className={`px-3 py-1 rounded-full border text-xs font-medium capitalize transition ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-base-300 text-base-content/50"
                    } ${isEditing ? "cursor-pointer hover:bg-base-300" : "cursor-not-allowed"}`}
                  >
                    {a === "petsAllowed" ? "Pets Allowed" : a}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing & Status */}
          <div className={sectionClass}>
            <h3 className="font-semibold text-base-content text-sm">
              Pricing & Status
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Monthly Rent (₱)</label>
                <input
                  type="number"
                  name="rentPrice"
                  value={formData.rentPrice || ""}
                  onChange={handleInput}
                  readOnly={!isEditing}
                  className={inputClass(isEditing)}
                />
              </div>
              <div>
                <label className={labelClass}>Status</label>
                <select
                  name="rentStatus"
                  value={formData.rentStatus || ""}
                  onChange={handleInput}
                  disabled={!isEditing}
                  className={inputClass(isEditing)}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Tenant Name</label>
              <input
                type="text"
                name="rentTenant"
                value={formData.rentTenant || ""}
                onChange={handleInput}
                readOnly={!isEditing}
                className={inputClass(isEditing)}
              />
            </div>
          </div>
        </form>
        {/* actions */}
        <div className="bottom-0 bg-base-200 border-t border-base-300 pt-4 pb-2 flex justify-end gap-3 mt-auto">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 text-sm font-bold text-base-content/60 bg-base-300 rounded-lg hover:bg-base-300/80 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSave}
                className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-bold text-base-content/60 bg-base-300 rounded-lg hover:bg-base-300/80 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-all cursor-pointer"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewPropertySidebar;
