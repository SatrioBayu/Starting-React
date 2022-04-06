import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Cleanup
  const abortCont = new AbortController();

  useEffect(() => {
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Unknown Endpoint So Cannot fetch data");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
          setError(null);
        })
        .catch((err) => {
          // Cleanup
          if (err.name === "AbortError") {
            console.log("Fetch Aborted");
          } else {
            setError(err.message);
            setLoading(false);
          }
        });
    }, 1000);
    // Cleanup
    return () => {
      abortCont.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
