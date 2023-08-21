import axios from "axios";
import { useState, useEffect } from "react";
const GetFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      let res = await axios.get(url);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };
  useEffect(() => {
    getData();
  }, [url]);


  return [data];
};

export default GetFetchData;
