import { useEffect, useState } from "react";

const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          setData(data);
        } else {
          console.log(`Error: ${res.status} - ${res.statusText}`);
          console.log(await res.text());
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);
  return { data };
};

export default useFetch;
