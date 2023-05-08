import React, { useState } from "react";
import "./Mainpage.css";
import "./website.js";
import linkedin from "./svg/linkedin.svg";
import gmail from "./svg/gmail.svg";
import instagram from "./svg/instagram.svg";
import github from "./svg/github.svg";
import chetan from "./svg/chetan.jpeg";
import sandesh from "./svg/sandesh.jpeg";
import { Link } from 'react-router-dom';


function Mainpage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  function handleLinkClick(event) {
    event.preventDefault();
    setIsNavOpen(false);
    event.target.classList.add("active");
    const sectionId = event.target.getAttribute("href");
    const sectionElement = document.querySelector(sectionId);
    const scrollMargin = window.innerHeight * 0.2; // 20% of the viewport height
    sectionElement.style.scrollMarginTop = scrollMargin + "px";
    document.querySelector(sectionId).scrollIntoView({
      behavior: "smooth",
    });
  }

  return (
    <>
      {/* Navbar */}
      <header className="header">
        <div className="header_content">
          <a href="#home" className="logo" onClick={handleLinkClick}>
            TempVault <span> <div className="betabox"><p className="beta">BETA</p></div></span>
          </a>
          <nav className={isNavOpen ? "nav nav--open" : "nav"}>
            <ul className="nav_list">
              <li className="nav_item">
                <a href="#home" className="nav_link" onClick={handleLinkClick}>
                  Home
                </a>
              </li>
              <li className="nav_item">
                <a href="#about" className="nav_link" onClick={handleLinkClick}>
                  About
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="#features"
                  className="nav_link"
                  onClick={handleLinkClick}
                >
                  Features
                </a>
              </li>
              <li className="nav_item">
                <a
                  href="#contact"
                  className="nav_link"
                  onClick={handleLinkClick}
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div
            className={isNavOpen ? "hamburger hamburger--open" : "hamburger"}
            onClick={toggleNav}
          >
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </header>
      {/* landing page */}
      <section id="home"></section>
      <div className="getstarted-block">
        <h1 className="main-tempvault">TempVault</h1>
        <p className="sub-tempvault">Data sharing without leaving a trace.</p>
        <Link to="/app">
        <div className="getstarted-button">
          <p className="getstarted-text">Get Started</p>
        </div>
        </Link>
      </div>
      {/* about features and contact */}
      <div className="containerrest">
        {/* about */}
        <section id="about"></section>
        <div className="about-div about">
          <h2 className="about-heading">
            Securely store and share your temporary files with
            <span className="about-tempvault"> TempVault.</span>
          </h2>
          <p className="about-sub">
            TempVault is a secure and simple way to share text data with others.
            With TempVault, you can generate a temporary link that allows others
            to view your data for a limited time period. After the expiration
            time, the link will be invalid and the data will no longer be
            accessible.
          </p>
        </div>
        {/* feature */}
        <section id="features"></section>
        <div className="feature">
          <h2 className="feature-heading">How people use it</h2>
          <div className="card-container">
            <div className="card">
              <h3 className="usecase-1">Collaboration</h3>
              <p className="point">
                Share temporary notes, code snippets, or text data for remote
                team collaboration.
              </p>
            </div>

            <div className="card">
              <h3 className="usecase-2">Privacy</h3>
              <p className="point">
                Encrypted data and temporary links ensure secure sharing of
                sensitive information.
              </p>
            </div>

            <div className="card">
              <h3 className="usecase-4">Confidentiality</h3>
              <p className="point">
                Share confidential information with limited access for a
                restricted duration.
              </p>
            </div>

            <div className="card">
              <h3 className="usecase-5">Convenience</h3>
              <p className="point">
                Generate a shareable link instantly without the need for user
                accounts or file size limitations.
              </p>
            </div>
          </div>

          <div></div>
        </div>
        {/*team */}
        <section id="contact"></section>
        <div className="contact">
          <h2 className="feature-heading">Developed By</h2>
          <div className="responsive-container-block container">
            <div className="responsive-container-block">
              <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container-about">
                <div className="card-about">
                  <div className="team-image-wrapper">
                    <img className="team-member-image" src={sandesh} />
                  </div>
                  <p className="about-name">Sandesh Murdia</p>
                  <p className="text-blk position-about">Developer</p>
                  {/* <p className="text-blk feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p> */}
                  <br></br>
                  <div className="social-icons">
                    <a href="https://www.linkedin.com/in/sandeshmurdia/" target="_blank">
                      <img height={22} width={22} src={linkedin} />
                    </a>
                    <a href="https://github.com/sandeshmurdia" target="_blank">
                      <img
                        height={23}
                        width={23}
                        style={{ marginTop: 1 }}
                        src={github}
                      />
                    </a>
                    <a href="https://www.instagram.com/sandeshmurdia" target="_blank">
                      <img
                        height={23}
                        width={23}
                        style={{ marginTop: 2 }}
                        src={instagram}
                      />
                    </a>
                    <a href="mailto:sandeshmurdia123@gmail.com">
                      <img
                        height={24}
                        width={24}
                        style={{ marginTop: 1 }}
                        src={gmail}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="responsive-cell-block wk-desk-3 wk-ipadp-3 wk-tab-6 wk-mobile-12 card-container-about second-card">
                <div className="card-about">
                  <div className="team-image-wrapper">
                    <img className="team-member-image" src={chetan} />
                  </div>
                  <p className="about-name">Chetan Lohkare </p>
                  <p className="text-blk position-about">Developer</p>
                  {/* <p className="text-blk feature-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p> */}
                  <br></br>
                  <div className="social-icons">
                    <a href="https://www.linkedin.com/in/chetan-lohkare-4b3007195" target="_blank">
                      <img height={22} width={22} src={linkedin} />
                    </a>
                    <a href="https://github.com/chetan-187" target="_blank">
                      <img
                        height={23}
                        width={23}
                        style={{ marginTop: 1 }}
                        src={github}
                      />
                    </a>
                    <a href="https://www.instagram.com/_chetan_187/" target="_blank">
                      <img
                        height={23}
                        width={23}
                        style={{ marginTop: 2 }}
                        src={instagram}
                      />
                    </a>
                    <a href="https://www.twitter.com" target="_blank">
                      <img
                        height={24}
                        width={24}
                        style={{ marginTop: 1 }}
                        src={gmail}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Mainpage;
