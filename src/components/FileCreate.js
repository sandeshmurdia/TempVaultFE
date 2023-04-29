import React, { useState } from "react";
import CryptoJS from "crypto-js";
import axios from "axios";
import "./FileCreate.css";
import { Link } from "react-router-dom";
function FileCreate() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const [text, setText] = useState("");
  const [expirationDate, setExpirationDate] = useState(5); // 5 mins
  const [sharedLink, setSharedLink] = useState(null);
  const [viewOnce, setViewOnce] = useState(false);
  const url = "/apiservices/insert";

  const handleSubmit = async (event) => {
    event.preventDefault();

    const encryptionKey = "sandesh";
    const ciphertext = CryptoJS.AES.encrypt(text, encryptionKey);
    const uuid = Math.random().toString(36).substring(2, 32);
    const expirationTime = new Date().getTime() + expirationDate * 60 * 1000;

    const data = {
      cipherText: ciphertext.toString(),
      uuid: uuid,
      expirationTime: expirationTime,
      viewOnce: viewOnce,
    };
    console.log(data);

    const response = await axios
      .post(url, data)
      .then(() => {
        console.log("Success");
        setSharedLink(`http://localhost:3000/download/text/${uuid}`);
        setText("");
      })
      .catch((err) => {
        console.log("Failed ", err);
      });

    console.log(response);
  };

  const handleExpirationTimeChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(sharedLink);
    alert(`Link copied to clipboard: ${sharedLink}`);
  };

  // return (
  //     <div style={{ textAlign: 'center' }} id="main-block">
  //         <h1>Temp Files</h1>
  //         <form >
  //             <label htmlFor="text">Text:</label>
  //             <input
  //                 type="text"
  //                 id="text"
  //                 value={text}
  //                 onChange={(event) => setText(event.target.value)}
  //                 required
  //             />
  //             <br></br>
  //             <label htmlFor="expiration-time">Expiration Time:</label>
  //             <select
  //                 id="expiration-time"
  //                 value={expirationDate}
  //                 onChange={handleExpirationTimeChange}
  //             >
  //                 <option value={1}>1 min</option>
  //                 <option value={5}>5 min</option>
  //                 <option value={10}>10 min</option>
  //                 <option value={15}>15 min</option>
  //                 <option value={30}>30 min</option>
  //                 <option value={60}>1 hours</option>
  //                 <option value={120}>2 hours</option>
  //                 <option value={240}>4 hours</option>
  //                 <option value={480}>8 hours</option>
  //                 <option value={720}>12 hours</option>
  //                 <option value={1440}>24 hours</option>
  //                 <option value={2880}>48 hours</option>

  //             </select>
  //             <br></br>
  //             <input
  //                 type="checkbox"
  //                 id="view-once"
  //                 name="view"
  //                 value="view-once"
  //                 onChange={(e) => (setViewOnce(e.target.checked))}
  //             ></input>
  //             <label>
  //                 View Once
  //             </label>
  //             <br></br>
  //             <button onClick={handleSubmit} type="submit">Generate Link</button>
  //         </form>

  //         {sharedLink && (
  //             <div>
  //                 <p>
  //                     Link: <a href={sharedLink}>{sharedLink}</a>
  //                 </p>
  //                 <p>Expires in {expirationDate}</p>
  //                 <button onClick={handleShareLink}>Share Link</button>
  //             </div>
  //         )}
  //     </div>
  // );

  return (
    <>
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
          <h1>How it works:</h1>
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
        <div className="column2">Column 2</div>
        <div className="column3">
          <div className="numberoflinksmain">
            <span className="numberoflinks">403</span>  links generated and
            counting.
          </div>
        </div>
      </div>
    </>
  );
}

export default FileCreate;
