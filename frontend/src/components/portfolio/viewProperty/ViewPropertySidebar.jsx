import { X } from "lucide-react";
import { useViewProperty } from "../../hooks/useViewProperty";
import ViewPropertyImages from "../viewProperty/ViewPropertyImages";
import ViewPropertyFields from "../viewProperty/ViewPropertyFields";

const ViewPropertySidebar = ({ isOpen, onClose, property, onUpdate }) => {
  const {
    isEditing,
    setIsEditing,
    formData,
    isLoading,
    error,
    existingImages,
    newImagePreviews,
    fileInputRef,
    handleInput,
    handleDetails,
    handleLocation,
    handleAmenity,
    handleNewImages,
    handleRemoveExisting,
    handleRemoveNew,
    handleCancelEdit,
    handleClose,
    handleSave,
  } = useViewProperty({ property, onClose, onUpdate });

  if (!isOpen || !property) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] md:w-[580px] bg-base-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-300 shrink-0">
          <h2 className="text-xl font-bold text-base-content">
            {isEditing ? "Edit Property" : "View Property"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-base-300 rounded-full transition-colors text-base-content/60 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">
          {error && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-sm text-error">
              {error}
            </div>
          )}

          <ViewPropertyImages
            isEditing={isEditing}
            property={property}
            existingImages={existingImages}
            newImagePreviews={newImagePreviews}
            fileInputRef={fileInputRef}
            onNewImages={handleNewImages}
            onRemoveExisting={handleRemoveExisting}
            onRemoveNew={handleRemoveNew}
          />

          <ViewPropertyFields
            isEditing={isEditing}
            formData={formData}
            onInput={handleInput}
            onDetails={handleDetails}
            onLocation={handleLocation}
            onAmenity={handleAmenity}
          />
        </div>

        {/* Footer actions — outside scroll area */}
        <div className="shrink-0 bg-base-200 border-t border-base-300 px-6 pt-4 pb-4 flex justify-end gap-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-5 py-2.5 text-sm font-bold text-base-content/60 bg-base-300 rounded-lg hover:bg-base-300/80 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={isLoading}
                className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleClose}
                className="px-5 py-2.5 text-sm font-bold text-base-content/60 bg-base-300 rounded-lg hover:bg-base-300/80 transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 text-sm font-bold bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-all cursor-pointer"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewPropertySidebar;
