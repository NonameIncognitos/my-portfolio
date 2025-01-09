"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sans3 } from "@/app/assets/fonts";
import { FaTelegram, FaGithub, FaLinkedin } from "react-icons/fa";


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



const Footer: React.FC<FooterProps> = ({ userEmail = "asan@gmail.com", userName = "Toktobaev Asanbek", userDescription="Passionate Web Developer & Designer crafting innovative digital experiences. Transforming ideas into seamless, user-centric solutions." }) => {
    const navigationItems = [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Projects", href: "/projects" },
        { title: "Contact", href: "/contact" },
    ];

    const socialLinks: SocialItem[] = [
        { href: "#", icon: <FaLinkedin/>, alt: "Linkedin" },
        { href: "#", icon: <FaTelegram/>, alt: "Telegram" },
        { href: "#", icon: <FaGithub />, alt: "Github" },
    ];

    return (
        <footer className="bg-gradient-to-b from-white to-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Логотип и описание */}
                    <div className="space-y-4">
                        <h2 className={`${sans3.className} uppercase text-2xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600`}>
                            {userName}
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            {userDescription}
                        </p>
                    </div>

                    {/* Навигация */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Quick Links</h3>
                        <nav className="flex flex-col space-y-2">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-600 hover:text-yellow-500 transition-colors duration-300 transform hover:translate-x-2"
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Контакты и социальные ссылки */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700">Connect</h3>
                        <p className="text-sm text-gray-600">Stay in touch with us:</p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-yellow-500 transition-colors duration-300 transform hover:scale-110"
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                        <p className="text-sm text-gray-600">
                            Email: <a href={`mailto:${userEmail}`} className="text-yellow-500 hover:underline">{userEmail}</a>
                        </p>
                    </div>
                </div>

                {/* Копирайт */}
                <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} {userName}. All rights reserved.
                    </p>
                    <p className="mt-2 text-xs text-gray-400">
                        Crafted with ❤️ and ☕ in Kyrgyzstan
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;