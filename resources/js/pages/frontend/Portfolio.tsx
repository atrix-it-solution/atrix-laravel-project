import React, { useEffect } from 'react'
import PortfolioAnimatedCards from '../../components/frontendComponents/portfolilo/PortfolioAnimatedCards';

import useLenis from '../../hooks/useLenis';
import HeroCommon from '../../components/frontendComponents/herocommon/HeroCommon' ;
import MasterLayout from '@/layouts/frontendLayouts/MasterLayouts';
import { Head } from '@inertiajs/react';



const Portfolio = () => {
    const heroData = { title: 'Portfolio', desc: 'Each project here solved a real challenge, because we believe success is measured in real business outcomes.' }
    useLenis();


    return (
        <>
            <MasterLayout>
                <Head>
                    <title>{"Our Portfolio | Explore Successful Projects by Atrix IT Solutions"}</title>
                    <meta name="description" content={"Discover the work we’re proud of at Atrix IT Solutions. check out our portfolio to see how we help businesses succeed with creative IT solutions."} />
                </Head>
               
                <HeroCommon heroData={heroData} />
                <PortfolioAnimatedCards></PortfolioAnimatedCards>
            </MasterLayout> 
        </>
    )
}

export default Portfolio 