"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sans3 } from "@/app/assets/fonts";
import { FaLinkedin, FaGithub,  FaEnvelope, FaPhone, FaMapMarkerAlt, FaTelegram } from 'react-icons/fa';
import dynamic from 'next/dynamic';

const SkillSphere = dynamic(() => import('../helpers/SkillSphere'), { ssr: false });

const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [activeField, setActiveField] = useState<'name' | 'email' | 'message' | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const [typingEffect, setTypingEffect] = useState('');

    useEffect(() => {
        const text = "Let's work together!";
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setTypingEffect(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
    
        try {
            const response = await fetch('/api/sendFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message }),
            });
    
            if (response.ok) {
                setSubmitStatus('success');
                setName('');
                setEmail('');
                setMessage('');
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = "mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-yellow-500 focus:bg-gray-600 focus:ring-0 text-white transition duration-300 text-lg py-3 px-4";
    const labelClasses = "block text-base font-medium text-gray-300 mb-2";
    const contactInfo = [
        { icon: FaEnvelope, text: "anosvoldigoad492@gmail.com" },
        { icon: FaPhone, text: "+996 505444606" },
        { icon: FaMapMarkerAlt, text: "Bishkek, Kyrgyzstan" }
    ];

    const socialLinks = [
        { icon: FaLinkedin, url: "#contact" },
        { icon: FaGithub, url: "https://github.com/NonameIncognitos" },
        { icon: FaTelegram, url: "https://t.me/asanjs" }
    ];

    const skills = [
        'React', 'TypeScript', 'JavaScript', 'Next.js', 'Node.js',
        'CSS', 'HTML', 'Git', 'Redux', 'Zustand', 'PostgreSQL',
        'Tailwind CSS', 'MongoDB', 'Express', 'AWS', 'Docker', 'Python'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 px-4 relative overflow-hidden">
            {showConfetti && <Confetti />}
            <div className={`container mx-auto ${sans3.className}`}>
                <motion.h1 
                    className="text-6xl font-bold mb-4 text-center text-yellow-400"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    GET IN TOUCH
                </motion.h1>
                <motion.p
                    className="text-2xl text-center mb-12 text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {typingEffect}
                </motion.p>
                <div className="flex flex-col lg:flex-row justify-between items-start space-y-12 lg:space-y-0 lg:space-x-12">
                    {/* Left side - Contact Information and Map */}
                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-gray-800 rounded-lg p-6 shadow-lg mb-8">
                            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Contact Information</h2>
                            <div className="space-y-4">
                                {contactInfo.map((item, index) => (
                                    <motion.div 
                                        key={index} 
                                        className="flex items-center space-x-3"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <item.icon className="text-yellow-400" size={20} />
                                        <p className="text-lg">{item.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                        <div className="h-64 rounded-lg overflow-hidden mb-8 hidden lg:block">
                            <SkillSphere skills={skills} />
                        </div>
                        <div className="flex justify-center space-x-4">
                            {socialLinks.map((link, index) => (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-300 hover:text-yellow-400 transition duration-300"
                                    whileHover={{ scale: 1.2, rotate: 360 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <link.icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side - Contact Form */}
                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 rounded-lg p-6 shadow-lg">
                            {['name', 'email', 'message'].map((field) => (
                                <motion.div key={field} layout>
                                    <label htmlFor={field} className={labelClasses}>
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <AnimatePresence>
                                        {activeField === field && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="text-xs text-yellow-400 mt-1"
                                            >
                                                {`Please enter your ${field}`}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                    {field === 'message' ? (
                                        <textarea
                                            id={field}
                                            rows={6}
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            onFocus={() => setActiveField('message')}
                                            onBlur={() => setActiveField(null)}
                                            required
                                            className={inputClasses}
                                        />
                                    ) : (
                                        <input
                                            type={field === 'email' ? 'email' : 'text'}
                                            id={field}
                                            value={field === 'name' ? name : email}
                                            onChange={(e) => field === 'name' ? setName(e.target.value) : setEmail(e.target.value)}
                                            onFocus={() => setActiveField(field as 'name' | 'email')}
                                            onBlur={() => setActiveField(null)}
                                            required
                                            className={inputClasses}
                                        />
                                    )}
                                </motion.div>
                            ))}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </motion.div>
                            <AnimatePresence>
                                {submitStatus !== 'idle' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className={`text-center ${submitStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}
                                    >
                                        {submitStatus === 'success' ? 'Message sent successfully!' : 'Error sending message. Please try again.'}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </form>
                        
                    </motion.div>
                </div>
            </div>
            <BackgroundAnimation />
        </div>
    );
};
const Confetti: React.FC = () => {
    const [confettiPieces, setConfettiPieces] = useState<Array<{ left: string, animationDuration: string, animationDelay: string }>>([]);

    useEffect(() => {
        const pieces = [...Array(50)].map(() => ({
            left: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 5}s`
        }));
        setConfettiPieces(pieces);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none">
            {confettiPieces.map((piece, index) => (
                <div
                    key={index}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                        left: piece.left,
                        top: `-10px`,
                        animation: `fall ${piece.animationDuration} linear infinite`,
                        animationDelay: piece.animationDelay
                    }}
                />
            ))}
        </div>
    );
};

const BackgroundAnimation: React.FC = () => {
    const [particles, setParticles] = useState<Array<{ left: string, top: string, animationDuration: string, animationDelay: string }>>([]);

    useEffect(() => {
        const newParticles = [...Array(20)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${Math.random() * 4 + 2}s`,
            animationDelay: `${Math.random() * 5}s`
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle, index) => (
                <div
                    key={index}
                    className="absolute w-1 h-1 bg-yellow-400 rounded-full opacity-50"
                    style={{
                        left: particle.left,
                        top: particle.top,
                        animation: `pulse ${particle.animationDuration} ease-in-out infinite`,
                        animationDelay: particle.animationDelay
                    }}
                />
            ))}
        </div>
    );
};

export default ContactPage;