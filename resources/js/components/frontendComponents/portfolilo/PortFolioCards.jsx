import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { Link } from "react-router-dom"
import projectsData from '../../data/projectsData';

 

const PortFolioCards = () => {
    const [activeCategory, setActiveCategory] = useState('All')
    const categories = ["All", ...new Set(projectsData.map((project) => project.category))];
    const filteredProjects = activeCategory === "All"
        ? projectsData
        : projectsData.filter(item => item.category === activeCategory);
    return (
        <div className='md:py-32 py-6'>
            <div className="container  mx-auto">
                <div className="category-btns flex flex-wrap justify-start  md:justify-center gap-3 mt-4 ">
                    {categories.map((item, index) => (
                        <button
                            key={index}
                            className={` text-sm py-1 px-4 lg:py-2 lg:px-8 rounded-3xl cursor-pointer font-bold  ${activeCategory === item ? "bg-gradient-to-r from-(--blue) to-(--green) text-black" : ""} bg-black relative before:absolute before:-inset-[1px] before:bg-gradient-to-r before:from-(--blue) before:to-(--green)  before:-z-1 before:rounded-3xl`}
                            onClick={() => setActiveCategory(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>


                {/* new Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-14 gap-x-14 my-10'>
                    {filteredProjects.map((item, index) => (
                        <Link to={`/portfolio/${item.project_id}`} key={index} className='group'  >
                            <div className="portfo-card-img w-full aspect-[16/9] border border-white/35 rounded-xl overflow-hidden">
                                <img src={item.featured_image} alt='featured_image' className='w-full h-full object-cover' />
                            </div>
                            <div className="portfo-card-content relative py-4 ps-2 pr-16">
                                <h3 className='text-4xl sec-heading font-bold mb-2 sub-sec-heading'>{item.project_title}</h3>
                                <p>
                                    {item.tags.map((item, index) => (
                                        <span key={index} >{item} /  </span>
                                    ))}
                                </p>
                                <span className="border border-white/35 items-center h-12 w-12 rounded-full flex justify-center -rotate-45  group-hover:text-white duration-300 group-hover:rotate-1 group-hover:bg-[var(--blue)] bg-black text-2xl absolute right-8 -top-2 ">
                                    <FaArrowRight />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default PortFolioCards;
