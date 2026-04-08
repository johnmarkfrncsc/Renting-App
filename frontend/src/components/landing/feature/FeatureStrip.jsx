import featureStripData from "../data/featureStripData";

const FeatureStrip = () => {
  return (
    <div className="bg-base-100 border-t border-b border-base-300/60 py-14 md:py-16 px-5 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureStripData.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className="bg-base-200 border border-base-300/60 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-primary" />
              </div>

              <div className="text-sm font-semibold mb-2">{feature.title}</div>

              <p className="text-xs font-medium leading-relaxed text-base-content/60">
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
