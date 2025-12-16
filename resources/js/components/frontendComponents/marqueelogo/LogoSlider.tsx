import React, { useEffect, useState } from 'react';
import './LogoSlider.css'
const logo1 = "/assets/LogoSliderImage/logo1.svg"
const logo2 = "/assets/LogoSliderImage/logo2.svg"
const logo3 = "/assets/LogoSliderImage/logo3.svg"
const logo4 = "/assets/LogoSliderImage/logo4.svg"
const logo5 = "/assets/LogoSliderImage/logo5.svg"
const logo6 = "/assets/LogoSliderImage/Logo17.svg"
import axios from 'axios';

interface Brand {
  id: string | number;
  title: string;
  link?: string;
  featuredImage: string;
  updatedAt?: string;
}
interface LogoSliderProps {
  className?: string;
}

// TypeScript interface for static logo
interface LogoImage {
  id: number;
  img: string;
}

const LogoSlider: React.FC<LogoSliderProps> = ({ className })=> {
  const Logoimage = [
    { id: 1, img: logo1 },
    { id: 2, img: logo2 },
    { id: 3, img: logo3 },
    { id: 4, img: logo4 },
    { id: 5, img: logo5 },
     { id: 6, img: logo6 },
    
  ];
   const [brands, setBrands] = useState<Brand[]>([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const response = await axios.get(`${BACKEND_URL}Brand/get`);
//         const fetchedBrands: Brand[] = response.data.Brand.map((brand: any) => ({
//           id: brand._id,
//           title: brand.title,
//           link: brand.link,
//           featuredImage: brand.FeaturedImage
//             ? `${BACKEND_URL}${brand.FeaturedImage}`
//             : "/images/user/user-22.jpg",
//           updatedAt: new Date(brand.updatedAt).toLocaleDateString(),
//         }));
//         setBrands(fetchedBrands);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     };

//     fetchBrands();
//   }, [BACKEND_URL]);

  return (
    <div className={`container-fluid mx-auto max-w-full ${className || ""}`}>
      <h6 className='flex justify-center items-center  mb-5 md:mb-10 font-bold text-(--white) px-5 text-center'>Over 1K+ Software Businesses Growing with Atrix IT Solutions</h6>

      <div className='marquee-2'>

         {/* {[...Array(5)].map((_, idx) => (
          <div key={idx} className="marquee-content">
            {brands.map((brand) => (
              <div key={brand.id} className="marquee-img">
                <img
                  src={brand.featuredImage}
                  alt={`Logo of ${brand.title}`}
                  title={brand.title} 
                />
                <p>{brand.title}</p>
              </div>
            ))}
             </div>
        ))} */}

        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={image.id} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
        <div className='marquee-content'>
          {Logoimage.map((image) => (
            <div key={`${image.id}-copy`} className='marquee-img'>
              <img src={image.img} alt={`Logo ${image.id}`} />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default LogoSlider;