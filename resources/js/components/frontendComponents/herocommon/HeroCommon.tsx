import React from 'react';
import ParticleEffectCommon from './ParticleEffectCommon';

interface HeroData {
  title: string;
  desc?: string;
}

interface HeroCommonProps {
  heroData: HeroData;
  showFullContent?: boolean;
}

const HeroCommon: React.FC<HeroCommonProps> = ({ heroData, showFullContent = false }) => {
    return (
        <div className="common-hero-sec relative text-center md:text-left overflow-hidden">
            <div className="container mx-auto pb-[90px] pt-[150px] lg:pb-[180px] lg:pt-[225px]">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-11">

                        {showFullContent && (
                            <>
                                {/* Brand Name */}
                                <div className="text-green-400 text-3xl font-extrabold mb-4  text-center">
                                    Atrix IT Solutions
                                </div>

                            </>
                        )}


                        {/* Main Title */}
                        <h1
                            className="main-heading text-center text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                            style={!heroData.desc ? { marginBottom: "-20px", lineHeight: "4.5rem" } : undefined}
                        >
                            {heroData.title}
                        </h1>


                        {showFullContent && (
                            <>

                                {/* Description */}
                                {/* <p className="max-w-4xl mx-auto text-lg md:text-xl text-white/70 mt-1 text-center leading-relaxed pt-10">
                                    {heroData.desc} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto placeat temporibus dicta ipsam facilis laboriosam voluptas nesciunt facere tempora ipsa.
                                </p> */}
                            </>
                        )}

                        {/* Yeh line har jagah show hogi */}
                        {heroData.desc && (
                            <p className=" text-center text-sm md:text-base lg:text-lg text-white/55 mt-1">
                                {heroData.desc}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Particle Effect - har jagah dikhana */}
            <div className="absolute top-0 right-0 translate-y-[-40%] translate-x-[40%] opacity-50">
                <ParticleEffectCommon />
            </div>
        </div>
    );
};

export default HeroCommon;
