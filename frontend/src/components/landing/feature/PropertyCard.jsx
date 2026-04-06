const PropertyCard = ({
  tag,
  title,
  location,
  price,
  status,
  gradientClass,
  icon,
}) => {
  return (
    <div className="bg-base-100 border border-base-300/70 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-base-300">
      {/* Image placeholder */}
      <div
        className={`h-40 w-full flex items-center justify-center ${gradientClass}`}
      >
        {icon}
      </div>

      {/* Card body */}
      <div className="px-4 pt-3 pb-4 flex flex-col">
        {/* Tag */}
        <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/10 px-2 py-0.5 rounded mb-1.5">
          {tag}
        </span>

        {/* Title */}
        <div className="text-sm font-medium mb-0.5">{title}</div>

        {/* Location */}
        <div className="text-xs text-base-content/45 mb-3">{location}</div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="font-serif text-base">
            {price}{" "}
            <span className="font-sans text-xs font-light text-base-content/40">
              / month
            </span>
          </div>

          {status === "available" ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Available
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-medium text-warning">
              <span className="w-1.5 h-1.5 rounded-full bg-warning" />
              Move-in soon
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
