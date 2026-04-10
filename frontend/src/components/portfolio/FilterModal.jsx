import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const categories = ["", "condo", "house", "apartment", "dorm"];
const types = ["", "studio", "1BR", "2BR", "3BR", "loft", "mezzanine"];
const statuses = ["", "available", "reserved", "occupied"];

const FilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);

  const dragStartY = useRef(0);
  const dragCurrentY = useRef(0);
  const sheetRef = useRef();
  const lastY = useRef(0);
  const lastTime = useRef(0);
  const [dragY, setDragY] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCategory(currentFilters.category);
      setType(currentFilters.type);
      setStatus(currentFilters.status);

      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
      }
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (!sheetRef.current) return;

    sheetRef.current.style.transition =
      "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
    sheetRef.current.style.transform = "translateY(100%)";

    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleDragStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    dragCurrentY.current = 0;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "none";
    }
    lastY.current = e.touches[0].clientY;
    lastTime.current = Date.now();
  };

  const handleDragMove = (e) => {
    if (!sheetRef.current) return;

    const currentY = e.touches[0].clientY;
    const now = Date.now();

    const delta = currentY - dragStartY.current;
    if (delta <= 0) return;

    dragCurrentY.current = delta;
    setDragY(delta);

    const dy = currentY - lastY.current;
    const dt = now - lastTime.current;
    const velocity = dt > 0 ? dy / dt : 0;

    lastY.current = currentY;
    lastTime.current = now;

    sheetRef.current.dataset.velocity = velocity;

    const resistance = delta * 0.85;

    sheetRef.current.style.transform = `translateY(${resistance}px)`;
  };

  const handleDragEnd = () => {
    if (!sheetRef.current) return;

    const velocity = parseFloat(sheetRef.current.dataset.velocity || "0");

    setDragY(0);

    sheetRef.current.style.transition =
      "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)";

    if (dragCurrentY.current > 120 || velocity > 0.5) {
      sheetRef.current.style.transform = "translateY(100%)";

      setTimeout(() => {
        onClose();
      }, 300);
    } else {
      sheetRef.current.style.transform = "translateY(0)";
    }
  };

  const toggle = (value, current, setter) => {
    if (value === "") {
      setter([]);
    } else if (current.includes(value)) {
      setter(current.filter((v) => v !== value));
    } else {
      setter([...current, value]);
    }
  };

  const pillClass = (value, selected) =>
    `px-3 py-1 rounded-full border text-sm font-medium cursor-pointer transition capitalize ${
      value === ""
        ? selected.length === 0
          ? "bg-primary/20 text-base-content border-primary"
          : "border-base-400 text-base-content hover:bg-base-300"
        : selected.includes(value)
          ? "bg-primary/20 text-base-content border-primary"
          : "border-base-400 text-base-content hover:bg-base-300"
    }`;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-200"
        style={{
          opacity: dragY > 0 ? 1 - Math.min(dragY / 300, 1) : 1,
        }}
        onClick={handleClose}
      />

      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        <div
          ref={sheetRef}
          className={`bg-base-200 w-full md:max-w-lg rounded-t-2xl md:rounded-xl shadow-lg border border-base-300 max-h-[85vh] flex flex-col md:animate-none`}
        >
          <div
            className="flex justify-center pt-3 pb-1 md:hidden touch-none"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="w-20 h-1.5 rounded-full bg-base-content/30 active:bg-base-content/50" />
          </div>

          {/* Header */}
          <div className="flex justify-between items-center px-6 pt-4 pb-3 md:pt-6">
            <h2 className="font-semibold text-xl tracking-wide">Filters</h2>
            <button
              type="button"
              className="cursor-pointer hidden md:block"
              onClick={handleClose}
            >
              <X />
            </button>
          </div>

          <div className="overflow-y-auto px-6 pb-4 flex flex-col gap-4">
            <div>
              <p className="text-sm mb-2 font-medium tracking-wide">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggle(c, category, setCategory)}
                    className={pillClass(c, category)}
                  >
                    {c || "All"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm mb-2 font-medium tracking-wide">Type</p>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggle(t, type, setType)}
                    className={pillClass(t, type)}
                  >
                    {t || "All"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm mb-2 font-medium tracking-wide">Status</p>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggle(s, status, setStatus)}
                    className={pillClass(s, status)}
                  >
                    {s || "All"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="shrink-0 flex justify-between items-center px-6 py-4 border-t border-base-300">
            <button
              type="button"
              onClick={() => {
                setCategory([]);
                setType([]);
                setStatus([]);
              }}
              className="text-xs text-base-content/60 hover:text-base-content cursor-pointer"
            >
              Reset all
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setCategory(currentFilters.category);
                  setType(currentFilters.type);
                  setStatus(currentFilters.status);
                  handleClose();
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg border-2 border-base-300 cursor-pointer hover:bg-base-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onApply({ category, type, status });
                  handleClose();
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg border-2 border-primary/20 bg-primary/80 text-primary-content cursor-pointer hover:bg-primary"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
