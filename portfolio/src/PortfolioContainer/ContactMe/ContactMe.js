import React, { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify"; 
import imgback from '../../assets/ContactMe/contactme_bg.png'
import ScreenHeading from '../../utilities/ScreenHeading/ScreenHeading'
import ScrollService from '../../utilities/ScrollService'
import Animations from '../../utilities/Animations'
import { TypeAnimation } from 'react-type-animation'
import './contactMe.css'

export default function ContactMe(props) {

const phoneNumber = "+18623007485";
  const [copied, setCopied] = useState(false);

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[message, setMessage] = useState("")
  const[banner, setBanner] = useState("")
  const[boolean, setBoolean] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault();
  
    // ✅ validate FIRST
    if (!name || !email || !message) {
      setBanner("Please fill all the fields");
      toast.error("Please fill all the fields");
      return;
    }
  
    try {
      setBoolean(true);
  
     const res = await axios.post(
  "https://portfolio-api-ia66.onrender.com/api/contact",
  {
    name,
    email,
    message
  }
);
  
      if (res.status === 200) {
        setBanner(res.data.msg);
        toast.success(res.data.msg);
  
        // ✅ clear form
        setName("");
        setEmail("");
        setMessage("");
      }
  
    } catch (error) {
      console.log(error);
      setBanner("Error sending message");
      toast.error("Error sending message");
    } finally {
      setBoolean(false);
    }
  };
  

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handleEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleMessage = (e) => {
    setMessage(e.target.value);
  }
  
   let fadeInScreenHandler = (screen) => {
    if (!screen || screen.fadeInScreen !== props.id) return;
  
    Animations.animations.fadeInScreen(props.id);
  };
  
    useEffect(() => {
    const fadeInSubcription =
      ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
  
    return () => fadeInSubcription.unsubscribe();
  }, []);
  
  return (
    <div className='main-container fade-in' id={props.id || ''}>
      <ScreenHeading 
      subHeading={"Lets Keep in Touch"}
      title={'Contact Me'}/>
      <div className='central-form'>
        <div className='col'>
          <h2 className='title'>
                <TypeAnimation
                  sequence={[
                    "Get In Touch ✉️",
                    2000
                  ]}
                  speed={50}
                  repeat={Infinity}
                />
              </h2>
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
        <div className="back-form">
          <div className="img-back">
              <img src={imgback} alt="image not found"/>
          </div>
          <form onSubmit={submitForm}>
            <p>{banner}</p>
            <label htmlFor="name">Name</label>
            <input type="text" onChange={handleName} value={name}/>
            
            <label htmlFor="email">Email</label>
            <input type="email" onChange={handleEmail} value={email}/>

            <label htmlFor="message">Message</label>
            <textarea type="text" onChange={handleMessage} value={message}/>

            <div className="send-btn">
            <button type="submit" disabled={boolean}>
  {boolean ? "Sending..." : "Send"}
  <i className="fa fa-paper-plane"/>
</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  )
}
