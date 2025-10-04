import React, { useEffect, useState } from "react";

export default function DataFetcher({ url, children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data.slice(0, 5)));
  }, [url]);

  return children(data);
}