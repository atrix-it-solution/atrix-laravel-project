import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const project1 = "/assets/PortfolioImage/user.avif";
const project2 = "/assets/PortfolioImage/user.avif";
const project3 = "/assets/PortfolioImage/user.avif";
const project4 = "/assets/PortfolioImage/user.avif";


const TestimonialsCards = () => {
  const testimonials = [
    {
      img: project2,
      UserName: "Meeraaj",
      // Subheading: "3D Animation",
      text: "I worked with Atrix IT Solutions to create our branding and website for our clothing brand. The Agency helped us to create this by understanding what we wanted to achieve. Our branding that we achieved is exactly what we set out to achieve, and we are very happy with all of the output. I would highly recommend Atrix IT Solutions.",
    },
    {
      img: project1,
      UserName: "Lumea",
      // Subheading: "3D Animation",
      text: "The team captured exactly what we imagined our products to be. The packaging and product design turned out to be a great piece of work. They have taken my initial product brief and developed a premium brand identity. Had a great experience working with them.",
    },
    {
      img: project3,
      UserName: "Vendy Ventures",
      // Subheading: "3D Animation",
      text: "The agency did my website, my brand identity, product shoot and marketing for my shoe brand. They were very professional and collaborative with me. I would highly recommend Atrix IT Solutions to anybody looking for a professional outfit to launch their brand.",
    },
    {
      img: project4,
      UserName: "Hillridge",
      // Subheading: "3D Animation",
      text: "The team at Atrix IT Solutions are great listeners. They understood what I was trying to achieve and delivered that exactly. I was delighted with the wonderful logo and branding of my Real Estate Company.",
    },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 480,
    autoplaySpeed: 10000,
    centerMode: true,
    centerPadding: "0px",
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="testimonial-container bg-darkblack text-whitelight relative overflow-hidden ">
      <div className="container mx-auto pt-10  ">
        <div className="py-10 md:py-22">
          <div className="testimonial-heading text-center">
            <p className="text-xl">Our Testimonials</p>
            <h2 className="sec-heading pt-2">What Our Clients Say</h2>
          </div>
          <div className="testimonial-slider pt-5">
            <Slider {...settings}>
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="testimonial-card md:px-2 px-1 mt-16 md:mt-40"
                >
                  <div className="rounded-2xl lg:p-10  p-7 bg-(--black)">
                    <div className="flex items-center gap-3">
                      <div>
                        <img
                          src={item.img}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>

                      <div className="flex flex-col justify-center">
                        <h4 className="text-xl font-bold tracking-tighter  mt-2 ">{item.UserName}</h4>
                        {/* <p className="text-white/70 mt-1">{item.Subheading}</p> */}
                        <span className="absolute right-10  lg:right-20  text-5xl text-white/15" ><i className="fa-solid fa-quote-right"></i></span>
                      </div>
                    </div>
                    <p className="testimonial-text text-white/50 mt-3">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* <hr className="  -z-10 relative mt-9" /> */}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCards;

