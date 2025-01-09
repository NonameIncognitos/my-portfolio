"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sans3 } from "@/app/assets/fonts";
import Sidebar from "./Sidebar";

interface NavItem {
    title: string;
    href: string;
}

interface SocialItem {
    href: string;
    icon: string;
    alt: string;
}

interface HeaderContaierProps {
    children: React.ReactNode;
}


interface HeaderProps {
    nameUser: string;
    
}


const HeaderContainer: React.FC<HeaderContaierProps> = ({children}) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200 transition-all duration-300 ease-in-out">
            {children}
        </header>
    )
}

const Header: React.FC<HeaderProps> = ({nameUser})=> {
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = React.useState<boolean>(false);
    const [selectedLanguage, setSelectedLanguage] = React.useState<string>("EN");
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
    const [isScrolled, setIsScrolled] = React.useState<boolean>(false);
    const languageRef = React.useRef<HTMLDivElement>(null);

    const toggleLanguageMenu = () => {
        setIsLanguageMenuOpen(!isLanguageMenuOpen);
    };

    const handleLanguageChange = (lang: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedLanguage(lang);
        setIsLanguageMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
                setIsLanguageMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigationItems: NavItem[] = [
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Projects", href: "/projects" },
        { title: "Contact", href: "/contact" },
    ];

    const socialLinks:SocialItem[] = [
        { href: "#", icon: "/assets/icons/facebook.svg", alt: "Facebook" },
        { href: "#", icon: "/assets/icons/instagram.svg", alt: "Instagram" },
        { href: "#", icon: "/assets/icons/whatsapp.svg", alt: "WhatsApp" },
    ];

    return (
        <HeaderContainer>
            <div className={`mx-auto px-4 sm:px-6 lg:px-8 py-4 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <span className={`text-xl font-bold uppercase text-[16px] md:text-[25px] lg:text-[30px] ${sans3.className} text-gray-800 transition-all duration-300 ${isScrolled ? 'text-[20px] md:text-[22px] lg:text-[26px]' : ''}`}>
                            {nameUser}
                        </span>
                    </div>

                    {/* Desktop Navigation and Language Selector */}
                    <div className="hidden md:flex items-center space-x-8">
                        <nav className={`font-[700] uppercase ${sans3.className} text-[16px] lg:text-[20px] flex space-x-8 text-gray-700 items-center`}>
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="hover:text-yellow-500 transition-colors duration-300 relative group"
                                >
                                    {item.title}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </nav>
                        <div ref={languageRef} className="relative">
                            <button
                                onClick={toggleLanguageMenu}
                                className={`flex items-center uppercase space-x-2 font-bold ${sans3.className} text-gray-700 hover:text-yellow-500 transition-colors duration-300 py-1 px-2 rounded-md`}
                            >
                                <span>{selectedLanguage}</span>
                                <svg
                                    className={`w-4 h-4 transition-transform duration-200 ${isLanguageMenuOpen ? "rotate-180" : ""}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isLanguageMenuOpen && (
                                <div className="absolute top-full right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[120px] z-50">
                                    {["EN", "RUS"].map((lang) => (
                                        <button
                                            key={lang}
                                            onClick={(e) => handleLanguageChange(lang, e)}
                                            className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                                                selectedLanguage === lang ? "bg-gray-50 font-medium" : ""
                                            }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden w-[24px] h-[24px] text-gray-700 focus:outline-none relative z-50"
                        aria-label="Toggle navigation"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </button>
                </div>
            </div>


            

            {/* Sidebar Component */}
            <Sidebar
                isMenuOpen={isMenuOpen}
                toggleMenu={toggleMenu}
                navigationItems={navigationItems}
                socialLinks={socialLinks}
                selectedLanguage={selectedLanguage}
                isLanguageMenuOpen={isLanguageMenuOpen}
                toggleLanguageMenu={toggleLanguageMenu}
                handleLanguageChange={handleLanguageChange}
            />
        </HeaderContainer>
    )
}


export default Header;