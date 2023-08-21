import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mailAction } from "../../Store/MailSlice";
const MailBox = () => {
  const toEMail = useRef();
  const areaRef = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector((store) => {
    return store.auth.email;
  });
  const handleSend = async () => {
    const to = toEMail.current.value;
    const body = areaRef.current.value;
    const fromMail = email.replace("@", "").replace(".", "");
    console.log("fromMail:", fromMail);
    const toMail = to.replace("@", "").replace(".", "");
    console.log("toMail:", toMail);
    const obj = {
      to: to,
      body: body,
    };
    try {
      setLoading(true);
      let res = await axios.post(
        `https://mailbx-746fe-default-rtdb.firebaseio.com/${fromMail}/sent.json`,
        obj
      );
      dispatch(
        mailAction.mailSent({
          id: res.data.name,
          mail: { to: to, body: body },
        })
      );
      alert('Mail sent successfully')
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }

    const obj2 = {
      from: email,
      body: body,
      read: false,
    };

    try {
      setLoading(true);
      let res = await axios.post(
        `https://mailbx-746fe-default-rtdb.firebaseio.com/${toMail}/inbox.json`,
        obj2
      );
      dispatch(mailAction.sent({}));
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log("error:", error);
    }
  };

  const handleCOmpose = () => {
    setShow(!show);
  };

 
  return (
    <>
      <div style={{ padding: "40px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={handleCOmpose}
            className="btn"
            style={{ float: "left", width: "10%" }}
          >
            Send Mail
          </button>
          <Link to={"/inbox"}>
            <button className="btn" style={{ float: "left", width: "10%" }}>
               Inbox
            </button>
          </Link>
          <Link to={"/sent"}>
            <button className="btn" style={{ float: "left", width: "10%" }}>
              Sent 
            </button>
          </Link>
        </div>
        {!show && <h1>Click on Send to send mail</h1>}
        {show && (
          <div>
            <h1 style={{ color: "grey" }}>
              Componse mail here : 
            </h1>
            <div className="mail">
              <div>
                <input type="text" placeholder="To" ref={toEMail} />
              </div>
              <JoditEditor ref={areaRef} />
            </div>
            <button className="btn" onClick={handleSend}>
              Send
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MailBox;
