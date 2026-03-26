import { useState, useEffect } from "react";
import api from "../../api/axios.js";

const useOverviewData = (userId) => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverviewData = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/rents");
        const data = response.data.data || [];

        const filteredProperties = data.filter((p) => p.userId === userId);
        setProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userId) fetchOverviewData();
  }, [userId]);

  return {
    properties,
    isLoading,
    error,
  };
};

export default useOverviewData;
