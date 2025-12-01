import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "@inertiajs/react";
import "./PortfolioAnimatedCards.css";
import axios from "axios";
import portfolioData from "../../../data/portfolioData"; // Fallback Local Data

// TYPES ========================================
interface Category {
    Name: string;
}

interface Project {
    id: number;
    title: string;
    coverImg: string;
    project_title: string;
    project_link: string;
    single_page_page: string;
    category: string;
}

// Custom Hook for Large Screens =================
const useIsLargeScreen = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsLargeScreen(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isLargeScreen;
};

// MAIN COMPONENT ================================
const PortfolioAnimatedCards: React.FC = () => {
    // const [categories, setCategories] = useState<Category[]>([]);
    const [getData, setGetData] = useState<Project[]>([]);
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState("all");

    // const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // // Fetch Categories
    // useEffect(() => {
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await axios.get(`${BACKEND_URL}PortfolioCategory/Portfolio/category/get`);
    //             setCategories(response.data.categories);
    //         } catch (error) {
    //             console.error("Category fetch error:", error);
    //         }
    //     };
    //     fetchCategories();
    // }, []);

    // Load Projects
    useEffect(() => {
        // If API available, replace here
        setAllProjects(portfolioData);
        setGetData(portfolioData);
    }, []);

    // Filter Projects
    const handleFilterProject = (categoryName: string) => {
        setActiveCategory(categoryName);

        if (categoryName === "all") {
            setGetData(allProjects);
            return;
        }

        const result = allProjects.filter((project) => {
            if (!project.category) return false;
            const categories = project.category.split(",").map((c) => c.trim().toLowerCase());
            return categories.includes(categoryName.toLowerCase());
        });

        setGetData(result);
    };

    const getVisibleCategories = () => {
    const categorySet = new Set<string>();

        allProjects.forEach((project) => {
            if (project.category) {
                project.category
                    .split(",")
                    .forEach((cat) => categorySet.add(cat.trim()));
            }
        });

        // Convert Set to array
        return Array.from(categorySet);
    };


    // Show Only Categories Available in Projects
    // const getVisibleCategories = () => {
    //     const projectCategories = new Set<string>();

    //     allProjects.forEach((project) => {
    //         if (project.category) {
    //             project.category
    //                 .split(",")
    //                 .forEach((cat) => projectCategories.add(cat.trim().toLowerCase()));
    //         }
    //     });

    //     return categories.filter((cat) => projectCategories.has(cat.Name.toLowerCase()));
    // };

    return (
        <div>
            {/* HEADER */}
            <div className="w-[90%] max-w-[1200px] mx-auto pb-[80px] lg:pb-[120px]">
                <div>
                    <span className='text-sm lg:text-md font-bold uppercase text-[var(--blue)] lg:tracking-[12px] tracking-wide'>Case Studies</span>
                </div>
                <div className="port-heading grid grid-cols-1 md:grid-cols-2 mt:mt-2 lg:mt-8">
                    <div className='flex items-center lg:pl-8'>
                        <h2 className='sec-heading font-bold'>Some of Our <br className=' hidden md:block' /> Finest Work.</h2>
                    </div>
                    <div className='flex lg:justify-end items-end mt-3 lg:mt-0 '>
                        <p className='max-w-3xs lg:leading-9 relative after:content:"" after:absolute after:w-3.5 after:border-[1px] after:border-[#d8d8d8] after:-bottom-10 after:left-0 lg:-translate-6'>
                            Solving diverse business needs through great design and UX.
                        </p>
                    </div>
                </div>

                {/* CATEGORY FILTER */}
                <div className="category-btn-wrapper text-sm md:text-base mt-24 md:justify-center flex flex-wrap gap-2 md:gap-5 ">
                    <div
                        className={`category-btn rounded-full py-1 px-4 md:px-6 md:py-2 font-semibold ${
                            activeCategory === "all" && "active"
                        }`}
                        onClick={() => handleFilterProject("all")}
                    >
                        ALL
                    </div>


                    {getVisibleCategories().map((cat, i) => (
                        <div
                            key={cat}
                            className={`category-btn rounded-full py-1 px-4 md:px-6 md:py-2 font-semibold ${
                                activeCategory === cat && "active"
                            }`}
                            onClick={() => handleFilterProject(cat)}
                        >
                            {cat}
                        </div>
                    ))}

                    {/* {getVisibleCategories().map((cat, i) => (
                        <div
                            key={i}
                            className={`category-btn rounded-full py-2 px-6 font-semibold ${
                                activeCategory === cat.Name && "active"
                            }`}
                            onClick={() => handleFilterProject(cat.Name)}
                        >
                            {cat.Name}
                        </div>
                    ))} */}
                </div>
            </div>

            {/* PROJECT ITEMS */}
            <div className=" relative grid grid-cols-1 lg:grid-cols-2 lg:gap-y-40 gap-x-20 w-[90%] max-w-[1200px] mx-auto -mt-14 md:mt-0">
                {getData.map((item, index) => (
                    <AnimatedCard key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

// ANIMATED CARD COMPONENT ========================
interface AnimatedCardProps {
    item: Project;
    index: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ item, index }) => {
    const isRight = index % 2 === 1;

    const cardRef = useRef<HTMLDivElement | null>(null);
    const layerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const isLargeScreen = useIsLargeScreen();

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(
        scrollYProgress,
        [0, 0.8],
        isLargeScreen && isRight ? [100, -240] : [0, 0]
    );

    const isLayerInView = useInView(layerRef, { amount: 0.2, once: true });
    const isContentInView = useInView(contentRef, { amount: 0.3, once: true });

    return (
        <motion.div ref={cardRef} style={{ y }} className="transition-transform duration-100 relative mt-14 lg:mt-0">
            {/* CARD IMAGE */}
            <div className="img-wrapper w-full h-[700px] hover:shadow-[0px_0px_18px_#a2bab0] transition-shadow duration-300">
                <Link href={item.single_page_page}>
                    <img
                        src={item.coverImg}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>

            {/* REVEAL LAYER */}
            <div
                ref={layerRef}
                className="card-layer absolute h-full w-full bg-gray-200 top-0 left-0 transition-all duration-700 z-10  "
                style={{ height: isLayerInView ? "0px" : "100%" }}
            />

            {/* TEXT CONTENT */}
            <motion.div
                ref={contentRef}
                className="p-5 pl-0 bottom-0 left-0 z-20"
                initial={{ opacity: 0, y: 40 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
                <h3 className="text-4xl font-semibold text-white mb-2">
                    <Link href={item.project_link}>{item.project_title}</Link>
                </h3>

                <p className="text-sm text-white">
                    {item.category}
                </p>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioAnimatedCards;
