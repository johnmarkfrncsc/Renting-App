import featureStripData from "./data/featureStripData";

const FeatureStrip = () => {
  return (
    <div className="bg-base-100 border-t border-b border-base-300/60 py-14 md:py-16 px-5 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-10 md:gap-0">
        {featureStripData.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="w-full sm:w-1/2 lg:w-1/4 md:px-6 lg:px-8"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <Icon size={20} className="text-primary" />
              </div>

              <div className="text-sm font-semibold mb-1.5">
                {feature.title}
              </div>

              <p className="text-xs font-light leading-relaxed text-base-content/50">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeatureStrip;
