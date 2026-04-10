const categoryOptions = ["condo", "house", "apartment", "dorm"];
const typeOptions = ["studio", "1BR", "2BR", "3BR", "loft", "mezzanine"];
const statusOptions = ["available", "occupied", "reserved"];
const amenityOptions = [
  "parking", "pool", "gym", "petsAllowed", "wifi", "security",
];

const ViewPropertyFields = ({
  isEditing,
  formData,
  onInput,
  onDetails,
  onLocation,
  onAmenity,
}) => {
  const inputClass = (editable = true) =>
    `w-full px-4 py-3 rounded-lg border border-base-300 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all ${
      editable ? "bg-base-200" : "bg-base-300 cursor-not-allowed"
    }`;

  const labelClass = "block text-sm font-semibold text-base-content mb-1.5";
  const sectionClass = "flex flex-col gap-4";

  return (
    <>
      {/* Basic Info */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-base-content text-sm">Basic Info</h3>
        <div>
          <label className={labelClass}>Listing Title</label>
          <input type="text" name="rentTitle"
            value={formData.rentTitle || ""}
            onChange={onInput} readOnly={!isEditing}
            className={inputClass(isEditing)} />
        </div>
        <div>
          <label className={labelClass}>Description</label>
          <textarea rows={3} name="rentDescription"
            value={formData.rentDescription || ""}
            onChange={onInput} readOnly={!isEditing}
            className={`${inputClass(isEditing)} resize-none`} />
        </div>
      </div>

      {/* Category & Type */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-base-content text-sm">Category & Type</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select name="rentCategory" value={formData.rentCategory || ""}
              onChange={onInput} disabled={!isEditing}
              className={inputClass(isEditing)}>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Type</label>
            <select name="rentType" value={formData.rentType || ""}
              onChange={onInput} disabled={!isEditing}
              className={inputClass(isEditing)}>
              {typeOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-base-content text-sm">Property Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Bedrooms</label>
            <input type="number" name="bedrooms"
              value={formData.rentDetails?.bedrooms || ""}
              onChange={onDetails} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
          <div>
            <label className={labelClass}>Bathrooms</label>
            <input type="number" name="bathrooms"
              value={formData.rentDetails?.bathrooms || ""}
              onChange={onDetails} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
          <div>
            <label className={labelClass}>Floor Area (sqm)</label>
            <input type="number" name="floorArea"
              value={formData.rentDetails?.floorArea || ""}
              onChange={onDetails} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
          <div>
            <label className={labelClass}>Floor Level</label>
            <input type="number" name="floorLevel"
              value={formData.rentDetails?.floorLevel || ""}
              onChange={onDetails} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
        </div>
        <label className={`flex items-center gap-3 ${isEditing ? "cursor-pointer" : "cursor-not-allowed"}`}>
          <input type="checkbox" name="furnished"
            checked={formData.rentDetails?.furnished || false}
            onChange={onDetails} disabled={!isEditing}
            className="checkbox checkbox-primary checkbox-sm" />
          <span className="text-sm font-medium">Furnished</span>
        </label>
      </div>

      {/* Location */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-base-content text-sm">Location</h3>
        <div>
          <label className={labelClass}>Full Address</label>
          <input type="text" name="fullAddress"
            value={formData.rentLocation?.fullAddress || ""}
            onChange={onLocation} readOnly={!isEditing}
            className={inputClass(isEditing)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>City</label>
            <input type="text" name="city"
              value={formData.rentLocation?.city || ""}
              onChange={onLocation} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
          <div>
            <label className={labelClass}>District</label>
            <input type="text" name="district"
              value={formData.rentLocation?.district || ""}
              onChange={onLocation} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-base-content text-sm">Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((a) => {
            const isSelected = formData.rentAmenities?.includes(a);
            return (
              <button key={a} type="button"
                onClick={() => isEditing && onAmenity(a)}
                className={`px-3 py-1 rounded-full border text-xs font-medium capitalize transition ${
                  isSelected
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-base-300 text-base-content/50"
                } ${isEditing ? "cursor-pointer hover:bg-base-300" : "cursor-not-allowed"}`}>
                {a === "petsAllowed" ? "Pets Allowed" : a}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing & Status */}
      <div className={sectionClass}>
        <h3 className="font-semibold text-base-content text-sm">Pricing & Status</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Monthly Rent (₱)</label>
            <input type="number" name="rentPrice"
              value={formData.rentPrice || ""}
              onChange={onInput} readOnly={!isEditing}
              className={inputClass(isEditing)} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="rentStatus" value={formData.rentStatus || ""}
              onChange={onInput} disabled={!isEditing}
              className={inputClass(isEditing)}>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Tenant Name</label>
          <input type="text" name="rentTenant"
            value={formData.rentTenant || ""}
            onChange={onInput} readOnly={!isEditing}
            className={inputClass(isEditing)} />
        </div>
      </div>
    </>
  );
};

export default ViewPropertyFields;