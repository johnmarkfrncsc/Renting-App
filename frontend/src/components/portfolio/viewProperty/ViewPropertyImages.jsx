import { X, CloudUpload } from "lucide-react";

const ViewPropertyImages = ({
  isEditing,
  property,
  existingImages,
  newImagePreviews,
  fileInputRef,
  onNewImages,
  onRemoveExisting,
  onRemoveNew,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-base-content text-sm">Images</h3>

      {/* Viewing state */}
      {!isEditing && (
        <div className="grid grid-cols-3 gap-2">
          {property.rentImages?.length > 0 ? (
            property.rentImages.map((url, i) => (
              <div
                key={i}
                className="aspect-square rounded-lg overflow-hidden bg-base-300"
              >
                <img
                  src={url}
                  alt={`property-${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p className="text-xs text-base-content/40 col-span-3">
              No images uploaded
            </p>
          )}
        </div>
      )}

      {/* Editing state */}
      {isEditing && (
        <>
          {/* Existing images*/}
          {existingImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {existingImages.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden bg-base-300"
                >
                  <img
                    src={url}
                    alt={`existing-${i}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveExisting(i)}
                    className="absolute top-1 right-1 bg-error text-white rounded-full p-0.5 hover:bg-error/90 cursor-pointer"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* New image preview */}
          {newImagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {newImagePreviews.map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-lg overflow-hidden bg-base-300"
                >
                  <img
                    src={src}
                    alt={`new-${i}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveNew(i)}
                    className="absolute top-1 right-1 bg-error text-white rounded-full p-0.5 hover:bg-error/90 cursor-pointer"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload zone */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onNewImages}
            className="hidden"
            accept="image/*"
            multiple
          />
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-base-300 rounded-lg h-28 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-base-300 transition-colors"
          >
            <CloudUpload size={22} className="text-base-content/40 mb-1" />
            <p className="text-xs text-base-content/40">
              Drag & Drop or{" "}
              <span className="text-primary font-semibold">
                Click to browse
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewPropertyImages;
