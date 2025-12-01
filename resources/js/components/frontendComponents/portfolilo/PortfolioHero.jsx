import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const PortfolioHero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        scene.background = null; //  background

        const rect = containerRef.current.getBoundingClientRect();
        const sizes = {
            width: rect.width,
            height: rect.height,
        };

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
        camera.position.set(3, 0, 5);
        scene.add(camera);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = false;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        containerRef.current.appendChild(renderer.domElement);

        // Pyramid geometry and material
        const pyramidGeometry = new THREE.ConeGeometry(1, 1.7, 4);
        const pyramidMaterial = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#4c4c4c"),
            metalness: 0.0,
            roughness: 1.0,
        });
        const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
        pyramid.castShadow = true;
        pyramid.position.set(1, 1, 0); // ✅ slightly up
        pyramid.scale.set(2.5, 2.5, 2.5);
        scene.add(pyramid);

        // Floor for shadow
        // const floorGeometry = new THREE.PlaneGeometry(10, 10);
        // const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.3 });
        // const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        // floor.rotation.x = -Math.PI / 2;
        // floor.position.y = -1; // ✅ lower to catch shadow fully
        // floor.receiveShadow = true;
        // scene.add(floor);

        // Lighting
        const mainLight = new THREE.DirectionalLight(0xffffff, 2);
        mainLight.position.set(2, 4, 2); // ✅ higher and angled
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.set(2048, 2048);
        mainLight.shadow.radius = 10;
        mainLight.shadow.bias = 10;
        scene.add(mainLight);

        scene.add(new THREE.AmbientLight(0xfffffff, 1));

        // Orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.5;
        controls.enablePan = false;
        controls.enableZoom = false;

        // ✅ Orbit only horizontally
        // controls.minPolarAngle = Math.PI / 2;
        // controls.maxPolarAngle = Math.PI / 2;

        controls.target.copy(pyramid.position);
        controls.update();

        // Resize handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            sizes.width = rect.width;
            sizes.height = rect.height;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        };

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(containerRef.current);

        // Animation loop
        const animate = () => {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            resizeObserver.disconnect();
            controls.dispose();
            renderer.dispose();
            scene.clear();
            if (containerRef.current && renderer.domElement.parentNode) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="w-full h-[60vh] min-h-[400px] relative overflow-hidden">
            <div className="absolute inset-0 grid grid-cols-2">
                {/* Left: Text */}
                <div className="flex items-center justify-center z-10 bg-transparent">
                    <h1 className="text-white text-[9rem] max font-bold flex ">
                        portfolio 
                    </h1>
                </div>

                {/* Right: 3D Pyramid */}
                <div ref={containerRef} className="w-full h-full bg-transparent" />
            </div>
        </div>
    );
};

export default PortfolioHero;
