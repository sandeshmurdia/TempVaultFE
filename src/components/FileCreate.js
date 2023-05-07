import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./FileCreate.css";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Snackbar, { snackbarColor } from "./Snackbar/Snackbar.js";
import copyIcon from "./svg/copy3.png";
import shareIcon from "./svg/share.svg";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import CircularLoader from "./loader/CircularLoader";

function FileCreate() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const [expirationDate, setExpirationDate] = useState(5); // 5 mins
  const [sharedLink, setSharedLink] = useState(null);
  const [viewOnce, setViewOnce] = useState(false);
  const [content, setContent] = useState("");
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState();
  const [showToolTip, setShowToolTip] = React.useState(false);

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

  const handleSubmit = (event) => {
    if (content === "") {
      DisplaySnackBar(2, "Please enter something to generate a link");
      return;
    }
    setLoading(true);
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

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        setSharedLink(`http://localhost:3000/${uuid}`);
        // setSharedLink(`https://tempvault.netlify.app/${uuid}`);
        DisplaySnackBar(1, 'Link Generated Successfully');
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        DisplaySnackBar(0, 'Oops, something went wrong. Please try again later');
      });
    setContent("");
  };


  const DisplaySnackBar = (saverity, message) => {
    setSnackbar({ saverity, message, date: Date.now() });
  };

  const handleExpirationTimeChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };


  const handleTooltipClose = () => {
    setShowToolTip(false);
  };

  const handleCopy = () => {
    setShowToolTip(true);
    setTimeout(() => {
      setShowToolTip(false);
    }, 2000);
    navigator.clipboard.writeText(sharedLink);
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'TempVault',
        url: sharedLink
      })
    }
  };

  return (
    <>
      {snackbar && (
        <Snackbar
          key={snackbar.date}
          message={snackbar.message}
          snackColor={snackbar.saverity}
        />
      )}
      <header className="header">
        <div className="header_content">
          <Link to="/">
            <a className="logo" id="logo">
              TempVault <span> <div className="betabox"><p className="beta">BETA</p></div></span>
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
              <span className="viewonceinfo">
                {" "}
                View Once check limits the link to be opened only one time by
                the receiver or sender.
              </span>
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
              <div className="generate-button-container">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="generate-button"
                >
                  Generate Link
                </button>
                {console.log(loading)}
                {loading && <CircularLoader />}
              </div>
              {sharedLink && (
                <div className="link-container">
                  <div className="link-child">
                    <p className="link">
                      <a href={sharedLink} className="expiration share-link">
                        <span
                          style={{
                            fontWeight: 300,
                            marginLeft: "10px",
                          }}
                        >
                          tempvault.netlify.app/
                        </span>
                      </a>
                    </p>
                    <div className="util-button-container">
                      <div className="copy-button-div" onClick={handleShare}>
                        <img className="share-icon" src={shareIcon} />
                      </div>
                      <ClickAwayListener onClickAway={handleTooltipClose}>
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={handleTooltipClose}
                          open={showToolTip}
                          disableFocusListener
                          disableHoverListener
                          disableTouchListener
                          title="Copied!"
                          placement="right-start"
                        >
                          <div className="copy-button-div" onClick={handleCopy}>
                            <img className="copy-icon" src={copyIcon} />
                          </div>
                        </Tooltip>
                      </ClickAwayListener>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="column3">
          <div className="numberoflinksmain">
            {count && <span className="numberoflinks">{count}</span>} links
            generated and counting.
          </div>
        </div>
      </div>
    </>
  );
}

export default FileCreate;
