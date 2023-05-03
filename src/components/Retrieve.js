/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Retrieve.css";
const Retrieve = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [expirytime, setExpirytime] = useState();
  const url = `https://tempvault-services.vercel.app/apiservices/get/${id}`;
  const [expired, setExpired] = useState();
  // const [viewed, setViewed] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);


  const getData = async () => {
    setLoading(true);
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        if (res.data.expirationTime < Date.now()) {
          setExpired(true);
        } else if (!res.data.expirationTime && res.data.dataViewed === true) {
          console.log("Viewed Once, can't view again");
          setExpired(true);
        } else setExpired(false);

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
          <div className="timeleft">Time Left 10:04:59</div>
        </div>
      </header>
      <div className="container-ret">
        <div className="col1">
          {loading ? (
            <div>{loading && <span>Loading...</span>}</div>
          ) : (
            <div className="text-view">
              {expired  ? (
                <p className="linkexp">Link is expired!</p>
              ) : (
                <p className="linkexp"><pre>{data}</pre></p>
              )}
            </div>
          )}
        </div>
        <div className="col2">
        Start sharing your data securely and efficiently with Temp Files.
          <Link to="/senddata">
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
