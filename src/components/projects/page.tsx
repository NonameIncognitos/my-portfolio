"use client"
import React, { ReactNode, useState } from "react";
import Image from 'next/image';
import { sans3 } from "@/app/assets/fonts";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
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
    favorite: boolean
}

interface ContainerProps {
    children: ReactNode;
}

interface ProjectsProps {
    projects: Project[];
}

const mockData: ProjectsProps = {
    projects: [
        {
            title: "E-commerce Platform",
            description: "A full-stack e-commerce solution with real-time inventory management and secure payment processing.",
            image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            technologies: [
                { name: "React", icon: "/icons/react.svg" },
                { name: "Node.js", icon: "/icons/nodejs.svg" },
                { name: "MongoDB", icon: "/icons/mongodb.svg" },
                { name: "Stripe", icon: "/icons/stripe.svg" },
            ],
            liveLink: "https://ecommerce-example.com",
            githubLink: "https://github.com/yourusername/ecommerce-project",
            favorite: true
        },
        {
            title: "Task Management App",
            description: "A responsive web application for efficient task and project management with real-time collaboration features.",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1939&q=80",
            technologies: [
                { name: "Next.js", icon: "/icons/nextjs.svg" },
                { name: "TypeScript", icon: "/icons/typescript.svg" },
                { name: "PostgreSQL", icon: "/icons/postgresql.svg" },
                { name: "Socket.io", icon: "/icons/socketio.svg" },
            ],
            liveLink: "https://taskmanager-example.com",
            githubLink: "https://github.com/yourusername/taskmanager-project",
            favorite: true
        },
        {
            title: "Fitness Tracking App",
            description: "A mobile-first web application for tracking workouts, nutrition, and personal fitness goals.",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            technologies: [
                { name: "React Native", icon: "/icons/react-native.svg" },
                { name: "Firebase", icon: "/icons/firebase.svg" },
                { name: "Redux", icon: "/icons/redux.svg" },
                { name: "Chart.js", icon: "/icons/chartjs.svg" },
            ],
            liveLink: "https://fitnessapp-example.com",
            githubLink: "https://github.com/yourusername/fitness-app-project",
            favorite: true
        },
        {
            title: "AI-powered Chatbot",
            description: "An intelligent chatbot leveraging natural language processing for customer support and engagement.",
            image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2106&q=80",
            technologies: [
                { name: "Python", icon: "/icons/python.svg" },
                { name: "TensorFlow", icon: "/icons/tensorflow.svg" },
                { name: "Flask", icon: "/icons/flask.svg" },
                { name: "Docker", icon: "/icons/docker.svg" },
            ],
            liveLink: "https://chatbot-example.com",
            githubLink: "https://github.com/yourusername/ai-chatbot-project",
            favorite: false
        },
        // Add more projects as needed
    ]
};

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4">
            <div className={`container mx-auto ${sans3.className}`}>
                {children}
            </div>
        </div>
    );
};


const FeaturedProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <div className="relative h-96 w-full">
            <Image 
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 rounded-lg"></div>
            <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white mb-4">{project.description}</p>
                <div className="flex space-x-4">
                    {project.liveLink && (
                        <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition-colors">Demo</button>
                        </Link>
                    )}
                    {project.githubLink && (
                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">GitHub</button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            className={`mb-8 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 ${isExpanded ? 'scale-105' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="relative h-48 overflow-hidden">
                <Image 
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{project.title}</h3>
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        className="p-4 bg-gray-700"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="text-xs bg-yellow-400 bg-opacity-20 rounded-full px-2 py-1 text-yellow-400">
                                    {tech.name}
                                </span>
                            ))}
                        </div>
                        <div className="flex space-x-4">
                            {project.liveLink && (
                                <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                                    <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-500 transition-colors">Demo</button>
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                    <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors">GitHub</button>
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const featuredProjects = projects.filter(project => project.favorite);

    return (
        <Container>
            <motion.h1 
                className="text-5xl font-bold mb-16 text-center text-white relative"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                My Projects
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-yellow-400"></span>
            </motion.h1>

            {/* Карусель с избранными проектами */}
            {featuredProjects.length > 0 && (
                <div className="mb-16">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000 }}
                        className="h-96"
                    >
                        {featuredProjects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <FeaturedProjectCard project={project} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* Сетка всех проектов */}
            <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <ProjectCard 
                            project={project} 
                            index={index}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </Container>
    );
};

const ProjectsPage: React.FC = () => {
    return <Projects {...mockData} />;
};

export default ProjectsPage;

