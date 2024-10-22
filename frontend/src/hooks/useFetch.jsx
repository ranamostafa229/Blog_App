import { useEffect, useState } from "react";

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
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
          console.log(`Error: ${res.status} - ${res.statusText}`);
          console.log(await res.text());
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [url]);
  return { data, loading };
};

export default useFetch;
