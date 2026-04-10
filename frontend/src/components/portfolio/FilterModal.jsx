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

  useEffect(() => {
    if (isOpen) {
      setCategory(currentFilters.category);
      setType(currentFilters.type);
      setStatus(currentFilters.status);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const handleDragStart = (e) => {
    dragStartY.current = e.touches[0].clientY;
    dragCurrentY.current = 0;

    if (sheetRef) {
      sheetRef.current.style.transition = "none";
    }
  };

  const handleDragMove = (e) => {
    const delta = e.touches[0].clientY - dragStartY.current;

    if (delta < 0) {
      dragCurrentY.current = delta;
    }
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${delta}px)`;
    }
  };

  const handleDragEnd = () => {
    if (sheetRef.current) {
      sheetRef.current.style.transition = "transform 0.3s ease";
    }
    if (dragCurrentY.current > 100) {
      onClose();
    } else {
      if (sheetRef.current) {
        sheetRef.current.style.transform = "translateY(0)";
      }
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        <div
          ref={sheetRef}
          className="bg-base-200 w-full md:max-w-lg rounded-t-2xl md:rounded-xl shadow-lg border border-base-300 max-h-[85vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex justify-center pt-3 pb-1 md:hidden touch-none"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div className="w-10 h-1.5 rounded-full bg-base-content/30 active:bg-base-content/50" />
          </div>

          {/* Header */}
          <div className="flex justify-between items-center px-6 pt-4 pb-3 md:pt-6">
            <h2 className="font-semibold text-xl tracking-wide">Filters</h2>
            <button
              type="button"
              className="cursor-pointer hidden md:block"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="overflow-y-auto px-6 pb-4 flex flex-col gap-4">
            {/* Categories */}
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

            {/* Types */}
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

            {/* Status */}
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
                  onClose();
                }}
                className="px-4 py-2 text-sm font-medium rounded-lg border-2 border-base-300 cursor-pointer hover:bg-base-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onApply({ category, type, status });
                  onClose();
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
