import {
  CloudUpload,
  X,
  Car,
  Waves,
  Dumbbell,
  PawPrint,
  Wifi,
  ShieldCheck,
} from "lucide-react";

const iconMap = {
  parking: Car,
  pool: Waves,
  gym: Dumbbell,
  petsAllowed: PawPrint,
  wifi: Wifi,
  security: ShieldCheck,
};

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-base-300 bg-base-300/20 text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm";
const labelClass = "block text-sm font-semibold text-base-content mb-1.5";
const sectionClass =
  "bg-base-100 border border-base-300 rounded-xl p-5 flex flex-col gap-4";

const AddListingForm = ({
  formData,
  imagePreviews,
  isLoading,
  fileInputRef,
  categoryOptions,
  typeOptions,
  statusOptions,
  amenityOptions,
  handleInput,
  handleDetails,
  handleLocation,
  handleAmenity,
  handleImageChange,
  handleImageRemove,
  handleSubmit,
  onCancel,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5">
      {/* Basic Info */}
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Basic Info</h2>
        <div>
          <label className={labelClass}>
            Property Name <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="rentTitle"
            placeholder="e.g. Modern Studio at Blue Sky Towers"
            value={formData.rentTitle}
            onChange={handleInput}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            Description <span className="text-error">*</span>
          </label>
          <textarea
            rows={4}
            name="rentDescription"
            placeholder="Tell us about the property..."
            value={formData.rentDescription}
            onChange={handleInput}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {/* Category & Type */}
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Category & Type</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Category <span className="text-error">*</span>
            </label>
            <select
              name="rentCategory"
              value={formData.rentCategory}
              onChange={handleInput}
              className={inputClass}
            >
              <option value="">Select category</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>
              Type <span className="text-error">*</span>
            </label>
            <select
              name="rentType"
              value={formData.rentType}
              onChange={handleInput}
              className={inputClass}
            >
              <option value="">Select type</option>
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
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Property Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Bedrooms <span className="text-error">*</span>
            </label>
            <input
              type="number"
              name="bedrooms"
              placeholder="e.g. 2"
              value={formData.rentDetails.bedrooms}
              onChange={handleDetails}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>
              Bathrooms <span className="text-error">*</span>
            </label>
            <input
              type="number"
              name="bathrooms"
              placeholder="e.g. 1"
              value={formData.rentDetails.bathrooms}
              onChange={handleDetails}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Floor Area (sqm)</label>
            <input
              type="number"
              name="floorArea"
              placeholder="e.g. 45"
              value={formData.rentDetails.floorArea}
              onChange={handleDetails}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Floor Level</label>
            <input
              type="number"
              name="floorLevel"
              placeholder="e.g. 5"
              value={formData.rentDetails.floorLevel}
              onChange={handleDetails}
              className={inputClass}
            />
          </div>
        </div>
        <label className="flex items-center gap-3 cursor-pointer w-fit">
          <input
            type="checkbox"
            name="furnished"
            checked={formData.rentDetails.furnished}
            onChange={handleDetails}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className="text-sm font-medium">Furnished</span>
        </label>
      </div>

      {/* Location */}
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Location</h2>
        <div>
          <label className={labelClass}>
            Full Address <span className="text-error">*</span>
          </label>
          <input
            type="text"
            name="fullAddress"
            placeholder="e.g. 123 Ayala Ave, Makati"
            value={formData.rentLocation.fullAddress}
            onChange={handleLocation}
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              City <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Makati"
              value={formData.rentLocation.city}
              onChange={handleLocation}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>District</label>
            <input
              type="text"
              name="district"
              placeholder="e.g. BGC"
              value={formData.rentLocation.district}
              onChange={handleLocation}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Amenities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {amenityOptions.map(({ value, label }) => {
            const Icon = iconMap[value];
            const isSelected = formData.rentAmenities.includes(value);
            return (
              <button
                key={value}
                type="button"
                onClick={() => handleAmenity(value)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition cursor-pointer ${
                  isSelected
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-base-300 text-base-content/60 hover:bg-base-200"
                }`}
              >
                {Icon && <Icon size={15} />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing & Status */}
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Pricing & Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              Monthly Rent (₱) <span className="text-error">*</span>
            </label>
            <input
              type="number"
              name="rentPrice"
              placeholder="e.g. 25000"
              value={formData.rentPrice}
              onChange={handleInput}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select
              name="rentStatus"
              value={formData.rentStatus}
              onChange={handleInput}
              className={inputClass}
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
            placeholder="e.g. Juan dela Cruz"
            value={formData.rentTenant}
            onChange={handleInput}
            className={inputClass}
          />
        </div>
      </div>

      {/* Images */}
      <div className={` bg-base-200 ${sectionClass}`}>
        <h2 className="font-semibold text-base-content">Property Images</h2>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
          multiple
        />
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed border-base-300 rounded-lg h-36 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-base-200 transition-colors"
        >
          <CloudUpload size={26} className="text-base-content/40 mb-2" />
          <p className="text-sm text-base-content/40">
            Drag & Drop or{" "}
            <span className="text-primary font-semibold">Click to browse</span>
          </p>
          <p className="text-xs text-base-content/30 mt-1">
            Multiple images supported
          </p>
        </div>
        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            {imagePreviews.map((src, i) => (
              <div
                key={i}
                className="relative rounded-lg overflow-hidden aspect-square"
              >
                <img
                  src={src}
                  alt={`preview-${i}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(i)}
                  className="absolute top-1 right-1 bg-error text-white rounded-full p-0.5 hover:bg-error/90 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-semibold border border-base-300 rounded-lg hover:bg-base-300 transition-colors disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-5 py-2.5 text-sm font-semibold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? "Saving..." : "Save Property"}
        </button>
      </div>
    </form>
  );
};

export default AddListingForm;
