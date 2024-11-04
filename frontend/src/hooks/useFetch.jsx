import { useEffect, useState } from "react";

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          method: "GET",
        });
        const data = await res.json();
        if (res.ok) {
          setLoading(false);
          setData(data);
        } else {
          setLoading(false);
          setError(data.message);
          // console.log(`Error: ${res.status} - ${res.statusText}`);
          // console.log(await res.text());
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
