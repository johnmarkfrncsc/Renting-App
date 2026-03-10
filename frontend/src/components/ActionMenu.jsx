import { Eye, Trash2 } from "lucide-react";

const ActionMenu = ({ isOpen, onView, onDelete, isLastRow }) => {
  if (!isOpen) return null;

  const menuPosition = () => {
    return isLastRow ? "bottom-6" : "top-6";
  };

  return (
    <div
      className={`absolute right-0 ${menuPosition()} z-10 bg-white **:text-right`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div>
        <div className="bg-white border min-w-[120px] border-gray-200 rounded-lg shadow-lg **:flex **:gap-2 **:hover:bg-gray-100">
          <button
            className="w-full text-left px-4 py-2 text-sm  "
            onClick={onView}
          >
            <Eye className="h-5 w-5" /> View
          </button>
          <button
            className="w-full text-left px-4 py-2 text-sm"
            onClick={onDelete}
          >
            <Trash2 className="h-5 w-5" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionMenu;
