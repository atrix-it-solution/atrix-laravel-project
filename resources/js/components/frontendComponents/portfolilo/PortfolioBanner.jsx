import React from 'react'
import banner_img from '../../assets/portfolio/project.avif'

const PortfolioBanner = () => {
    return (
        <div className='mx-auto px-5 sm:px-6 lg:px-8 pt-40'>
            {/* Banner Container */}
            <div className="relative py-36 bg-no-repeat bg-cover bg-center rounded-2xl text-white overflow-hidden"
                style={{
                    backgroundImage: `url(${banner_img})`,
                    //  textShadow: "rgba(0, 0, 0, 0.5) 3px 3px 6px, rgba(255, 255, 255, 0.3) 0px 0px 20px"
                }}>

                <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

                <div className="relative z-10 text-center">
                    <h1 className='text-7xl font-bold '>Lorem ipsum dolor sit amet.</h1>
                    <p className='max-w-[800px] mx-auto mt-3'>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, commodi voluptas. Minus ex nobis incidunt consequatur error cum, molestias expedita.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PortfolioBanner
