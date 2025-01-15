"use client"

import React, { ReactNode } from "react";
import Link from "next/link";
import { sans3 } from "@/app/assets/fonts";
import { FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

interface SocialItem {
    href: string;
    icon: React.ReactNode;
    alt: string;
}

interface FooterProps {
    userEmail: string;
    userName: string;
    userDescription: string;
}

interface ContainerProps {
    children: ReactNode;
}

const mockData: FooterProps = {
    userEmail: "asan@gmail.com",
    userName: "Toktobaev Asanbek",
    userDescription: "Passionate Web Developer & Designer crafting innovative digital experiences. Transforming ideas into seamless, user-centric solutions."
};

const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {children}
            </div>
        </footer>
    );
};

const Footer: React.FC<FooterProps> = ({ userEmail, userName, userDescription }) => {
    const navigationItems = [
        { title: "Home", href: "#home" },
        { title: "About", href: "#about" },
        { title: "Projects", href: "#projects" },
        { title: "Contact", href: "#contact" },
    ];

    const socialLinks: SocialItem[] = [
        { href: "#", icon: <FaLinkedin className="w-6 h-6" />, alt: "Linkedin" },
        { href: "#", icon: <FaTelegram className="w-6 h-6" />, alt: "Telegram" },
        { href: "#", icon: <FaGithub className="w-6 h-6" />, alt: "Github" },
    ];

    return (
        <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Логотип и описание */}
                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={`${sans3.className} uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600`}>
                        {userName}
                    </h2>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        {userDescription}
                    </p>
                </motion.div>

                {/* Навигация */}
                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h3 className="text-xl font-semibold text-yellow-400">Quick Links</h3>
                    <nav className="flex flex-col space-y-2">
                        {navigationItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                whileHover={{ x: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-gray-300 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    {item.title}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </motion.div>

                {/* Контакты и социальные ссылки */}
                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <h3 className="text-xl font-semibold text-yellow-400">Connect</h3>
                    <p className="text-sm text-gray-300">Stay in touch with us:</p>
                    <div className="flex space-x-4">
                        {socialLinks.map((social, index) => (
                            <motion.div
                                key={social.alt}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Link
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
                                >
                                    {social.icon}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <p className="text-sm text-gray-300">
                        Email: <a href={`mailto:${userEmail}`} className="text-yellow-400 hover:underline">{userEmail}</a>
                    </p>
                </motion.div>
            </div>

            {/* Копирайт */}
            <motion.div 
                className="mt-16 pt-8 border-t border-gray-800 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <p className="text-sm text-gray-400">
                    &copy; {new Date().getFullYear()} {userName}. All rights reserved.
                </p>
                <p className="mt-2 text-xs text-gray-500">
                    Crafted with ❤️ and ☕ in Kyrgyzstan
                </p>
            </motion.div>
        </Container>
    );
};

const FooterPage: React.FC = () => {
    return <Footer {...mockData} />;
};

export default FooterPage;