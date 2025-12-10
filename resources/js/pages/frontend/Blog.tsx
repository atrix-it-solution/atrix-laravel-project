import React, { useState } from "react";
import HeroCommon from "../../components/frontendComponents/herocommon/HeroCommon";
import Card from "react-bootstrap/Card";
import { router,Head } from "@inertiajs/react";
import Pagination from "../../components/frontendComponents/Pagination";
import { GoCalendar } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import MasterLayout from "@/layouts/frontendLayouts/MasterLayouts";
// import { useBlog } from "../GetContextApi/BlogGetContext";

const herodata = { title: "Blog" };

interface Blog {
  id: number;
  slug: string;
  title: string;
  img: string;
  date: string;
}

interface BlogProps {
  blogs: Blog[];
}


const BlogPage: React.FC<BlogProps> = ({blogs}) => {
  const blogsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = 1 // Math.ceil(blogData.length / blogsPerPage);   // temprary set data 1

  return (
    <>
    <MasterLayout>

      <Head>
        <title>{"Our Blogs | Insights and Updates from Atrix IT Solutions"}</title>
        <meta name="description" content={"Discover the work we’re proud of at Atrix IT Solutions. check out our portfolio to see how we help businesses succeed with creative IT solutions."} />
      </Head>
      

      <HeroCommon heroData={herodata} showFullContent={true} />

      <div className="container mx-auto  md:px-10">
        <div className="grid md:grid-cols-3  gap-10 ">
          {currentBlogs.map((blog: Blog) => (
            <div key={blog.id} className="w-full  flex flex-col">
              <Card.Img
                onClick={() =>
                  router.visit(
                    `/blog/${blog.slug}`
                  )
                }
                className="rounded-t-lg w-full aspect-video object-cover cursor-pointer"
                variant="top"
                src={blog.img}
              />

              <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col">
                <Card.Title className="flex items-center gap-2">
                  <GoCalendar /> {blog.date}
                </Card.Title>
                <Card.Text
                  onClick={() =>
                    router.visit(
                      `/blog/${blog.slug}`
                    )
                  }
                  className="font-extrabold  text-2xl pt-2 flex-1 hover:text-(--blue) cursor-pointer"
                >
                  {blog.title}
                </Card.Text>

                <p
                  onClick={() =>
                    router.visit(
                      `/blog/${blog.slug}`
                    )
                  }
                  className="font-bold pt-4 self-start  flex items-center  cursor-pointer hover:text-(--blue)   group "
                >
                  {" "}
                  Read More{" "}
                  <span className="border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue)   duration-300">
                    <FaArrowRight />
                  </span>
                </p>
              </Card.Body>
            </div>
          ))}
        </div>
      </div>


      {/* Pagination Component */}

      {totalPages > 1 && (
        <div className="PAGINATION-SEC container mx-auto justify-items-center pt-20">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </MasterLayout>
    </>
  );
};

export default BlogPage;


//   const { BlogData, ../components/frontendComponents/seoTags/SeoTags
// const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = BlogData.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = 1 // Math.ceil(blogData.length / blogsPerPage);   // temprary set data 1

// const BlogPage = () => {
// Pagination logic


//   return (
//     <>
//       <SeoTags
//      
  //  title="Our Blogs | Insights and Updates from Atrix IT Solutions"
//         description="Discover the work we’re proud of at Atrix IT Solutions. check out our portfolio to see how we help businesses succeed with creative IT solutions."
//       />

//       <HeroCommon heroData={herodata} showFullContent={true} />

//       <div className="container mx-auto  md:px-10">
//         <div className="grid md:grid-cols-3  gap-10 ">
//           {currentBlogs.map((blog) => (
//             <div key={blog.id} className="w-full  flex flex-col">
//               <Card.Img
//                 onClick={() =>
//                   navigate(
//                     `/blog/${blog.name.replace(/\s+/g, "-").toLowerCase()}`,
//                     { state: blog }
//                   )
//                 }
//                 className="rounded-t-lg w-full aspect-video object-cover cursor-pointer"
//                 variant="top"
//                 src={blog.img}
//               />

//               <Card.Body className="border border-white/15 p-6 flex-1 flex flex-col">
//                 <Card.Title className="flex items-center gap-2">
//                   <GoCalendar /> {blog.date}
//                 </Card.Title>
//                 <Card.Text
//                   onClick={() =>
//                     navigate(
//                       `/blog/${blog.name.replace(/\s+/g, "-").toLowerCase()}`,
//                       { state: blog }
//                     )
//                   }
//                   className="font-extrabold  text-2xl pt-2 flex-1 hover:text-(--blue) cursor-pointer"
//                 >
//                   {blog.name}
//                 </Card.Text>

//                 <p
//                   onClick={() =>
//                     navigate(
//                       `/blog/${blog.name.replace(/\s+/g, "-").toLowerCase()}`,
//                       { state: blog }
//                     )
//                   }
//                   className="font-bold pt-4 self-start  flex items-center  cursor-pointer hover:text-(--blue)   group "
//                 >
//                   {" "}
//                   Read More{" "}
//                   <span className="border border-white/45 ml-2 flex justify-center items-center h-6 w-6 rounded-full  -rotate-45 text-[var(--blue)] group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-(--white) group-hover:border-(--blue)   duration-300">
//                     <FaArrowRight />
//                   </span>
//                 </p>
//               </Card.Body>
//             </div>
//           ))}
//         </div>
//       </div>


//       {/* Pagination Component */}

//       {totalPages > 1 && (
//         <div className="PAGINATION-SEC container mx-auto justify-items-center pt-20">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// export default BlogPage;
// export { blogData };
