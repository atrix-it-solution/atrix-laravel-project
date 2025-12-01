import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowRight } from "react-icons/fa6";
import { Link } from '@inertiajs/react';

interface Project {
  imageUrl: string;
  projectUrl: string;
}

export default function Behance() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL as string;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}Behance/api/images?username=atrixit`);

        if (!res.data.images) {
          throw new Error('No images array in response');
        }

        const postImages = res.data.images.filter((img: string) =>
          img.includes('project') ||
          img.includes('808x454') ||
          img.match(/\/projects\/.*\.(jpg|png|gif)/i)
        );

        const projectData: Project[] = postImages.map((img: string) => {
          const projectIdMatch = img.match(/\/(\d{9})\//);
          const projectId = projectIdMatch ? projectIdMatch[1] : null;

          return {
            imageUrl: img,
            projectUrl: projectId
              ? `https://www.behance.net/gallery/${projectId}`
              : 'https://www.behance.net/atrixit'
          };
        });

        setProjects(projectData);
        setLoading(false);

      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error loading projects. ${err.message}`);
        } else {
          setError('Unknown error occurred.');
        }
        setLoading(false);
      }
    };

    fetchProjects();
  }, [BACKEND_URL]);

  const handleImageClick = (projectUrl: string) => {
    window.open(projectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto py-8 pb-14">
      <div className="flex flex-col lg:flex-row gap-16">

        {/* LEFT SECTION */}
        <div className="flex-shrink-0">
          <Link href="https://www.behance.net/atrixit" target="_blank">
            <h2 className="sec-heading font-bold mb-6 group duration-300 hover:text-(--blue)">
              Explore Our <br /> Behance
              <span className="inline-block border border-text-white/50 ml-2 h-8 w-8 rounded-full -rotate-45 group-hover:rotate-1 group-hover:bg-(--blue) group-hover:text-white group-hover:border-(--blue) duration-300">
                <FaArrowRight size={16} className="mx-auto mt-1.5" />
              </span>
            </h2>
          </Link>

          {error && (
            <div className="text-red-500 text-sm mt-4">
              {error}
              <br />
              <small>Ensure backend is running: node server.js</small>
            </div>
          )}
        </div>

        {/* RIGHT SECTION - IMAGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-full h-52 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ))
          ) : (
            projects.map((project, i) => (
              <div
                key={i}
                onClick={() => handleImageClick(project.projectUrl)}
                className="cursor-pointer flex flex-col items-center transition-transform hover:scale-105"
              >
                <img
                  src={project.imageUrl}
                  alt={`Behance Project ${i}`}
                  className="w-82 object-cover rounded-lg shadow-sm"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const img = e.currentTarget;
                    img.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    img.className = 'w-full h-48 object-contain bg-gray-100 p-4 rounded-lg border border-gray-200 shadow-sm';
                  }}
                />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
