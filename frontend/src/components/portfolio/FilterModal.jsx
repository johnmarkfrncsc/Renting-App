import { useState, useEffect } from "react";
import { X } from "lucide-react";

const categories = ["", "condo", "house", "apartment", "dorm"];
const types = ["", "studio", "1BR", "2BR", "3BR", "loft", "mezzanine"];
const statuses = ["", "available", "reserved", "occupied"];

const FilterModal = ({ isOpen, onClose, onApply, currentFilters }) => {
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setCategory(currentFilters.category);
      setType(currentFilters.type);
      setStatus(currentFilters.status);
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

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
    `px-3 py-1 rounded-full border text-sm cursor-pointer transition capitalize ${
      value === ""
        ? selected.length === 0
          ? "bg-primary/20 text-primary border-primary"
          : "border-base-300 text-base-content hover:bg-base-200"
        : selected.includes(value)
          ? "bg-primary/20 text-primary border-primary"
          : "border-base-300 text-base-content hover:bg-base-200"
    }`;

  return (
    <div className="fixed inset-0 bg-base-100/40 flex items-center justify-center z-50">
      <div className="bg-base-200 w-full max-w-lg rounded-xl p-6 shadow-lg border border-base-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl tracking-wide">Filters</h2>
          <button className="cursor-pointer" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-4">
          <p className="text-sm mb-2 font-medium tracking-wide">Categories</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => toggle(c, category, setCategory)}
                className={pillClass(c, category)}
              >
                {c || "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Types */}
        <div className="mb-4">
          <p className="text-sm mb-2 font-medium tracking-wide">Type</p>
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => toggle(t, type, setType)}
                className={pillClass(t, type)}
              >
                {t || "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          <p className="text-sm mb-2 font-medium tracking-wide">Status</p>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => toggle(s, status, setStatus)}
                className={pillClass(s, status)}
              >
                {s || "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          {/* Reset */}
          <button
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
              onClick={() => {
                setCategory(currentFilters.category);
                setType(currentFilters.type);
                setStatus(currentFilters.status);
                onClose();
              }}
              className="px-4 py-2 text-sm rounded-lg border border-base-300"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                onApply({ category, type, status });
                onClose();
              }}
              className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-content"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
