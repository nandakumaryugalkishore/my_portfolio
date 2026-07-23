import React, { useState } from "react";
import { useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import education from "../../assets/Resume/education.svg";
import work from "../../assets/Resume/work-history.svg";
import skills from "../../assets/Resume/programming-skills.svg";
import './Resume.css'

export default function Resume(props) {
  const [selectedBulletIndex, setSelectedBulletIndex] = useState(0);
  const [carousalOffSetStyle, setCarousalOffSetStyle] = useState({});

    let fadeInScreenHandler = (screen) => {
     if (!screen || screen.fadeInScreen !== props.id) return;
   
     Animations.animations.fadeInScreen(props.id);
   };
   
     useEffect(() => {
     const fadeInSubcription =
       ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);
   
     return () => fadeInSubcription.unsubscribe();
   }, []);
   
const ResumeHeading = (props) => {
  return (
    <div className="resume-heading">
      <div className="resume-main-heading">
        {/* Orange Bullet Dot */}

        {/* Content Section */}
        <div className="heading-content">
          <div className="heading-top-row">
            <span className="heading-title">
              {props.heading ? props.heading : ""}
            </span>

            {props.fromDate && props.toDate && (
              <span className="heading-date">
                {props.fromDate} - {props.toDate}
              </span>
            )}
          </div>

          <div className="resume-sub-heading">
            <span>{props.subHeading ? props.subHeading : ""}</span>
          </div>

          {props.description && (
            <div className="resume-heading-description">
              <span>{props.description}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


  const resumeBullets = [
    { label: "Education", logoSrc: education },
    { label: "Work Experience", logoSrc: work },
    { label: "Skills", logoSrc: skills },
  ];

  const skillDetails = [
    { skill: "Java & Spring Boot Microservices", ratingPercentage: 80 },
    {
      skill: "RESTful API Design & Backend Architecture",
      ratingPercentage: 80,
    },
    { skill: "Cloud-Native Development on AWS", ratingPercentage: 70 },
    {
      skill: "Secure Application Development (Spring Security, RBAC)",
      ratingPercentage: 70,
    },
    {
      skill: "React/Angular & TypeScript Frontend Integration",
      ratingPercentage: 80,
    },
    { skill: "Docker & CI/CD Automation", ratingPercentage: 60 },
    { skill: "Relational & NoSQL Databases", ratingPercentage: 80 },
    {
      skill: "Production Debugging & Performance Optimization",
      ratingPercentage: 80,
    },
  ];

  const resumeDetails = [
    <div className="resume-screen-container" key="education">
      <ResumeHeading
        heading={"New Jersey Institute Of Technology, Newark, US"}
        subHeading={"MS in Computer Science "}
        fromDate={"Sept 2024"}
        toDate={"Dec 2025"}
      />
      <div className="experience-description">
        <span className="resume-description-text">
          <b>Coursework:</b> Data Structures and Algorithm, Data Management and System Designs, Data Analytics
with R Programming, Machine Learning, Operating Systems, Web Systems, Cryptography and Security,
Internet Higher Layer Protocols, Data Mining, Data Visualization.
        </span>
        <br/>
      </div>
      <ResumeHeading
        heading={"RMK Engineering College, Chennai, India"}
        subHeading={"B.Tech Information Technology"}
        fromDate={"Aug 2018"}
        toDate={"May 2022"}
      />
      <div className="experience-description">
        <span className="resume-description-text">
          <b>Coursework:</b> Data Structures and Algorithm, Programming in C, Problem Solving and Python
Programming, Object Oriented Programming, Database Management Systems, Design and Analysis of
Algorithms, Operating Systems, Web Technology, Software Engineering, Software Testing, Cryptography
and Network Security, Cloud Computing.

        </span>
        <br/>
      </div>
    </div>,
    <div className="resume-screen-container" key="work-experience">
      <ResumeHeading
        heading={"EvegTech Inc, California, US"}
        subHeading={"Software Engineer - Application Development"}
        fromDate={"Jun 2025"}
        toDate={"Present"}
      />
      <div className="experience-description">
        <span className="resume-description-text">
          Built a full-stack, enterprise-grade logistics and inventory
          management system using Spring Boot microservices and React, focusing
          on scalability, real-time data processing, and cloud-ready deployment
          practices.
        </span>
        <br/>
      </div>
      <ResumeHeading
        heading={"Virtusa Pvt Ltd,Chennai,India "}
        subHeading={"Associate Engineer"}
        fromDate={"Dec 2021"}
        toDate={"Aug 2024"}
      />
      <div className="experience-description">
        <span className="resume-description-text">
          Contributed to the development and modernization of Citibank’s OneCMS platform, a mission-critical enterprise
          content management system supporting high-volume FX trading and confirmation workflows. Played a key role in
          enhancing system scalability, security, and performance within a distributed microservices architecture serving global
          financial operations.
        </span>
        <br/>
      </div>
      
    </div>,
    <div className="resume-screen-container skills-container" key="skills">
  {skillDetails.map((skill, index) => (
    <div className="skill-parent" key={index}>
      
      <div className="skill-info">
        <span className="skill-name">{skill.skill}</span>
        <span className="skill-percent">{skill.ratingPercentage}%</span>
      </div>

      <div className="skill-bar">
        <div
  className="skill-bar-fill"
  style={{
    width: selectedBulletIndex === 2 ? skill.ratingPercentage + "%" : "0%"
  }}
></div>
      </div>

    </div>
  ))}
</div>

  ];

  const handleCarousal = (index)=>{
    let offsetHeight = 360;
    let newCarousalOffset = {
        style: {transform:"translateY("+ index * offsetHeight * -1 +"px)"}
    };
    setCarousalOffSetStyle(newCarousalOffset)
    setSelectedBulletIndex(index)
  };

  const getBullets = ()=>{
    
    return resumeBullets.map((bullet, index)=>(
        <div onClick={()=>handleCarousal(index)} className={index === selectedBulletIndex ? "bullet selected-bullet" : "bullet"} key={index}>
            <img
  className="bullet-logo"
  src={bullet.logoSrc}
  alt={bullet.label}
/>

            <span className="bullet-label">{bullet.label}</span>
        </div>
        
    )
  )
  }
  const getResumeScreen =()=>{
    return(
        <div
        style = {carousalOffSetStyle.style}
        className="resume-details-carousal">
            {resumeDetails.map((ResumeDetail) => ResumeDetail)}
        </div>
    )
  }

  return (
    <div className="resume-container screen-container fade-in" id={props.id || " "}>
      <div className="resume-content">
        <ScreenHeading
          title={"Resume"}
          subHeading={"What I Bring to the Table"}
        ></ScreenHeading>
        <div className="resume-card">
            <div className="resume-bullets">
                <div className="bullet-container">
                    <div className="bullet-icons"></div>
                    <div className="bullets">{getBullets()}</div>
                </div>
            </div>
            <div className="resume-bullet-details">{getResumeScreen()}</div>
        </div>
      </div>
    </div>
  );
}
