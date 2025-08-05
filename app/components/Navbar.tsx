"use client";

import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [isAuth, setIsAuth] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const handleAuthToggle = () => {
        setIsAuth(!isAuth);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navItems = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.href.substring(1)));
            const scrollPosition = window.scrollY + 150;

            sections.forEach(section => {
                if (section && scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl mx-auto px-6 py-3 rounded-2xl shadow-lg backdrop-blur-lg z-50">
            <div className="flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center ">
                    <h1 className="text-3xl font-extrabold text-white">
                        s<span className="text-[#a9e14e]">V</span>d
                    </h1>
                    {/* <span className="ml-2 text-sm text-slate-400 hidden sm:block">Labs</span> */}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-1">
                    <ul className="flex space-x-1">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className={`px-4 py-2 text-slate-300 font-semibold hover:text-white rounded-lg transition-all duration-300 relative ${
                                        activeSection === item.href.substring(1) ? 'text-white' : ''
                                    }`}
                                >
                                    {item.name}
                                    {activeSection === item.href.substring(1) && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#e6e635] rounded-full" />
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Auth Button & Mobile Menu Button */}
                <div className="flex items-center space-x-4">
                    {/* Auth Button */}
                    <button
                        onClick={() => { window.location.href = "/join"; }}
                        className={`px-6 py-2 rounded-3xl font-bold transition-all duration-300 ${
                            isAuth
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'font-bold  bg-[#a9e14e] hover:bg-amber-600 text-slate-900'
                        }`}
                    >
                        {isAuth ? 'Logout' : 'Join Now'}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-slate-300 hover:text-white p-2"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16m-7 6h7" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="mt-4 pt-4 border-t border-slate-700">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <a
                                    href={item.href}
                                    className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-200"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}