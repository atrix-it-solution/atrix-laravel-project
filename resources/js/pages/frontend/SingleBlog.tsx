import React, { useEffect, useState } from "react";
import HeroCommon from "../../components/frontendComponents/herocommon/HeroCommon";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import Socialcons from "../../components/frontendComponents/Contact_us/Socialcons";
import logo from "../../../../public/logo/logo_icon.svg"
import MasterLayout from "@/layouts/frontendLayouts/MasterLayouts";

interface Strategy {
  heading3?: string;
  heading3_phara?: string;
  heading3_list?: string[];
}

interface Blog {
  id: number;
  slug: string;
  title: string;
  img: string;
  date: string;

  Published?: string;
  Category1?: string;
  Category2?: string;

  heading1_phara?: string | string[];
  heading1_phara2?: string;

  heading2?: string;
  img_2?: string;
  heding2_phara?: string;

  strategies?: Strategy[];

  list_heading1?: string;
  list_heading1_list?: string[];
  list_heading1_phara?: string;

  list_heading?: string;
  list?: string[];

  list_heading2?: string;
  list2?: string[];
  list2_P?: string;

  list3?: string[];

  heading3?: string;
  heading3_phara?: string | string[];

  text3?: string;

  heading4?: string;
  heading4_phara?: string | string[];

  heading5?: string;
  heading5_phara?: string | string[];
  heading5_phara1?: string;
  heading5_phara2?: string;
  heading5_phara3?: string;
  heading5_phara4?: string;

  heading6?: string;
  heading6_phara1?: string;
  heading6_phara2?: string;
  heading6_phara3?: string;

  text?: string;

  author?: string;
}

interface BlogProps {
  blog: Blog;
}

interface TableItem {
  title: string;
  id: string;
  level: number;
}

const BlogDetails: React.FC<BlogProps> = ({blog}) => {
const [tableOfContents, setTableOfContents] = useState<TableItem[]>([]);



  if (!blog) return <div className="text-white p-10">Blog not found.</div>;

  // Generate table of contents based on blog content
  useEffect(() => {
    const generateTableOfContents = () => {
      const items = [];

      // Add main title
      if (blog.title) {
        items.push({
          title: blog.title,
          id: "main-title",
          level: 1
        });
      }

      // Add all headings
      if (blog.heading2) {
        items.push({
          title: blog.heading2,
          id: "heading-2",
          level: 2
        });
      }

      if (blog.strategies && blog.strategies.length > 0) {
        blog.strategies.forEach((strategy, index) => {
          if (strategy.heading3) {
            items.push({
              title: strategy.heading3,
              id: `strategy-${index}`,
              level: 3
            });
          }
        });
      }

      if (blog.list_heading1) {
        items.push({
          title: blog.list_heading1,
          id: "list-heading-1",
          level: 3
        });
      }

      if (blog.list_heading) {
        items.push({
          title: blog.list_heading,
          id: "list-heading",
          level: 3
        });
      }

      if (blog.list_heading2) {
        items.push({
          title: blog.list_heading2,
          id: "list-heading-2",
          level: 3
        });
      }

      if (blog.heading3) {
        items.push({
          title: blog.heading3,
          id: "heading-3",
          level: 2
        });
      }

      if (blog.heading4) {
        items.push({
          title: blog.heading4,
          id: "heading-4",
          level: 2
        });
      }

      if (blog.heading5) {
        items.push({
          title: blog.heading5,
          id: "heading-5",
          level: 2
        });
      }

      if (blog.heading6) {
        items.push({
          title: blog.heading6,
          id: "heading-6",
          level: 2
        });
      }

      setTableOfContents(items);
    };

    generateTableOfContents();
  }, [blog]);

  // Smooth scroll function
  const scrollToSection = (id:string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <>
    <MasterLayout>
      {/* Header - Left completely unchanged */}
      <div className="Blog-header ">
        <div className="w-[100%]">
          <HeroCommon
            heroData={{ title: blog.title || "Blog Not Found", desc: "" }}
            showFullContent={true}
          />

        </div>
      </div>


      <div className="blog_Full_contant_sec md:-mt-[150px] mt-0 relative z-50 ">
        {/* Top Section - Responsive without visual changes */}
        <div className="container mx-auto">
          <div className="grid grid-cols-12 md:pt-5 -mt-5  gap-y-4">

            <div
            //   onClick={() => navigate("/blog")}
              className="group font-bold flex items-center justify-center md:justify-start cursor-pointer  gap-2 col-span-12 md:col-span-3 transition-colors duration-100"
            >
              <span className="border border-[var(--blue)] ml-2 flex justify-center items-center h-6 w-6 rounded-full rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-[var(--blue)] group-hover:text-white duration-200 transition-all">
                <FaArrowLeft />
              </span>
              <span className=" blog_btn_text cursor-pointer group-hover:text-[var(--blue)] duration-100">
                Back to main blog
              </span>

            </div>

            <div className="category-sec mt-1 flex flex-col md:flex-row justify-center items-center  gap-3 md:gap-5 col-span-12 md:col-span-6">

              <div className="flex text-[14px]">
                {blog.Published} {blog.date}
              </div>
              <hr className="border w-16 border-white/35 hidden md:block" />
              <div className="cat-center-sec flex flex-wrap justify-center gap-2 items-center">
                Category:
                <div className="bg-white/25 rounded-[14px] px-2.5 py-1 hover:bg-white/40 transition-colors duration-300">
                  {blog.Category1}
                </div>
                {blog.Category2 && (
                  <div className="bg-white/25 rounded-[14px] px-2.5 py-1 hover:bg-white/40 transition-colors duration-300">
                    {blog.Category2}
                  </div>
                )}
              </div>
            </div>


            <div className="social-media-icons text-[16px] flex items-center col-span-12 md:col-span-3 justify-center md:justify-end ">
              <div className="py-2.5">
                <ul className=" pl-6 flex gap-2 md:justify-start">
                  <Socialcons />
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Image - With responsive height */}
        <div className="container mx-auto pt-4">
          <div className="featured-img w-full h-auto sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden">
            <img
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
              src={blog.img}
              alt={blog.title}
            />
          </div>
        </div>

        {/* Dynamic Table of Contents */}
        <div className="table_contant container mx-auto max-w-[1300px] px-4 py-10 text-white space-y-6 ">
          <h2 className="text-[38px] font-bold mb-2">Table of Contents</h2>
          <ul className="space-y-1">
            {tableOfContents.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-white">›</span>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`${item.level === 1
                      ? "font-bold text-white text-3xl"
                      : item.level === 2
                        ? "font-semibold text-white text-2xl"
                        : "text-white hover:text-[var(--blue)] text-base"
                    } leading-snug cursor-pointer hover:text-[var(--blue)] transition-colors duration-200`}
                  style={{ paddingLeft: `${(item.level - 1) * 15}px` }}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Content */}
        <div className="container mx-auto max-w-[1300px] px-4 py-10 text-white space-y-6">
          <div className="div px-4">
            {/* Main Title with ID */}
            {blog.title && (
              <h1 id="main-title" className="text-6xl font-extrabold mb-6 scroll-mt-20">
                {blog.title}
              </h1>
            )}

            {/* Main Paragraph - Handle both string and array */}
            {blog.heading1_phara && (
              <div className="text-[16px]  leading-relaxed">
                {Array.isArray(blog.heading1_phara) ? (
                  blog.heading1_phara.map((para, index) => (
                    <p key={index} className="mb-4">
                      {para}
                    </p>
                  ))
                ) : (
                  <p>{blog.heading1_phara}</p>
                )}
              </div>
            )}

            {/* Secondary Paragraph if exists */}
            {blog.heading1_phara2 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading1_phara2}
              </p>
            )}

            {/* Second Heading */}
            {blog.heading2 && (
              <h2 id="heading-2" className="  sec-heading  font-bold pt-6 scroll-mt-20">{blog.heading2}</h2>
            )}

            {/* Second Image */}
            {blog.img_2 && (
              <img
                src={blog.img_2}
                alt="Section Image"
                className="w-full object-cover rounded-lg py-4 "
              />
            )}

            {/* Second Heading Paragraph */}
            {blog.heding2_phara && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heding2_phara}
              </p>
            )}

            {/* Handle Strategies Array (for blog id: 2) */}
            {blog.strategies && blog.strategies.length > 0 && (
              <div className="strategies-section">
                {blog.strategies.map((strategy, index) => (
                  <div key={index} className="mb-8">
                    <h3 id={`strategy-${index}`} className="  heading  font-semibold mb-4 scroll-mt-20">
                      {strategy.heading3}
                    </h3>
                    {strategy.heading3_phara && (
                      <p className="   text-[16px] leading-relaxed mb-4">
                        {strategy.heading3_phara}
                      </p>
                    )}
                    {strategy.heading3_list &&
                      strategy.heading3_list.length > 0 && (
                        <ul className=" pl-6 list-disc    space-y-2">
                          {strategy.heading3_list.map((item, i) => (
                            <li key={i} className="text-baseleading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))}
              </div>
            )}

            {/* First List Section */}
            {blog.list_heading1 && (
              <h3 id="list-heading-1" className="  heading  pt-6 scroll-mt-20">{blog.list_heading1}</h3>
            )}

            {blog.list_heading1_list && blog.list_heading1_list.length > 0 && (
              <ul className=" pl-6 list-disc  space-y-2">
                {blog.list_heading1_list.map((item, i) => (
                  <li key={i} className="text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {blog.list_heading1_phara && (
              <p className="  text-[16px]  leading-relaxed">
                {blog.list_heading1_phara}
              </p>
            )}

            {/* Limitations Section */}
            {blog.list_heading && (
              <h3 id="list-heading" className="  heading font-semibold pt-6 pb-2 scroll-mt-20">
                {blog.list_heading}
              </h3>
            )}

            {blog.list && blog.list.length > 0 && (
              <ul className=" pl-6 list-disc  space-y-2">
                {blog.list.map((item, i) => (
                  <li key={i} className="text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Second List Section */}
            {blog.list_heading2 && (
              <h3 id="list-heading-2" className="  heading font-semibold pt-6 pb-2 scroll-mt-20">
                {blog.list_heading2}
              </h3>
            )}

            {blog.list2 && blog.list2.length > 0 && (
              <ul className=" pl-6 list-disc  space-y-2">
                {blog.list2.map((item, i) => (
                  <li key={i} className="text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {blog.list2_P && (
              <p className="   text-[16px] leading-relaxed ">{blog.list2_P}</p>
            )}

            {/* Third List Section */}
            {blog.list3 && blog.list3.length > 0 && (
              <ul className=" pl-6 list-disc  space-y-2">
                {blog.list3.map((item, i) => (
                  <li key={i} className="text-base leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {/* Third Heading */}
            {blog.heading3 && (
              <h2 id="heading-3" className="  sec-heading  font-bold pt-6 pb-2 scroll-mt-20">{blog.heading3}</h2>
            )}

            {/* Third Heading Paragraph - Handle both string and array */}
            {blog.heading3_phara && (
              <div className="text-[16px]  leading-relaxed">
                {Array.isArray(blog.heading3_phara) ? (
                  <ul className=" pl-6 list-disc  space-y-2">
                    {blog.heading3_phara.map((item, i) => (
                      <li key={i} className="text-base leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{blog.heading3_phara}</p>
                )}
              </div>
            )}

            {blog.text3 && (
              <p className="   text-[16px] leading-relaxed">{blog.text3}</p>
            )}

            {/* Fourth Heading */}
            {blog.heading4 && (
              <h2 id="heading-4" className="  sec-heading  font-bold pt-6 pb-2 scroll-mt-20">{blog.heading4}</h2>
            )}

            {/* Fourth Heading Paragraph - Handle array */}
            {blog.heading4_phara && (
              <div className="  text-[16px] leading-relaxed">
                {Array.isArray(blog.heading4_phara) ? (
                  blog.heading4_phara.map((para, index) => (
                    <p key={index} className="mb-4">
                      {para}
                    </p>
                  ))
                ) : (
                  <p>{blog.heading4_phara}</p>
                )}
              </div>
            )}

            {/* Fifth Heading */}
            {blog.heading5 && (
              <h2 id="heading-5" className="  sec-heading  font-bold pt-6 pb-2 scroll-mt-20">{blog.heading5}</h2>
            )}

            {/* Fifth Heading Paragraph - Handle array */}
            {blog.heading5_phara && (
              <div className=" text-[16px] leading-relaxed">
                {Array.isArray(blog.heading5_phara) ? (
                  blog.heading5_phara.map((para, index) => (
                    <p key={index} className="mb-4">
                      {para}
                    </p>
                  ))
                ) : (
                  <p>{blog.heading5_phara}</p>
                )}
              </div>
            )}

            {blog.heading5_phara1 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading5_phara1}
              </p>
            )}
            {blog.heading5_phara2 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading5_phara2}
              </p>
            )}
            {blog.heading5_phara3 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading5_phara3}
              </p>
            )}
            {blog.heading5_phara4 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading5_phara4}
              </p>
            )}

            {/* Sixth Heading (Conclusion) */}
            {blog.heading6 && (
              <h2 id="heading-6" className="  sec-heading  font-bold pt-6 pb-2 scroll-mt-20">{blog.heading6}</h2>
            )}

            {blog.heading6_phara1 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading6_phara1}
              </p>
            )}
            {blog.heading6_phara2 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading6_phara2}
              </p>
            )}
            {blog.heading6_phara3 && (
              <p className="   text-[16px] leading-relaxed">
                {blog.heading6_phara3}
              </p>
            )}

            {/* Handle simple text content for other blogs */}
            {blog.text && !blog.heading1_phara && (
              <p className="   text-[16px] leading-relaxed">{blog.text}</p>
            )}
          </div>
        </div>

        {/* last */}
        <div className="author items-center mx-auto flex justify-center w-[1500px]  border-t border-gray-700  py-8 md:py-18 -mb-15  ">
          <div className="container ">
            <div className="row  ">
              <div className="col flex items-center mx-auto gap-20 justify-center">
                <a href="/blog"><img style={{ width: "250px", }} src={logo} alt="" /></a>
                <div className="text max-w-[900px]">
                  <h2 className="text-[34px] font-bold  pt-5"><a href="/blog">Atrix It Solutions</a></h2>
                  <p className="text-[16px]">{blog.author} We deliver cutting-edge solutions that drive business efficiency and growth, with years of experience in the tech industry.</p>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Related Blogs Section */}
      </div>

    </MasterLayout>
    </>
  );
};

export default BlogDetails;  




// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import HeroCommon from "../Components/HeroCommon";
// import { FaArrowLeft } from "react-icons/fa6";
// import Socialcons from "../Components/Contact_us/Socialcons";
// import './BlogDetails.css'
// import logo from "/logo/logo_icon.svg"
// import { useBlog } from "../GetContextApi/BlogGetContext";

// const BlogDetails = () => {
//   const navigate = useNavigate();
//   const { slug } = useParams();
//   const [tableOfContents, setTableOfContents] = useState([]);
//   const { BlogData } = useBlog();

//   const blog = BlogData.find(
//     (item) => item.name.replace(/\s+/g, "-").toLowerCase() === slug
//   );

//   useEffect(() => {
//     if (!blog) return;

//     const generateTableOfContents = () => {
//       const items = [];

//       // Add main title
//       if (blog.title) {
//         items.push({
//           title: blog.title,
//           id: "main-title",
//           level: 1
//         });
//       }

//       // Add items from tableofcontents array
//       if (blog.tableofcontents && blog.tableofcontents.length > 0) {
//         blog.tableofcontents.forEach((item, index) => {
//           items.push({
//             title: item.title,
//             id: `toc-${index}`,
//             level: 2
//           });
//         });
//       }

//       setTableOfContents(items);
//     };

//     generateTableOfContents();
//   }, [blog]);

//   // Smooth scroll function
//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       element.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start',
//         inline: 'nearest'
//       });
//     }
//   };

//   // Return early only after all hooks have been called
//   if (!blog) return <div className="text-white p-10">Blog not found.</div>;

//   return (
//     <>
//       {/* Header */}
//       <div className="Blog-header ">
//         <div className="w-[100%]">
//           <HeroCommon
//             heroData={{ title: blog.name || "Blog Not Found", desc: "" }}
//             showFullContent={true}
//           />
//         </div>
//       </div>

//       <div className="blog_Full_contant_sec md:-mt-[150px] mt-0 relative z-50 ">
//         {/* Top Section */}
//         <div className="container mx-auto">
//           <div className="grid grid-cols-12 md:pt-5 -mt-5 gap-y-4">
//             <div
//               onClick={() => navigate("/blog")}
//               className="group font-bold flex items-center justify-center md:justify-start cursor-pointer gap-2 col-span-12 md:col-span-3 transition-colors duration-100"
//             >
//               <span className="border border-[var(--blue)] ml-2 flex justify-center items-center h-6 w-6 rounded-full rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-[var(--blue)] group-hover:text-white duration-200 transition-all">
//                 <FaArrowLeft />
//               </span>
//               <span className="blog_btn_text cursor-pointer group-hover:text-[var(--blue)] duration-100">
//                 Back to main blog
//               </span>
//             </div>

//             <div className="category-sec mt-1 flex flex-col md:flex-row justify-center items-center gap-3 md:gap-5 col-span-12 md:col-span-6">
//               <div className="flex text-[14px]">
//                 {blog.Published} {blog.date}
//               </div>
//               <hr className="border w-16 border-white/35 hidden md:block" />
//               <div className="cat-center-sec flex flex-wrap justify-center gap-2 items-center">
//                 Category:
//                 {blog.categoryNames && blog.categoryNames.map((category, index) => (
//                   <div key={index} className="bg-white/25 rounded-[14px] px-2.5 py-1 hover:bg-white/40 transition-colors duration-300">
//                     {category}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="social-media-icons text-[16px] flex items-center col-span-12 md:col-span-3 justify-center md:justify-end ">
//               <div className="py-2.5">
//                 <ul className="pl-6 flex gap-2 md:justify-start">
//                   <Socialcons />
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Blog Image */}
//         <div className="container mx-auto pt-4">
//           <div className="featured-img w-full h-auto sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden">
//             <img
//               className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
//               src={blog.img}
//               alt={blog.title}
//             />
//           </div>
//         </div>

//         {/* Dynamic Table of Contents */}

//         <div className="table_contant container mx-auto max-w-[1300px] px-4 py-10 text-white space-y-6">
//           <h2 className="text-[38px] font-bold mb-2">Table of Contents</h2>
//           <ul className="space-y-1">
//             {tableOfContents
//               .filter(item => item.title ) 
//               .map((item, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <span className="text-white">›</span>
//                   <a
//                     href="#"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       scrollToSection(item.id);
//                     }}
//                     className={`${item.level === 1
//                         ? "font-bold text-white text-3xl"
//                         : item.level === 2
//                           ? "font-semibold text-white text-2xl"
//                           : "text-white hover:text-[var(--blue)] text-base"
//                       } leading-snug cursor-pointer hover:text-[var(--blue)] transition-colors duration-200`}
//                     style={{ paddingLeft: `${(item.level - 1) * 15}px` }}
//                   >
//                     {item.title}
//                   </a>
//                 </li>
//               ))}
//           </ul>


//           {/* <ul className="space-y-1">
//             {tableOfContents.map((item, index) => (
//               <li key={index} className="flex items-start gap-2">
//                 <span className="text-white">›</span>
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     scrollToSection(item.id);
//                   }}
//                   className={`${item.level === 1
//                     ? "font-bold text-white text-3xl"
//                     : item.level === 2
//                       ? "font-semibold text-white text-2xl"
//                       : "text-white hover:text-[var(--blue)] text-base"
//                     } leading-snug cursor-pointer hover:text-[var(--blue)] transition-colors duration-200`}
//                   style={{ paddingLeft: `${(item.level - 1) * 15}px` }}
//                 >
//                   {item.title}
//                 </a>
//               </li>
//             ))}
//           </ul> */}
//         </div>

//         {/* Blog Content */}
//         <div className="container mx-auto max-w-[1300px] px-4 py-10 text-white space-y-6">
//           <div className="div px-4">



//             {/* Dynamic Content from tableofcontents */}
//             {blog.tableofcontents && blog.tableofcontents.map((item, index) => (
//               <div key={index} id={`toc-${index}`} className="content-section scroll-mt-20 mb-10">
//                 <h2 className="sec-heading font-bold pt-6">{item.title}</h2>
//                 <div
//                   dangerouslySetInnerHTML={{ __html: item.description }}
//                   className="text-[16px] leading-relaxed"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Author Section */}
//         <div className="author items-center mx-auto flex justify-center w-full border-t border-gray-700 py-8 md:py-18 -mb-15">
//           <div className="container">
//             <div className="row">
//               <div className="col flex items-center mx-auto gap-20 justify-center">
//                 <a href="/blog">
//                   <img style={{ width: "250px" }} src={logo} alt="Atrix IT Solutions" />
//                 </a>
//                 <div className="text max-w-[900px]">
//                   <h2 className="text-[34px] font-bold pt-5">
//                     <a href="/blog">{blog.authname}</a>
//                   </h2>
//                   <p className="text-[16px]">
//                     {blog.authdescription}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BlogDetails;