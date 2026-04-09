import {
  BedDouble,
  Bath,
  Ruler,
  Building,
  Car,
  Dumbbell,
  PawPrint,
  Wifi,
  WavesLadder,
  Cctv,
} from "lucide-react";

const statusColor = {
  available: "bg-success text-base-100",
  occupied: "bg-error text-base-100",
  reserved: "bg-warning text-base-100",
};

const amenityIcons = {
  parking: Car,
  pool: WavesLadder,
  gym: Dumbbell,
  petsAllowed: PawPrint,
  wifi: Wifi,
  security: Cctv,
};

const AddListingPreview = ({ preview }) => {
  return (
    <div className="w-full xl:w-80 xl:sticky xl:top-6 shadow-lg">
      <div className="bg-base-200 border border-base-300 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-base-300">
          <h2 className="font-semibold text-sm text-base-content">
            Quick Preview
          </h2>
        </div>

        {/* Image */}
        <div className="w-full h-44 bg-base-300/50 flex items-center justify-center overflow-hidden">
          {preview.image ? (
            <img
              src={preview.image}
              alt="preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-base-content/30">No image yet</span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-3">
          {/* Title + Status */}
          <div className="flex items-start justify-between gap-2">
            <p className="font-bold text-base-content text-sm leading-snug">
              {preview.title}
            </p>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 capitalize ${statusColor[preview.status]}`}
            >
              {preview.status}
            </span>
          </div>

          {/* Address */}
          <p className="text-xs text-base-content/50">
            {preview.address}
            {preview.city !== "City" ? `, ${preview.city}` : ""}
          </p>

          {/* Category + Type */}
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 bg-base-200 rounded-lg capitalize">
              {preview.category}
            </span>
            <span className="text-xs px-2 py-1 bg-base-200 rounded-lg capitalize">
              {preview.type}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded-lg">
              <BedDouble size={12} /> {preview.bedrooms} Bed
            </span>
            <span className="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded-lg">
              <Bath size={12} /> {preview.bathrooms} Bath
            </span>
            {preview.floorArea !== "—" && (
              <span className="flex items-center gap-1 text-xs bg-base-200 px-2 py-1 rounded-lg">
                <Ruler size={12} /> {preview.floorArea}
              </span>
            )}
            {preview.furnished && (
              <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">
                <Building size={12} /> Furnished
              </span>
            )}
          </div>

          {/* Amenities */}
          {preview.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {preview.amenities.map((a) => {
                const Icon = amenityIcons[a];
                return (
                  <span
                    key={a}
                    className="flex items-center gap-1 text-xs px-3 py-0.5 bg-base-300/80 rounded-full capitalize"
                  >
                    {Icon && <Icon size={11} />}
                    {a === "petsAllowed" ? "Pets" : a}
                  </span>
                );
              })}
            </div>
          )}

          {/* Price */}
          <p className="text-lg font-bold text-success">
            {preview.price}
            <span className="text-xs font-normal text-base-content/40">
              /month
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddListingPreview;
