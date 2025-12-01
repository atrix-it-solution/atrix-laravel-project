import React, { useState, useEffect } from "react";
import { MdOutlineZoomOut } from "react-icons/md";
import { MdOutlineZoomIn } from "react-icons/md";

const images = [
    { imageLink: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
    { imageLink: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&w=1080&q=80" },
];


const ProjectGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });


    const openLightbox = (image, index) => {
        setSelectedImage(image);
        setCurrentIndex(index);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    const goToImage = (index) => {
        setCurrentIndex(index);
        setSelectedImage(images[index].imageLink);
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        goToImage(newIndex);
    };

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % images.length;
        goToImage(newIndex);
    };

    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.5, 3));
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.5, 1));
    };

    const resetZoom = () => {
        setZoomLevel(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleMouseDown = (e) => {
        if (zoomLevel <= 1) return;
        setIsDragging(true);
        setStartPos({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging || zoomLevel <= 1) return;
        setPosition({
            x: e.clientX - startPos.x,
            y: e.clientY - startPos.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    goToNext();
                    break;
                case '+':
                    zoomIn();
                    break;
                case '-':
                    zoomOut();
                    break;
                case '0':
                    resetZoom();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImage, currentIndex, zoomLevel]);

    return (
        <div style={{ margin: "20px" }}>
            <div className="container mx-auto">
                <ul className="columns-2 md:columns-3 lg:columns-5 xl:columns-6 space-y-5 space-x-5 gap-0">
                    {images.map((item, index) => (
                        <li
                            key={index}
                            className="rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => openLightbox(item.imageLink, index)}
                        >
                            <img
                                src={item.imageLink}
                                alt="Atrix IT Solutions"
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center p-4"
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-50"
                    >
                        &times;
                    </button>

                    {/* Navigation arrows */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 text-white text-4xl hover:text-gray-300 z-50 p-2 bg-black bg-opacity-50 rounded-full"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 text-white text-4xl hover:text-gray-300 z-50 p-2 bg-black bg-opacity-50 rounded-full"
                    >
                        &#10095;
                    </button>

                    {/* Zoom controls */}
                    <div className="absolute top-4 left-4 flex gap-2 z-50 text-2xl">
                        <button
                            onClick={zoomIn}
                            className="text-white bg-gray-700 bg-opacity-50 p-2 rounded hover:bg-opacity-70 ps-[10px] pt-[10px]"
                            disabled={zoomLevel >= 3}
                        >
                            <MdOutlineZoomIn />
                        </button>
                        <button
                            onClick={zoomOut}
                            className="text-white bg-gray-700 bg-opacity-50 p-2 rounded hover:bg-opacity-70 ps-[10px] pt-[10px]"
                            disabled={zoomLevel <= 1}
                        >
                            <MdOutlineZoomOut />
                        </button>
                        {/* <button
                            onClick={resetZoom}
                            className="text-white bg-black bg-opacity-50 p-2 rounded hover:bg-opacity-70"
                            disabled={zoomLevel === 1}
                        >
                            Reset (0)
                        </button> */}
                    </div>

                    {/* Main image with zoom and drag */}
                    <div
                        className="relative flex-1 w-full flex items-center justify-center overflow-hidden"
                        onMouseMove={handleMouseMove}
                    >
                        <img
                            src={selectedImage}
                            alt="Atrix IT Solutions"
                            className={`transition-transform duration-300 ${zoomLevel > 1 ? 'cursor-grab' : 'cursor-default'} ${isDragging ? 'cursor-grabbing' : ''}`}
                            style={{
                                transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                                maxWidth: '90vw',
                                maxHeight: '70vh',
                                objectFit: 'contain'
                            }}
                            onMouseDown={handleMouseDown}
                        />
                    </div>

                    {/* Thumbnail navigation */}
                    <div className="w-full overflow-x-auto py-4 flex justify-center">
                        <div className="flex gap-2 px-4">
                            {images.map((item, index) => (
                                <img
                                    key={index}
                                    src={item.imageLink}
                                    alt="Atrix IT Solutions"
                                    className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${currentIndex === index ? 'border-white' : 'border-transparent'} hover:border-gray-400`}
                                    onClick={() => goToImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectGallery;