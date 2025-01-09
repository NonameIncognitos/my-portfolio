"use client"
import React from "react";
import Image from 'next/image';
import { sans3 } from "@/app/assets/fonts";
import Link from "next/link";


interface Skill {
    name: string;
    level: number; // 1-5
    isKey: boolean;
    link?: string;
}

interface Experience {
    title: string;
    company: string;
    period: string;
    description: string;
}

interface AboutProps {
    name: string;
    title: string;
    profileImage: string;
    bio: string;
    skills: Skill[];
    experiences: Experience[];
}
interface ContainerProps {
    children: React.ReactNode;
    topPadding?: string;
}
const mockData: AboutProps = {
    name: "ASANBEK TOKTOBAEV",
    title: "Full-stack & Mobile Developer",
    profileImage: "/path/to/profile-image.jpg",
    bio: "I'm a passionate developer with a keen eye for creating elegant, efficient, and user-friendly solutions. With a strong foundation in both front-end and back-end technologies, I strive to build applications that not only meet but exceed user expectations.",
    skills: [
        { name: "React", level: 5, isKey: true, link: "/skills/react" },
        { name: "Next.js", level: 4, isKey: true, link: "/skills/nextjs" },
        { name: "JavaScript", level: 5, isKey: true, link: "/skills/javascript" },
        { name: "TypeScript", level: 4, isKey: true, link: "/skills/typescript" },
        { name: "Node.js", level: 4, isKey: true, link: "/skills/nodejs" },
        { name: "CSS", level: 5, isKey: false },
        { name: "HTML", level: 5, isKey: false },
        { name: "Tailwind CSS", level: 4, isKey: false },
        { name: "PostgreSQL", level: 4, isKey: false },
        { name: "MySQL", level: 3, isKey: false },
        { name: "MongoDB", level: 3, isKey: false },
        { name: "Firebase", level: 2, isKey: false },
        { name: "Express.js", level: 4, isKey: false },
        { name: "Nest.js", level: 3, isKey: false },
        { name: "React Native", level: 3, isKey: false },
        { name: "GraphQL", level: 3, isKey: false },
        { name: "Docker", level: 2, isKey: false },
        { name: "AWS", level: 2, isKey: false },
        { name: "Python", level: 3, isKey: false },
    ],
    experiences: [
        {
            title: "Senior Full-stack Developer",
            company: "Tech Innovators Inc.",
            period: "2020 - Present",
            description: "Leading development of scalable web applications using React, Node.js, and AWS."
        },
        {
            title: "Mobile App Developer",
            company: "MobileFirst Solutions",
            period: "2018 - 2020",
            description: "Developed cross-platform mobile applications using React Native and integrated RESTful APIs."
        }
    ]
}
const Container: React.FC<ContainerProps> = ({ children, topPadding="pt-24" }) => (
    <div className="min-h-screen bg-gradient-to-b from-gray-900  to-gray-800 text-white p-8">
        <div className={`container mx-auto ${sans3.className} ${topPadding}`}>
            {children}
        </div>
    </div>
);
const About: React.FC<AboutProps> = ({ name, title, profileImage, bio, skills, experiences }) => {
    const keySkills = skills.filter(skill => skill.isKey);
    const otherSkills = skills.filter(skill => !skill.isKey);
    const totalExperience = experiences.reduce((total, exp) => {
        const years = parseInt(exp.period.split(' - ')[1]) - parseInt(exp.period.split(' - ')[0]);
        return total + years;
    }, 0);

    return (
        <Container topPadding="pt-[200px]">
            <div className={`container mx-auto ${sans3.className}`}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* 1/4 колонка */}
                    <div className="md:col-span-1">
                        <Image 
                            src={profileImage}
                            alt={name}
                            width={200}
                            height={200}
                            className="rounded-full mx-auto mb-6 border-4 border-yellow-400"
                        />
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold mb-2">{name}</h1>
                            <p className="text-lg text-yellow-400">{title}</p>
                        </div>
                        <div className="text-center mb-6">
                            <p className="text-xl font-semibold">Total Experience</p>
                            <p className="text-3xl text-yellow-400">{totalExperience} years</p>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-yellow-400">Key Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {keySkills.map((skill, index) => (
                                    <Link href={skill.link || '#'} key={index}>
                                        <div className="bg-yellow-400 bg-opacity-20 rounded-lg p-2 text-sm">
                                            <span className="font-semibold text-yellow-400">{skill.name}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3/4 колонка */}
                    <div className="md:col-span-3">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">About Me</h2>
                            <p className="text-gray-300 leading-relaxed">{bio}</p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Experience</h2>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-lg">
                                        <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                                        <p className="text-yellow-400 mb-2">{exp.company} | {exp.period}</p>
                                        <p className="text-gray-400">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-6 text-yellow-400">Other Skills</h2>
                            <div className="flex flex-wrap gap-4">
                                {otherSkills.map((skill, index) => (
                                    <div key={index} className="bg-gray-700 rounded-lg p-3">
                                        <span className="text-sm">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </Container>
    );
}

const AboutPage: React.FC = () => {
    return <About {...mockData} />;
}

export default AboutPage;