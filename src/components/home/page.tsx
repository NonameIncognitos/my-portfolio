"use client"
import React from "react";
import Image from 'next/image';
import backgroundImage from "@/app/assets/unsplash_kmafxTVsfG8.svg";
import { sans3 } from "@/app/assets/fonts";
import { useRouter } from "next/navigation";

interface HomeProps {
    name: string;
    title: string;
    backgroundImage: string;
}

const HomeContent: HomeProps[] = [
    {
        name: "ASANBEK",
        title: "Full-stack & Mobile Developer",
        backgroundImage: backgroundImage,
    }
]

const Home: React.FC<HomeProps> = ({ name, title, backgroundImage }) => {

    const router = useRouter();

    const handleNavigation = (section: string) => {
        router.push(`/#${section}`);
    };
    return (
        <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
            <Image 
                src={backgroundImage}
                alt="Background"
                layout="fill"
                objectFit="cover"
                className="opacity-20"
            />

            <div className={`relative z-10 ${sans3.className} text-white text-center px-4 max-w-3xl`}>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                    <span className="text-gray-300">Hello, I'm </span>
                    <span className="text-yellow-400">{name}</span>
                </h1>
                <p className="mt-6 text-xl md:text-2xl font-light leading-relaxed text-gray-300">
                    {title}
                </p>
                <div className="mt-12 flex justify-center space-x-6">
                    <button className="px-8 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-md hover:bg-yellow-300 transition duration-300"
                        onClick={() => handleNavigation("projects")}>
                        My Work
                    </button>
                    <button className="px-8 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-md hover:bg-yellow-400 hover:text-gray-900 transition duration-300"
                        onClick={() => handleNavigation("contact")}>
                        Contact
                    </button>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <svg className="w-6 h-6 text-yellow-400 animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </div>
    );
}

const HomePage: React.FC = () => {
    return (
        <>
            {HomeContent.map((content, index) => (
                <Home key={index} {...content} />
            ))}
        </>
    );
}

export default HomePage;