/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Retrieve.css";
const Retrieve = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const url = `http://localhost:5000/apiservices/get/${id}`;
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
        if (res.data.expirationTime < Date.now()) {
          setExpired(true);
        } else if (!res.data.expirationTime && res.data.dataViewed === true) {
          console.log("Viewed Once, can't view again");
          setExpired(true);
        } else setExpired(false);

        setData(res.data);
      })
      .catch((error) => console.log(error));
    setLoading(false);
  };

  const display = () => {
    if (loading) return <div>{loading && <span>Loading...</span>}</div>;
    else {
      return (
        <div>
          {expired && data ? <p>Link is expired!</p> : <p>{data.cipherText}</p>}
        </div>
      );
    }
  };

  return (
    // <div>

    //     <div>
    //         {display()}
    //     </div>
    // </div>
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
      <div class="container-ret">
        <div class="col1">Column 1</div>
        <div class="col2">
          Your data is encrypted using advanced encryption standards and stored
          securely on our server. We take your privacy and security seriously
          and ensure that your data is protected at all times.
        </div>
        <div class="col3">
          Start sharing your data securely and efficiently with Temp Files.
          <Link to="/senddata"> <span className="try-it"> Try it now!</span></Link>
        </div>
      </div>
    </>
  );
};

export default Retrieve;
