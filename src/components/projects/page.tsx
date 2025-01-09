"use client"
import React, { useState } from "react";
import Image from 'next/image';
import { sans3 } from "@/app/assets/fonts";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";


interface Technology {
    name: string;
    icon: string;
}

interface Project {
    title: string;
    description: string;
    image: string;
    technologies: Technology[];
    liveLink?: string;
    githubLink?: string;
}

interface ProjectsProps {
    projects: Project[];
}

const mockData: ProjectsProps = {
    projects: [
        {
            title: "E-commerce Platform",
            description: "A full-stack e-commerce solution with real-time inventory management and secure payment processing.",
            image: "/path/to/ecommerce-image.jpg",
            technologies: [
                { name: "React", icon: "/icons/react.svg" },
                { name: "Node.js", icon: "/icons/nodejs.svg" },
                { name: "MongoDB", icon: "/icons/mongodb.svg" },
                { name: "Stripe", icon: "/icons/stripe.svg" },
            ],
            liveLink: "https://ecommerce-example.com",
            githubLink: "https://github.com/yourusername/ecommerce-project",
        },
        {
            title: "Task Management App",
            description: "A responsive web application for efficient task and project management with real-time collaboration features.",
            image: "/path/to/taskmanager-image.jpg",
            technologies: [
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" },
                { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
                { name: "Socket.io", icon: "/icons/socketio.svg" },
            ],
            liveLink: "https://taskmanager-example.com",
            githubLink: "https://github.com/yourusername/taskmanager-project",
        },
        {
            title: "Task Management App",
            description: "A responsive web application for efficient task and project management with real-time collaboration features.",
            image: "/path/to/taskmanager-image.jpg",
            technologies: [
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" },
                { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
                { name: "Socket.io", icon: "/icons/socketio.svg" },
            ],
            liveLink: "https://taskmanager-example.com",
            githubLink: "https://github.com/yourusername/taskmanager-project",
        },
        {
            title: "Task Management App",
            description: "A responsive web application for efficient task and project management with real-time collaboration features.",
            image: "/path/to/taskmanager-image.jpg",
            technologies: [
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" },
                { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
                { name: "Socket.io", icon: "/icons/socketio.svg" },
            ],
            liveLink: "https://taskmanager-example.com",
            githubLink: "https://github.com/yourusername/taskmanager-project",
        },
        // Add more projects as needed
    ]
};

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="mb-8 bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative h-48">
                <Image 
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                />
                <AnimatePresence>
                    {isHovered && (
                        <motion.div 
                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="flex space-x-4">
                                {project.liveLink && (
                                    <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Demo</button>
                                    </Link>
                                )}
                                {project.githubLink && (
                                    <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                        <button className="bg-gray-800 text-white px-4 py-2 rounded">GitHub</button>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-gray-200 rounded-full px-2 py-1 text-gray-700">
                            {tech.name}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-800 p-8">
            <div className={`container mx-auto ${sans3.className}`}>
                <motion.h1 
                    className="text-4xl font-bold mb-12 text-center text-gray-800"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My Projects
                </motion.h1>
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={index} 
                            project={project} 
                            index={index}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

const ProjectsPage: React.FC = () => {
    return <Projects {...mockData} />;
};

export default ProjectsPage;