import { Eye, Trash2 } from "lucide-react";

const ActionMenu = ({ isOpen, onView, onDelete, isLastRow }) => {
  if (!isOpen) return null;

  const menuPosition = isLastRow ? "bottom-6" : "top-6";

  return (
    <div
      className={`absolute right-0 ${menuPosition} z-10`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="bg-base-100 border border-base-300 min-w-[120px] rounded-lg shadow-lg">
        <button
          className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-base-content hover:bg-base-200 transition-colors rounded-t-lg"
          onClick={onView}
        >
          <Eye className="h-4 w-4" /> View
        </button>
        <button
          className="w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors rounded-b-lg"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" /> Delete
        </button>
      </div>
    </div>
  );
};

export default ActionMenu;
