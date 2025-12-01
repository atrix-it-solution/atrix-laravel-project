// src/hooks/useLenis.js
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2, // duration affects how stretchy it feels (try 1.2–1.5)
            easing: (t) =>
                1 - Math.cos((t * Math.PI) / 2) * Math.pow(2, -10 * t), // springy easing
            smooth: true,
            smoothTouch: true, // smooth even on touch devices (optional)
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);
};

export default useLenis;
