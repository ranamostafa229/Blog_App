import { useCallback, useEffect, useState } from "react";

// const useFetch = (url, initialState) => {
//   const [data, setData] = useState(initialState);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(url, {
//           method: "GET",
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setLoading(false);
//           setData(data);
//         } else {
//           setLoading(false);
//           setError(data.message);
//         }
//       } catch (error) {
//         setLoading(false);
//         setError(error.message);
//       }
//     };
//     fetchData();
//   }, [url]);
//   const addData = (newData) => {
//     setData((prevData) => [...prevData, newData]);
//   };

//   return { data, loading, error, addData };
// };

// export default useFetch;
const useFetch = (url, initialState) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url]);
  useEffect(() => {
    fetchData();
  }, [url, fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
