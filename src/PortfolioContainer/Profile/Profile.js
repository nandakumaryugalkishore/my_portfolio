import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import "./Profile.css"

export default function Profile() {
  const phoneNumber = "+18623007485";
  const [copied, setCopied] = useState(false);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="profile-container">
      <div className="profile-parent">
        <div className="profile-details">
          <div className="colz">
            <div className="colz-icon">
              <a
                href="https://www.linkedin.com/in/nyugalk/"
                content="LinkedIn Link"
              >
                <i
                  className="bi bi-linkedin"
                  style={{ fontSize: "20px", color: "var(--dark-orange)" }}
                ></i>
              </a>
              <a
                href="mailto:nandakumaryugalkishore@gmail.com"
                content="Email Address"
              >
                <i
                  className="bi bi-envelope-fill"
                  style={{ fontSize: "20px", color: "var(--dark-orange)" }}
                ></i>
              </a>
              <span onClick={copyPhoneNumber} style={{ cursor: "pointer" }}>
                <i
                  className="bi bi-telephone-fill"
                  style={{ fontSize: "20px", color: "var(--dark-orange)" }}
                />
              </span>

              {copied && (
                <div className="copy-message">
                  📞Phone number copied successfully
                </div>
              )}
            </div>
          </div>
          <div className="profile-details-name">
            <span className="primary-text">
              {" "}
              Hello, I'm{" "}
              <span className="highlighted-text">Yugal Kishore Nandakumar</span>
            </span>
          </div>
          <div className="profile-details-role">
            <span className="primary-text">
              {" "}
              <h1>
                <TypeAnimation
                  sequence={[
                    "Full Stack Developer 💻",
                    2000,
                    "Java Backend Engineer ☕",
                    2000,
                    "Software Engineer 🧑‍💻",
                    2000,
                    "MS Computer Science Graduate 🎓",
                    2000,
                    "Microservices Application Developer 🧩",
                    2000,
                    "AWS Cloud Application Engineer ☁️",
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </h1>
              <span className="profile-role-tagline">
                Building secure, scalable, cloud-native applications with Java,
                Microservices, and AWS.
              </span>
            </span>
          </div>
          <div className="profile-options">
            <button className="btn primary-btn">Hire Me </button>
            <a
              href="Yugal_Kishore_Nandakumar - Resume.pdf"
              download={"Yugal Kishore Nandakumar.pdf"}
              content="Resume Download"
            >
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
        </div>
      </div>
    </div>
  );
}
