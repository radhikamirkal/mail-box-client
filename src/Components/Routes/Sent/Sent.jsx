import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const email = useSelector((store) => {
    return store.auth.email;
  });
  const newEmail = email.replace("@", "").replace(".", "");
  console.log("newEmail:", newEmail);

  const getSentData = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `https://mailbx-746fe-default-rtdb.firebaseio.com/${newEmail}/sent.json`
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
    getSentData();
  }, []);



  const handleDelete = async (id) => {
    try {
      setLoading(true);
      let res = await axios.delete(
        `https://mailbx-746fe-default-rtdb.firebaseio.com/${newEmail}/sent/${id}.json`
      );
      console.log(res);
      alert('Mail deleted successfully')
      getSentData();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  let items = [];
  for (let key in data) {
    items.push({ id: key, ...data[key] });
  }

  return (
    <div>
      {items.map((sentMails) => {
        return (
          <div key={sentMails.id} className="inbox-items">
            <AiFillDelete
              color="red"
              className="delete"
              onClick={() => handleDelete(sentMails.id)}
            />
            <p>To : {sentMails.to}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <p>Message : </p>
              <p dangerouslySetInnerHTML={{ __html: sentMails.body }}></p>
            </div>
            <Link className="read" to={`/sent/${sentMails.id}`}>
              Read
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sent;
