import React, { useEffect } from 'react'
import PortfolioAnimatedCards from '../../components/frontendComponents/portfolilo/PortfolioAnimatedCards';

import useLenis from '../../hooks/useLenis';
import HeroCommon from '../../components/frontendComponents/herocommon/HeroCommon' ;
import SeoTags from '../../components/frontendComponents/seoTags/SeoTags';
import MasterLayout from '@/layouts/frontendLayouts/MasterLayouts';




const Portfolio = () => {
    const heroData = { title: 'Portfolio', desc: 'Each project here solved a real challenge, because we believe success is measured in real business outcomes.' }
    useLenis();


    return (
        <>
            <MasterLayout>
                <SeoTags
                    title="Our Portfolio | Explore Successful Projects by Atrix IT Solutions"
                    description="Discover the work we’re proud of at Atrix IT Solutions. check out our portfolio to see how we help businesses succeed with creative IT solutions."
                />
                <HeroCommon heroData={heroData} />
                <PortfolioAnimatedCards></PortfolioAnimatedCards>
            </MasterLayout> 
        </>
    )
}

export default Portfolio 