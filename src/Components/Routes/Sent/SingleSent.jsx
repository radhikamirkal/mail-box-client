import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleSent = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const email = useSelector((store) => {
    return store.auth.email;
  });
  const [data, setData] = useState({ to: ".", body: "." });
  const newEmail = email.replace("@", "").replace(".", "");

  const getSentSingleData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://mailbx-746fe-default-rtdb.firebaseio.com/${newEmail}/sent/${id}.json`
      );
      console.log(res);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getSentSingleData();
  }, []);


  return (
    <div className="inbox-items">
      <p>To : {data.to}</p>
      <div style={{ display: "flex", gap: "10px" }}>
        <p>Message : </p>
        <p dangerouslySetInnerHTML={{ __html: data.body }}></p>
      </div>
    </div>
  );
};

export default SingleSent;
