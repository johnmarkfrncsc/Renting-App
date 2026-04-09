import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const categoryOptions = ["condo", "house", "apartment", "dorm"];
const typeOptions = ["studio", "1BR", "2BR", "3BR", "loft", "mezzanine"];
const statusOptions = ["available", "occupied", "reserved"];
const amenityOptions = [
  { value: "parking", label: "Parking" },
  { value: "pool", label: "Pool" },
  { value: "gym", label: "Gym" },
  { value: "petsAllowed", label: "Pets Allowed" },
  { value: "wifi", label: "WiFi" },
  { value: "security", label: "Security" },
];

const initialForm = {
  rentTitle: "",
  rentDescription: "",
  rentCategory: "",
  rentType: "",
  rentPrice: "",
  rentStatus: "available",
  rentTenant: "",
  rentDetails: {
    bedrooms: "",
    bathrooms: "",
    floorArea: "",
    floorLevel: "",
    furnished: false,
  },
  rentLocation: {
    fullAddress: "",
    city: "",
    district: "",
  },
  rentAmenities: [],
};

const useAddListing = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [formData, setFormData] = useState(initialForm);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    success: false,
    message: "",
  });

  {
    /* handleInput */
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDetails = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentDetails: {
        ...prev.rentDetails,
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  const handleLocation = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      rentLocation: { ...prev.rentLocation, [name]: value },
    }));
  };

  const handleAmenity = (value) => {
    setFormData((prev) => ({
      ...prev,
      rentAmenities: prev.rentAmenities.includes(value)
        ? prev.rentAmenities.filter((a) => a !== value)
        : [...prev.rentAmenities, value],
    }));
  };

  {
    /* handleImage */
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).filter((f) =>
      f.type.match("image.*"),
    );
    setImageFiles((prev) => [...prev, ...files]);
    setImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const handleImageRemove = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  {
    /*  cloudinary */
  }

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`,
      { method: "POST", body: data },
    );
    const json = await res.json();
    return json.secure_url;
  };

  {
    /* toast & navigate */
  }

  const showToast = (success, message) => {
    setToast({ show: true, success, message });
    setTimeout(() => {
      setToast({ show: false, success: false, message: "" });
      navigate("/admin/portfolio");
    }, 2000);
  };

  {
    /* handleSubmit  */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      rentTitle,
      rentDescription,
      rentCategory,
      rentType,
      rentPrice,
      rentLocation,
      rentDetails,
    } = formData;

    if (
      !rentTitle ||
      !rentDescription ||
      !rentCategory ||
      !rentType ||
      !rentPrice
    ) {
      return showToast(false, "Please fill in all required fields");
    }
    if (!rentLocation.fullAddress || !rentLocation.city) {
      return showToast(false, "Please fill in the full address and city");
    }
    if (!rentDetails.bedrooms || !rentDetails.bathrooms) {
      return showToast(false, "Please fill in bedrooms and bathrooms");
    }
    if (imageFiles.length === 0) {
      return showToast(false, "Please upload at least one image");
    }

    setIsLoading(true);

    try {
      const rentImages = await Promise.all(imageFiles.map(uploadToCloudinary));

      const response = await api.post("/rents", {
        ...formData,
        rentPrice: parseFloat(formData.rentPrice),
        rentDetails: {
          ...formData.rentDetails,
          bedrooms: parseInt(formData.rentDetails.bedrooms),
          bathrooms: parseInt(formData.rentDetails.bathrooms),
          floorArea: formData.rentDetails.floorArea
            ? parseFloat(formData.rentDetails.floorArea)
            : undefined,
          floorLevel: formData.rentDetails.floorLevel
            ? parseInt(formData.rentDetails.floorLevel)
            : undefined,
        },
        rentImages,
      });

      if (response.data.success || response.status === 201) {
        showToast(true, "Property created successfully!");
      }
    } catch (err) {
      showToast(
        false,
        err.response?.data?.message ||
          "Failed to create listing. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  {
    /*  data preview */
  }

  const preview = {
    title: formData.rentTitle || "Property Title",
    address: formData.rentLocation.fullAddress || "Full address",
    city: formData.rentLocation.city || "City",
    price: formData.rentPrice
      ? `₱${parseFloat(formData.rentPrice).toLocaleString()}`
      : "₱0",
    category: formData.rentCategory || "—",
    type: formData.rentType || "—",
    bedrooms: formData.rentDetails.bedrooms || "—",
    bathrooms: formData.rentDetails.bathrooms || "—",
    floorArea: formData.rentDetails.floorArea
      ? `${formData.rentDetails.floorArea} sqm`
      : "—",
    furnished: formData.rentDetails.furnished,
    amenities: formData.rentAmenities,
    image: imagePreviews[0] || null,
    status: formData.rentStatus || "available",
  };

  return {
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
  };
};

export default useAddListing;
