// app/dashboard/page.jsx
'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { FaStore, FaSitemap, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../images/Logo-green 1.svg'; // Adjust path as needed

const routes = [
    { path: '/', name: 'Dashboard', icon: <FaSitemap /> },
    { path: '/bookings', name: 'New bookings', icon: <FaUser /> },
    { path: '/rooms', name: 'Rooms', icon: <FaStore /> },
    { path: '/requests', name: 'Requests', icon: <FaStore /> },
    { path: '/hotels', name: 'Hotels', icon: <FaStore /> },
    { path: '/sign', name: 'Sign out', icon: <FaSignOutAlt /> },
];

const Dashboard = ({ children }) => {
    const [activeLink, setActiveLink] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const memoizedRoutes = useMemo(() => routes, []);

    const handleLinkClick = useCallback((index) => {
        setActiveLink(index);
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    }, []);

    useEffect(() => {
        gsap.timeline()
            .fromTo('.aside-content', { opacity: 0, y: -100 }, { opacity: 1, y: 0, duration: 0.5 })
            .fromTo('.content', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.2");
    }, []);

    return (
        <div className="h-screen font-sans">
            <button
                className="fixed top-4 left-4 z-50 lg:hidden text-gray-600"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-expanded={isSidebarOpen}
                aria-label="Toggle sidebar"
            >
                {isSidebarOpen ? <FiX size={28} className="relative top-4 left-48 gap-3 bg-green-300" /> : <FiMenu size={24} />}
            </button>

            <aside
                role="navigation"
                className={`fixed top-0 left-0 h-screen bg-white shadow-md p-4 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:w-60 md:w-60`}
            >
                <div>
                    <div className="flex justify-evenly md:justify-start items-end my-3 font-bold text-3xl aside-content">
                        <Image src={logo} alt="Zayer Logo" width={70} height="auto" className="lg:block relative -top-5 sm:hidden shadow-gray-200 shadow-md rounded-full" />
                        <span className="text-[#151D48] text-5xl">Zayer</span>
                    </div>
                    <nav>
                        {memoizedRoutes.map((item, index) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`content font-sans no-underline text-lg text-gray-600 tracking-wider flex items-center w-full px-3 py-2 mb-3 rounded-md ${activeLink === index ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'}`}
                                onClick={() => handleLinkClick(index)}
                            >
                                <span className="mr-2 text-xl">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            <main role="main" className="flex-1 ml-0 lg:ml-64 p-4 transition-all duration-300 ease-in-out">
                {children}  
            </main>
        </div>
    );
};

export default React.memo(Dashboard);
