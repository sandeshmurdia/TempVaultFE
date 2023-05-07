/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Retrieve.css";
import { ReverseTimer } from "./Reversetimer";
import ViewOnceHeader from './ViewOnce/viewOnceHeader';
const Retrieve = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const url = `https://tempvault-services.vercel.app/apiservices/get/${id}`;
  const [expired, setExpired] = useState(false);
  const [loading, setLoading] = useState(true);
  const [remainingtime, setRemainingtime] = useState();
  const [viewOnce, setViewOnce] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data.expired)
        setRemainingtime(res.data.expirationTime)
        setViewOnce(res.data.viewOnce);
        res.data.expired ? setExpired(true) : setExpired(false)
        setData(res.data.data);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };


  return (
    <>
      <header className="header">
        <div className="header_content">
          <Link to="/" className="logo" id="logo">
            TempVault
          </Link>
          {remainingtime && (
            <div className="timeleft">
              Time Left <ReverseTimer milliseconds={remainingtime - Date.now()} />
            </div>
          )}
        </div>
      </header>
      <div className="container-ret">
        <div className="col1">
          {loading ? (
            <div>{loading && <span>Loading...</span>}</div>
          ) : (
            <>
              {viewOnce && <ViewOnceHeader />}
              <div className="text-view">

                {expired ? (
                  <p className="linkexp expiredlink">Link is expired!</p>
                ) : (
                  <p className="linkexp"><div className="dataprint" dangerouslySetInnerHTML={{ __html: data }} /></p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="col2">
          Start sharing your data securely and efficiently with TempVault.
          <Link to="/app">
            <span className="try-it"> Try it now!</span>
          </Link>
          <br></br><br></br>
          <p className="yourdata">Your data is encrypted using advanced encryption standards and stored
            securely on our server. We take your privacy and security seriously
            and ensure that your data is protected at all times. </p>
        </div>
      </div>
    </>
  );
};

export default Retrieve;
