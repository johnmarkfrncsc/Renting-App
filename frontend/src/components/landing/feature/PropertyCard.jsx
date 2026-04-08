const PropertyCard = ({ tag, title, location, price, status, image }) => {
  return (
    <div className="bg-base-200 border border-base-300/70 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-base-300">
      {/* Image placeholder */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
      />

      {/* Card body */}
      <div className="px-4 pt-3 pb-4 flex flex-col">
        <span className="w-fit inline-block text-xs font-semibold uppercase tracking-wide text-primary bg-primary/20 px-2 py-0.5 rounded mb-1.5">
          {tag}
        </span>

        <div className="text-sm font-medium mb-0.5">{title}</div>

        <div className="text-xs text-base-content/60 mb-3">{location}</div>

        <div className="flex items-center justify-between mt-auto">
          <div className="font-serif text-base">
            {price}{" "}
            <span className="font-sans text-xs text-base-content/60">
              / month
            </span>
          </div>

          {status === "available" ? (
            <div className="flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              Available
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-medium text-warning whitespace-nowrap">
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
