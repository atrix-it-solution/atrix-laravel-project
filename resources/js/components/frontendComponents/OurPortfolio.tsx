import React from 'react';
// import Button from './Button';
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import LinkButton from '../../components/frontendComponents/button/LinkButton';
import portfolioData from '../../data/portfolioData'
import { Link } from '@inertiajs/react';


interface ProjectDescriptionItem {
    large_image: string;
    desc?: string;
    desc2?: string;
    h1?: string;
    h2?: string;
}
  
export interface PortfolioItem {
    project_id: string;
    coverImg: string;
    project_title: string;
    featured_image: string;
    single_page_page: string;
    project_link: string;
    tags: string[];
    category: string;
    project_description: ProjectDescriptionItem[];
}


const OurPortfolio: React.FC = () => {
    const settings: Settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3500,
        accessibility: false, 
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true } },
            { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } },
            { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } },
        ],
    };

    return (
        <div className="Portfolio-section text-(--whitelight) relative overflow-hidden">
            <div className='container mx-auto'>
                <div className='py-25 mb-6'>
                    <div className="md:flex justify-between gap-10">
                        <div className='font-extrabold'>
                            <p className='text-gray small-sub-heading'>Our Portfolio</p>
                            <h2 className="sec-heading max-w-[380px]">Our Work Your Success</h2>
                        </div>

                        <div className='flex-1  mt-14'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 477 65">
                                <path fill="#ffffffbd" d="M0.333333 3C0.333333 4.47276 1.52724 5.66667 3 5.66667C4.47276 5.66667 5.66667 4.47276 5.66667 3C5.66667 1.52724 4.47276 0.333333 3 0.333333C1.52724 0.333333 0.333333 1.52724 0.333333 3ZM475 3L475.255 3.42984L476.82 2.5H475V3ZM438.668 65L441.872 60.197L436.111 59.8239L438.668 65ZM3 3.5H475V2.5H3V3.5ZM474.745 2.57016C459.928 11.3742 441.341 27.8789 438.461 60.47L439.457 60.5581C442.3 28.3895 460.613 12.1303 475.255 3.42984L474.745 2.57016Z"></path>
                            </svg>
                        </div>

                        <div className='mt-1  md:text-end'>
                            <div className='flex md:justify-end'>
                                <LinkButton mybtn="View All Portfolio" btnLink='/portfolio' />
                            </div>
                            <p className='md:w-86 text-gray font-normal mt-4'>
                                At Atrix IT Solutions, every project we deliver is a step toward your success. Our expertise turns ideas into powerful solutions, helping businesses grow, innovate, and stand out.
                            </p>
                        </div>
                    </div>

                    <div className="mt-20">
                        <style>
                            {`
                            .slick-arrow { display:none!important; }
                            .slick-list{ overflow:visible; pointer-events: none; }
                            .slick-slide{ opacity:0.2 }
                            .slick-active{ opacity:1; pointer-events: auto; }
                            .slick-dots li button:before { opacity: 1; color: #fff; border: 1px solid #fff; border-radius: 50%; display: flex; justify-content: center; align-items: center; }
                            .slick-dots li.slick-active button:before { color: #00A657; border: 1px solid #00A657; }
                            .slick-dots { bottom: -50px; }
                            .slick-dots li { margin: 0 5px; }
                            `}
                        </style>

                        <Slider {...settings}>
                            {portfolioData.map((item: PortfolioItem, index: number) => (
                                <div key={index} className="md:px-4 px-1">
                                   
                                        <div className='border border-(--black) rounded-2xl'>
                                            <div className="bg-(--black) pt-8 px-8 rounded-t-lg">
                                                <ul className="flex flex-wrap gap-1">
                                                    {item.tags.map((tag, idx) => (
                                                        <li key={idx} className="bg-(--darkblack) duration-300 rounded-full px-4 py-1 text-sm hover:bg-(--green)">
                                                            {tag}
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className='relative aspect-[16/13]'>
                                                    <img src={item.featured_image} alt={item.project_title} className="w-full h-full object-cover mt-5" />
                                                    <Link href={`portfolio/${item.project_link}`} className='bg-(--black) rounded-full px-2 py-2 text-3xl absolute -bottom-5 right-10 hover:rotate-45 transform duration-300 cursor-pointer hover:bg-(--green)'>
                                                        <MdOutlineArrowOutward />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className="px-12 py-8">
                                                <Link href={item.single_page_page}>
                                                    <h3 className="text-2xl font-bold mb-2">{item.project_title}</h3>
                                                </Link>
                                            </div>
                                        </div>
                                    
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurPortfolio;


