import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./FileCreate.css";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function FileCreate() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const [expirationDate, setExpirationDate] = useState(5); // 5 mins
  const [sharedLink, setSharedLink] = useState(null);
  const [viewOnce, setViewOnce] = useState(false);
  const [content, setContent] = useState("");
  const [count, setCount] = useState();
  const url = "https://tempvault-services.vercel.app/apiservices/insert";
  const counturl =
    "https://tempvault-services.vercel.app/apiservices/get-count";

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    await axios
      .get(counturl)
      .then((res) => {
        console.log(res);
        setCount(res.data.count);
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async (event) => {
    if (content === "") {
      alert("nothing");
      return;
    }
    event.preventDefault();
    const uuid =
      Math.random().toString(36).substring(2, 32) +
      Math.random().toString(36).substring(2, 32) +
      Math.random().toString(36).substring(2, 32);
    const expirationTime = new Date().getTime() + expirationDate * 60 * 1000;

    const data = {
      cipherText: content.toString(),
      uuid: uuid,
      expirationTime: expirationTime,
      viewOnce: viewOnce,
    };
    await axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        console.log("Success");
        toast.success("Link Generated successfully.", {
          position: "top-right",
          autoClose: 100000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // setSharedLink(`http://localhost:3000/download/text/${uuid}`);
        setSharedLink(`http://tempvault.netlify.app/download/text/${uuid}`);
        navigator.clipboard.writeText(sharedLink);
        setContent("");
      })
      .catch((err) => {
        toast.error('Failed try again!', {
          position: "top-right",
          autoClose: 50000000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.log("Failed ", err);
      });
  };

  const handleExpirationTimeChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        className='toast'
        autoClose={3000}
        limit={1}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <header className="header">
        <div className="header_content">
          <Link to="/">
            <a className="logo" id="logo">
              TempVault
            </a>
          </Link>
        </div>
      </header>
      <div className="container-list">
        <div className="column1">
          <h1 className="how-it">How it works:</h1>
          <ol className="list-work">
            <li>Enter your text data into the input field.</li>
            <li>Set the expiration time for the link.</li>
            <li>Click the "Generate Link" button.</li>
            <li>
              View Once check limits the link to be opened only one time by the
              receiver.
            </li>
            <li>Share the link with others.</li>
            <li>
              When the link expires, the data will no longer be accessible.
            </li>
          </ol>
        </div>
        <div className="column2">
          <div>
            <ReactQuill value={content} onChange={handleContentChange} />
            <div className="functioning">
              <div className="funct">
                <div className="funct-1">
                  <label htmlFor="expiration-time " className="expiration">
                    Expiration Time:
                  </label>
                  <select
                    id="expiration-time"
                    value={expirationDate}
                    onChange={handleExpirationTimeChange}
                  >
                    <option className="time-total" value={1}>
                      1 min
                    </option>
                    <option className="time-total" value={5}>
                      5 min
                    </option>
                    <option className="time-total" value={10}>
                      10 min
                    </option>
                    <option className="time-total" value={15}>
                      15 min
                    </option>
                    <option className="time-total" value={30}>
                      30 min
                    </option>
                    <option className="time-total" value={60}>
                      1 hours
                    </option>
                    <option className="time-total" value={120}>
                      2 hours
                    </option>
                    <option className="time-total" value={240}>
                      4 hours
                    </option>
                    <option className="time-total" value={480}>
                      8 hours
                    </option>
                    <option className="time-total" value={720}>
                      12 hours
                    </option>
                    <option className="time-total" value={1440}>
                      24 hours
                    </option>
                    <option className="time-total" value={2880}>
                      48 hours
                    </option>
                  </select>
                </div>
                <div className="funct-2">
                  <label className="expiration">View Once:</label>
                  <input
                    type="checkbox"
                    id="view-once"
                    name="view"
                    value="view-once"
                    onChange={(e) => setViewOnce(e.target.checked)}
                  ></input>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="generate-button"
              >
                Generate Link
              </button>
              {sharedLink && (
                <div>
                  <p className="link">
                    <a href={sharedLink} className="expiration share-link">
                      Your Link:
                      <span
                        style={{
                          fontWeight: 300,
                          color: "#3366CC",
                          marginLeft: "10px",
                        }}
                      >
                        tempvault.netlify.app/download/text/...
                      </span>
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileCreate;
