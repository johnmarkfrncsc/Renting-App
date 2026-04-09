import { ArrowLeft } from "lucide-react";
import useAddListing from "../../hooks/useAddListing";
import AddListingForm from "../addListing/AddListingForm";
import AddListingPreview from "../addListing/AddListingPreview";

const AddListingPage = () => {
  const {
    formData,
    imagePreviews,
    isLoading,
    toast,
    preview,
    fileInputRef,
    categoryOptions,
    typeOptions,
    statusOptions,
    amenityOptions,
    handleInput,
    handleDetails,
    handleLocation,
    handleAmenity,
    handleImageChange,
    handleImageRemove,
    handleSubmit,
    navigate,
  } = useAddListing();

  return (
    <div className="min-h-screen px-8">
      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded-xl shadow-lg text-sm font-semibold text-white transition-all ${
            toast.success ? "bg-success" : "bg-error"
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/admin/portfolio")}
          className="p-2 hover:bg-base-300 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-base-content">Add Property</h1>
        </div>
      </div>

      {/* Two column layout */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        <AddListingForm
          formData={formData}
          imagePreviews={imagePreviews}
          isLoading={isLoading}
          fileInputRef={fileInputRef}
          categoryOptions={categoryOptions}
          typeOptions={typeOptions}
          statusOptions={statusOptions}
          amenityOptions={amenityOptions}
          handleInput={handleInput}
          handleDetails={handleDetails}
          handleLocation={handleLocation}
          handleAmenity={handleAmenity}
          handleImageChange={handleImageChange}
          handleImageRemove={handleImageRemove}
          handleSubmit={handleSubmit}
          onCancel={() => navigate("/admin/portfolio")}
        />
        <AddListingPreview preview={preview} />
      </div>
    </div>
  );
};

export default AddListingPage;
