import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (endpoint = "", params = {}, shouldStart = true) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params,
    headers: {
      "X-RapidAPI-Key": "566070f835msh49466dc691b810ap13108ajsnebac90606a61",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  const fetch = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data?.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setError(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (shouldStart) {
      fetch();
    }
  }, [shouldStart]);

  const refetch = () => {
    fetch();
  };

  return { data, isLoading, error, refetch };
};
