"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { sans3 } from "@/app/assets/fonts";
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    navigationItems: { title: string; href: string }[];
    socialLinks: { href: string; icon: string; alt: string }[];
    selectedLanguage: string;
    isLanguageMenuOpen: boolean;
    toggleLanguageMenu: () => void;
    handleLanguageChange: (lang: string, e: React.MouseEvent) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    isMenuOpen,
    toggleMenu,
    navigationItems,
    socialLinks,
    selectedLanguage,
    isLanguageMenuOpen,
    toggleLanguageMenu,
    handleLanguageChange
}) => {
    const mobileLanguageRef = React.useRef<HTMLDivElement>(null);

    const sidebarVariants = {
        open: { x: 0, opacity: 1 },
        closed: { x: '100%', opacity: 0 },
    };

    const itemVariants = {
        open: { opacity: 1, x: 0 },
        closed: { opacity: 0, x: 50 },
    };

    return (
        <AnimatePresence>
            {isMenuOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-md z-40"
                        onClick={toggleMenu}
                    />
                    <motion.div
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed md:hidden lg:hidden top-0 right-0 w-full max-w-[350px] h-full bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="w-full h-full flex flex-col justify-start p-8 relative">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute top-6 right-6 text-white"
                                onClick={toggleMenu}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>

                            {/* Mobile Navigation */}
                            <nav className="flex flex-col space-y-6 mt-16">
                                {navigationItems.map((item, index) => (
                                    <motion.div
                                        key={item.href}
                                        variants={itemVariants}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={toggleMenu}
                                            className="text-white text-2xl font-bold hover:text-yellow-400 transition-colors duration-300 flex items-center group"
                                        >
                                            <span className="mr-4 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                &#8594;
                                            </span>
                                            {item.title}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>
                    
                            {/* Mobile Language Selector */}
                            <motion.div 
                                ref={mobileLanguageRef} 
                                className="relative z-50 mt-12"
                                variants={itemVariants}
                            >
                                <button
                                    onClick={toggleLanguageMenu}
                                    className={`flex items-center space-x-2 text-white font-bold ${sans3.className} hover:text-yellow-400 transition-colors duration-300 text-xl`}
                                >
                                    <span>{selectedLanguage}</span>
                                    <motion.svg
                                        animate={{ rotate: isLanguageMenuOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </motion.svg>
                                </button>
                    
                                <AnimatePresence>
                                    {isLanguageMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 mt-2 bg-white rounded-md shadow-lg border border-gray-200 z-50 overflow-hidden"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="flex flex-col">
                                                {["EN", "RUS"].map((lang) => (
                                                    <button
                                                        key={lang}
                                                        onClick={(e) => handleLanguageChange(lang, e)}
                                                        className={`text-left px-6 py-3 text-gray-800 hover:bg-indigo-100 transition-colors duration-200 text-lg ${
                                                            selectedLanguage === lang
                                                                ? "bg-indigo-50 font-bold"
                                                                : ""
                                                        }`}
                                                    >
                                                        {lang}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                    
                            {/* Mobile Social Links */}
                            <motion.div 
                                className="flex space-x-6 mt-auto mb-8"
                                variants={itemVariants}
                            >
                                {socialLinks.map((social) => (
                                    <motion.div
                                        key={social.href}
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Link
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                                        >
                                            <Image
                                                src={social.icon}
                                                alt={social.alt}
                                                width={32}
                                                height={32}
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;