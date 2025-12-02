import React from "react";
import { useState } from "react";

import Marquee from "react-fast-marquee";

import OurSolution from "../../components/frontendComponents/OurSolution";
import OurPortfolio from "../../components/frontendComponents/OurPortfolio";
import About_sec_scroll from "../../components/frontendComponents/About_sec_scroll";
import ValueCards from "../../components/frontendComponents/career/ValueCards";
import TestimonialsCards from "../../components/frontendComponents/TestimonialsCards";
import Behance from "../../components/frontendComponents/Behanceshowpost/Behance";
import CTASection from "../../components/frontendComponents/CTASection";
import SeoTags from "../../components/frontendComponents/seoTags/SeoTags";

import MasterLayout from "@/layouts/frontendLayouts/MasterLayouts";

const About_video = "/assets/AtrixHomevideo.mp4";

const icon1 = "/assets/AboutUs/Transparency.svg";
const icon2 = "/assets/AboutUs/growth-support.svg";
const icon3 = "/assets/AboutUs/Good-Culture.svg";
const icon4 = "/assets/AboutUs/5day-working.svg";
const icon5  = "/assets/AboutUs/keys-sec/Culture.svg";
const icon6  = "/assets/AboutUs/keys-sec/Innovation.svg";
const icon7  = "/assets/AboutUs/keys-sec/Integrity.svg";
const icon8  = "/assets/AboutUs/keys-sec/Kindness.svg";
const icon9  = "/assets/AboutUs/keys-sec/value.svg";
const icon10 = "/assets/AboutUs/keys-sec/Agile-Solutions.svg";
const thumbnail = "/assets/thumbnail/t.png";
import { Head } from "@inertiajs/react";

const cards = [
  { id: 1, title: "Card 1", color: "bg-red-500" },
  { id: 2, title: "Card 2", color: "bg-blue-500" },
  { id: 3, title: "Card 3", color: "bg-green-500" },
  { id: 4, title: "Card 4", color: "bg-yellow-500" },
  { id: 5, title: "Card 5", color: "bg-purple-500" },
  { id: 6, title: "Card 6", color: "bg-pink-500" },
];
interface AboutProps {
    title: string;
    description: string;
}
const About : React.FC<AboutProps> = ({ title, description })=> {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    if (index < cards.length - 3) {
      setIndex(index + 1);
    }
  };

  const prevSlide = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };



  const ValueCardheading = [
    {
      secHeading: "Our Keys",
      secSubHeading: "What sets us apart"
    }
  ]

  const ValueCardContent = [
    {
      icon: icon5,
      title: "Values",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon6,
      title: "Innovation ",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon7,
      title: "Integrity",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon8,
      title: "Agile Solutions",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon9,
      title: "Culture",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
    {
      icon: icon10,
      title: "Kindness",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus qui quidem praesentium?",
    },
  ];


  return (
    <>
    <MasterLayout>
      {/* video-section */}
      <Head>
        <title>{"Get to Know Us | The Story of Atrix IT Solutions"}</title>
        <meta name="description" content={"Welcome to Atrix IT Solutions! Learn how we help businesses grow with web development, digital marketing, and much more."} />
      </Head>


      <div className="video-sec mx-6 pt-[132px] pb-[40px] md:pb-[54px]">
        <div className="pointer-events-none  ">
          <video
            className="  rounded-xl "
            src={About_video}
            poster={thumbnail}
            autoPlay
            muted
            loop
            controls={false}
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>





      {/* About-heading and img-tex section */}
      <div className="Page-heading text-center  ">
        <h1 className="main-heading">About Us</h1>
        <p className="mx-auto max-w-3xl text-sm md:text-base lg:text-lg text-white/55 mt-4">
          We develop creative solutions that generate actual results. With tailored technology solutions, our team of experts is committed to helping your company grow and achieve long-term success.
        </p>
      </div>

      <About_sec_scroll />

      {/* text-marquee-section */}
      <div className="relative marquee-sec text-2xl md:text-6xl font-bold mt-8 md:mt-22   ">   <div>
        <Marquee speed={30} className="overflow-hidden text-[#8d8d8d]">
          VISIONARY . INNOVATIVE . EFFICIENT . GLOBAL . PROFESSIONAL . ACCESSIBLE . USER-CENTRIC . EMPOWERING . TRUSTWORTHY . SCALABLE.
        </Marquee>
      </div>

        <div>
          <Marquee
            speed={30}
            direction="right"
            className="overflow-hidden mt-1 text-[#8d8d8d]"
          > &nbsp; VISIONARY . INNOVATIVE . EFFICIENT . GLOBAL . PROFESSIONAL . ACCESSIBLE . USER-CENTRIC . EMPOWERING . TRUSTWORTHY . SCALABLE .
          </Marquee>
        </div>

        <div>
          <Marquee speed={30} className="overflow-hidden mt-1 text-[#8d8d8d]  ">
            USER-CENTRIC . EMPOWERING . TRUSTWORTHY . SCALABLE . VISIONARY . INNOVATIVE . EFFICIENT . GLOBAL . PROFESSIONAL . ACCESSIBLE .
          </Marquee>
        </div>
      </div>

      {/* Our Keys section */}


      {/* Heading */}
      <ValueCards />

      {/* CTA-section */}
      <CTASection />


      {/* Environment-section */}
      <div className="Environment-sec">
        <div className="container mx-auto  mt-14 md:mt-28 ">
          <div className="row text-center pb-10 ">
            <div className="col">
              <p className="text-xl pb-4"> Atrix Environment</p>
              <h2 className="sec-heading">
                Thriving Together for a Better Future!
              </h2>
            </div>
          </div>

          <div className="row flex-col grid grid-cols-12 mt-10 space-y-10 ">
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col ">
              <div className="image w-20 brightness-[2.5] mb-2">
                <img src={icon3} alt="Atrix IT Solutions" />
              </div>
              <p className="mt-2">Good Culture</p>
            </div>
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon4} alt="Atrix IT Solutions" />
              </div>
              <p className="mt-2">5 Day Working</p>
            </div>
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon2} alt="Atrix IT Solutions" />
              </div>
              <p className="mt-2">Growth & Support  </p>
            </div>
            <div className=" col-span-6 md:col-span-3 flex items-center flex-col  ">
              <div className="image w-20 brightness-[2.5] mb-2 ">
                <img src={icon1} alt="Atrix IT Solutions" />
              </div>
              <p className="mt-2">Transparency</p>
            </div>
          </div>
        </div >
      </div >

      {/* OurSolution-section */}
      < div className=" mt-14 md:mt-28 " >
        <div className="row  flex-col grid grid-cols-12 space-x-96  ">
          <div className=" Our Solution Process col-span-12 ">
            <OurSolution />
          </div>
        </div>
      </div >

      {/* OurPortfolio-section */}
      < div className="Our Solution Process  " >
        <OurPortfolio />
      </div >

      {/* Testimonial-Section */}
      <TestimonialsCards />

      {/* Behance-section */}
      <Behance />

    </MasterLayout>
    </>
  );
};

export default About;

