import React, { useEffect } from "react";
import ScreenHeading from "../../utilities/ScreenHeading/ScreenHeading";
import ScrollService from "../../utilities/ScrollService";
import Animations from "../../utilities/Animations";
import './AboutMe.css'

export default function AboutMe(props) {
  
  let fadeInScreenHandler = (screen) => {
  if (!screen || screen.fadeInScreen !== props.id) return;

  Animations.animations.fadeInScreen(props.id);
};

  useEffect(() => {
  const fadeInSubcription =
    ScrollService.currentScreenFadeIn.subscribe(fadeInScreenHandler);

  return () => fadeInSubcription.unsubscribe();
}, []);

  const SCREEN_CONSTANTS = {
    description:
      "Software Engineer with 5+ years of professional experience designing, developing, and implementing scalable, secure, and high-performance applications in financial and enterprise environments. Strong expertise in Java, Spring Boot microservices, RESTful APIs, and Spring Security, with hands-on experience across the full Software Development Life Cycle (SDLC). Proven ability to collaborate with cross-functional teams, participate in design and code reviews, troubleshoot production issues, and deliver resilient solutions aligned with enterprise architectural standards.",
    highlights: {
      bullets: [
        "Full-stack development with Java, Spring Boot, React",
        "Scalable microservices & REST APIs",
        "AWS cloud & containerized deployments",
        "Secure applications with Spring Security",
        "CI/CD pipelines & DevOps automation",
        "Database design & performance optimization",
        "Agile/Scrum collaboration & technical mentoring"
      ],
      heading:"Highlights"
    },
  };
  const renderHighlights =()=>{
    return(
        SCREEN_CONSTANTS.highlights.bullets.map((value, i)=>(
            <div className="highlight" key={i}>
                <div className="highlight-blob"></div>
                <span>{value}</span>
            </div>
        ))
    )
  }

  return (
    <div className="about-me-container screen-container fade-in" id={props.id || ""}>
      <div className="about-me-parent">
        <ScreenHeading title={"About Me"} subHeading={"Why Choose Me?"} />
        <div className="about-me-card">
            <div className="about-me-profile"></div>
            <div className="about-me-details">
                <span className="about-me-description">{SCREEN_CONSTANTS.description}</span>
                <div className="about-me-highlights">
                    <div className="highlight-heading">
                        <span>{SCREEN_CONSTANTS.highlights.heading}</span>
                    </div>
                    {renderHighlights()}
                </div>
                <div className="about-me-options">
                    <button className="btn primary-btn" onClick={() => ScrollService.scrollHandler.scrollToHireMe()}>
                      Hire Me </button>
           <a
              href="/resume.pdf"
              download={"Yugal Kishore Nandakumar.pdf"}
              content="Resume Download"
            >
              <button className="btn highlighted-btn">Get Resume</button>
            </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
