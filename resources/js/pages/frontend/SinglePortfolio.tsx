import React, { useEffect } from 'react';
import { usePage,Link } from '@inertiajs/react';

import projectsData from '../../data/portfolioData';
import MasterLayout from '@/layouts/frontendLayouts/MasterLayouts';

import { Project } from "@/types/portfolio";


const PortfolioSingle: React.FC<Project> = () => {
const { project_id } = usePage().props;
const filteredProject: Project | undefined = projectsData.find(
  item => String(item.project_id) === String(project_id)
);



    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo({ top: 0 ,  behavior: 'smooth' });
        };

        scrollToTop();

        // scroll again after short delays in case content shifts
        const timeout1 = setTimeout(scrollToTop, 100);
        const timeout2 = setTimeout(scrollToTop, 500);
        const timeout3 = setTimeout(scrollToTop, 600);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
        };
    }, []);

    if (!filteredProject) {
        return (
            <MasterLayout>
                <div className="text-center py-20 text-white">
                    <h1 className="text-3xl font-bold">Project not found</h1>
                </div>
            </MasterLayout>
        );
    }


    return (
        <>
        <MasterLayout>
            <div className="single-Port">
                {<>
                    {/* hero image  */}
                    <div className="mx-auto px-5 sm:px-6 lg:px-8 pt-[132px]">
                        <div className="feature-image_wrapper">
                            <img
                                src={filteredProject.featured_image}
                                alt="feature image"
                                // loading="lazy"
                                className=' w-full h-auto'
                            />
                        </div>
                    </div>

                    {/* heading  */}

                    <div className="container mx-auto my-16">
                        <div className="port-heading-wrapper text-center">
                            <Link
                                href={filteredProject.project_link} 
                                target='_blank'
                                className=" uppercase text-(--blue) font-bold hover:text-[#0283b1] transition-colors"
                            >
                                View the Project
                            </Link>
                            <h2 className=" fon-subt-bold mt-4 sec-heading">
                                {filteredProject.project_title}
                            </h2>
                            <div className="flex gap-3 justify-center mt-6 flex-wrap">
                                {filteredProject.tags.map((tag, index) => (
                                    <span key={index} className="custom-gradient project-tag px-8 py-2 bg-gray-100 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* description section  */}
                    {
                        filteredProject.project_description.map((item, index) => (
                            <div key={index} className='mx-auto px-5 sm:px-6 lg:px-8 my-16 ' >
                                <img src={item.large_image} alt="Atrix IT Solutions" className='w-full h-auto' />
                                {
                                    item.h1 || item.h2 || item.desc || item.desc2 ?
                                        <div className='description my-16 max-w-[70%] mx-auto ' >
                                            {item.h1 ? <h1 className='text-6xl text-center font-bold mb-5 ' >{item.h1}</h1> : ''}
                                            {item.h2 ? <h2 className='text-2xl text-center font-bold mb-3' >{item.h2}</h2> : ''}
                                            {item.desc ? <p className=' text-[16px] text-center' >{item.desc}</p> : ''}
                                            {item.desc2 ? <p className=' text-[16px] text-center' >{item.desc2}</p> : ''}
                                        </div>
                                        : ''}

                            </div>
                        ))
                    }
                </>
                }
                {/* <ProjectsGallery></ProjectsGallery> */}
            </div>
        </MasterLayout>
        </>
    );
};

export default PortfolioSingle;


// import React, { useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './PortfolioSingle.css';
// import { useParams } from "react-router-dom";
// import projectsData from '../data/projectsData';
// import ProjectsGallery from '../Components/portfolilo/ProjectsGallery';
// import { usePortfolio } from '../GetContextApi/PortfolioGetContext';

// const PortfolioSingle = () => {
//     const { project_id } = useParams();
//     // const filteredProject = projectsData.find(item => item.project_id === project_id)
//  const { portfolioData } = usePortfolio();
//   const filteredProject = portfolioData.find(item => item.slug === project_id);

//     useEffect(() => {
//         const scrollToTop = () => {
//             window.scrollTo({ top: 0 ,  behavior: 'smooth' });
//         };

//         scrollToTop();

//         // scroll again after short delays in case content shifts
//         const timeout1 = setTimeout(scrollToTop, 100);
//         const timeout2 = setTimeout(scrollToTop, 500);
//         const timeout3 = setTimeout(scrollToTop, 600);

//         return () => {
//             clearTimeout(timeout1);
//             clearTimeout(timeout2);
//             clearTimeout(timeout3);
//         };
//     }, []);


//     return (
//         <div className="single-Port">
//             {<>
//                 {/* hero image  */}
//                 <div className="mx-auto px-5 sm:px-6 lg:px-8 pt-[132px]">
//                     <div className="feature-image_wrapper">
//                         <img
//                             src={filteredProject.bannerImageUrl}
//                             alt="Banner Image"
//                             // loading="lazy"
//                             className=' w-full h-auto'
//                         />
//                     </div>
//                 </div>

//                 {/* heading  */}

//                 <div className="container mx-auto my-16">
//                     <div className="port-heading-wrapper text-center">
//                         {filteredProject.project_link && filteredProject.project_link !== "#" && (
//                         <Link
//                             to={filteredProject.project_link} 
//                             target='_blank'
//                             className=" uppercase text-(--blue) font-bold hover:text-[#0283b1] transition-colors"
//                         >
//                             View the Project
//                         </Link>
//                         )}
//                         <h2 className=" fon-subt-bold mt-4 sec-heading">
//                             {filteredProject.project_title}
//                         </h2>
//                         <div className="flex gap-3 justify-center mt-6 flex-wrap">
//                             {filteredProject.tags.map((tag, index) => (
//                                 <span key={index} className="custom-gradient project-tag px-8 py-2 bg-gray-100 rounded-full">
//                                     {tag}
//                                 </span>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//                 {/* description section  */}
//                 {filteredProject.project_description.map((section, index) => {
//                     if (section.type === "full-image") {
//                         return (
//                             <div key={index} className='mx-auto px-5 sm:px-6 lg:px-8 my-16'>
//                                 <img
//                                     src={`${import.meta.env.VITE_BACKEND_URL}${section.imageUrl}`}
//                                     alt={`Section ${index}`}
//                                     className='w-full h-auto'
//                                 />
//                             </div>
//                         );
//                     }
//                     if (section.type === "text") {
//                         return (
//                             <div
//                                 key={index}
//                                 className='description text-center my-16 max-w-[68%] mx-auto '
//                                 dangerouslySetInnerHTML={{ __html: section.content }}
//                             />
//                         );
//                     }
//                     return null;
//                 })}

                

//             </>
//             }
//             {/* <ProjectsGallery></ProjectsGallery> */}
//         </div>
//     );
// };

// export default PortfolioSingle;
