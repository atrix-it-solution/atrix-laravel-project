import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
const icons1 = "../assets/SolutionImage/icon1.svg";
const icons2 = "../assets/SolutionImage/icon2.svg";
const icons3 = "../assets/SolutionImage/icon3.svg";
const icons4 = "../assets/SolutionImage/icon4.svg";
 
const blurbContent = [
  {
    id: 1,
    image: icons1,
    title: "Discovery and Consultation",
    description:
      "We start by listening to your goals and challenges to create a plan that fits your business.",
    additionalText: [
      "Client Meeting",
      "Identifying Requirements",
      "Strategic Planning",
    ],
  },
  {
    id: 2,
    image: icons2,
    title: "Design and Architecture",
    description:
      "Our team creates user-friendly, scalable solutions that match your business requirements while delivering visually appealing results. We establish a solid base for every product at its beginning.",
    additionalText: ["Understanding your goals and expectations", "Gathering ideas and inspiration", "Planning the overall direction and approach","Setting the creative and visual tone for the project" ],
  },
  {
    id: 3,
    image: icons3,
    title: "Development",
    description:
      "Our team develops digital solutions that combine speed with security and scalability for web applications.",
    additionalText: [
      "Bringing the concept to life",
      "Fine-tuning details along the way",
      "Maintaining open collaboration throughout",
      "Preparing the project for completion"
    ],
  },
  {
    id: 4,
    image: icons4,
    title: "Deployment & Delivery",
    description:
      "Our team provides complete launch readiness through detailed documentation, smooth deployment, and post-launch maintenance for ongoing success.",
    additionalText: ["Conducting a final review", "Delivering the finished project", "Providing any necessary guidance and support","Staying connected for future needs"],
  },
];
 
const OurSolution = () => {
  const [activeStep, setActiveStep] = useState(0);
 
  useEffect(() => {
    const handleScroll = () => {
      const children = document.querySelectorAll(".blurb-item");
      let activeSteps = 0;
 
      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        if (rect.top <= 100) {
          activeSteps = index + 1;
        }
      });
 
      setActiveStep(activeSteps);
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
 
  useEffect(() => {
    const circleAnimation = () => {
      let circleWrapper = document.getElementById("circle-wrapper");
      let cardWrapper = document.getElementById("process-cards");
      if (!circleWrapper || !cardWrapper) return;
 
      let rect = cardWrapper.getBoundingClientRect();
      let cardHeight = rect.height;
      let top = rect.top;
      const percentage = -Math.floor((top / cardHeight) * 100);
      circleWrapper.style.background = `conic-gradient(var(--blue) ${percentage + 15}%, #1A1A1A 0%)`;
    };
 
    window.addEventListener("scroll", circleAnimation);
    window.addEventListener("load", circleAnimation);
 
    return () => {
      window.removeEventListener("scroll", circleAnimation);
      window.removeEventListener("load", circleAnimation);
    };
  }, []);
 
  useEffect(() => {
    const updateProgressLine = () => {
      const line = document.getElementById("line-progress");
      const cards = document.getElementById("process-cards");
      if (!line || !cards) return;
 
      const rect = cards.getBoundingClientRect();
      const height = rect.height;
      const top = rect.top;
 
      let progress = Math.min(Math.max(-top / height, 0), 1);
      progress = Math.min(progress * 1.8, 1);
 
      const minHeight = 5;
      const dynamicHeight = minHeight + progress * (100 - minHeight);
      line.style.height = `${dynamicHeight}%`;
    };
 
    window.addEventListener("scroll", updateProgressLine);
    window.addEventListener("load", updateProgressLine);
 
    return () => {
      window.removeEventListener("scroll", updateProgressLine);
      window.removeEventListener("load", updateProgressLine);
    };
  }, []);
 
  return (
    <div className="Our-Solution-Process-section bg-[var(--darkblack)] text-[var(--whitelight)] relative mb-0">
      <div className="container mx-auto">
        <div className="row py-14 lg:py-28">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
            <h2 className="sec-heading tracking-wider">
              Our Step by Step Process
            </h2>
 
            <div className="w-full flex items-end">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                <path
                  fill="#2f2f2f"
                  d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"
                ></path>
              </svg>
            </div>
 
            <p className="lg:px-2 px-1 text-[var(--gray)] font-bold">
              Success doesn’t happen by chance—it follows a well-planned process!
              At Atrix IT Solutions, we take a strategic approach to drive your business forward.
            </p>
          </div>
 
          <div className="grid lg:grid-cols-2 grid-cols-1 items-start relative mt-32">
            <div id="circle-sec" className="lg:flex justify-center sticky lg:top-28 hidden">
              <div
                id="circle-wrapper"
                className="h-[340px] w-[340px] rounded-full border-[4px] border-[#2F2F2F] flex justify-center items-center"
              >
                <div className="h-[320px] w-[320px] bg-[#1A1A1A] rounded-full flex flex-col justify-center items-center">
                  <p className="text-xl font-bold text-[var(--gray)]">Step</p>
                  <p className="text-5xl font-bold">{activeStep}/4</p>
                </div>
              </div>
            </div>
 
            <div id="process-cards" className="lg:border-l border-[var(--black)] relative">
              <div
                id="line-progress"
                className="absolute left-0 top-0 w-[2px] rounded-full"
                style={
                  window.innerWidth >= 1024
                    ? {
                        background: "linear-gradient(to bottom, #00a2dc)",
                        height: "5%",
                        transition: "height 0.3s ease-out",
                        boxShadow: "0 0 10px 3px rgba(0, 166, 87, 0.4)",
                      }
                    : {

                        // height: "0",
                        // transition: "none",
                        // boxShadow: "none",
                      }
                }
              />
 
              <div className="w-full lg:pl-26 z-50">
                {blurbContent.map((item, index) => (
                  <div
                    key={index}
                    className="blurb-item pb-20 bg-[var(--darkblack)] pl-1 pt-1 sticky top-20"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="filter invert brightness-0 contrast-100 mb-5"
                    />
                    <p className="lg:hidden inline-block mb-5 bg-[var(--black)] px-5 py-2 rounded-lg font-bold text-sm">
                      STEP {item.id}
                    </p>
                    <h3 className="heading mb-8">{item.title}</h3>
                    <p className="mb-5 text-[var(--gray)]">{item.description}</p>
                    <ul>
                      {item.additionalText.map((text, idx) => (
                        <li
                          className="flex gap-2 items-center text-[var(--gray)] pt-2"
                          key={idx}
                        >
                          <FiPlus /> {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default OurSolution;