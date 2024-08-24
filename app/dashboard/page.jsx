import React, { useState, useMemo, useLayoutEffect } from 'react';
import { FaHome, FaStore, FaSitemap } from 'react-icons/fa';
import { FiChevronRight, FiMenu, FiX } from 'react-icons/fi'; // استيراد أيقونة X
import { gsap } from 'gsap';
import Link from 'next/link';

const routes = [
    { path: '/requests', name: 'Requests', icon: <FaSitemap /> },
    { path: '/hotels', name: 'Hotels', icon: <FaHome /> },
    { path: '/rooms', name: 'Rooms', icon: <FaStore /> },
];

const Dashboard = ({ children }) => {
    const [activeLink, setActiveLink] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const memoizedRoutes = useMemo(() => routes, []);

    const handleLinkClick = (index) => {
        setActiveLink(index);
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false); // إغلاق الشريط الجانبي تلقائيًا على الشاشات الصغيرة عند النقر على رابط
        }
    };

    useLayoutEffect(() => {
        gsap.fromTo(
            '.aside-content',
            { opacity: 0, y: -100 },
            { opacity: 1, y: 0, duration: 1 }
        );
        gsap.fromTo(
            '.content',
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1, delay: 0.5 }
        );
    }, []);

    return (
        <div className="flex font-sans h-screen">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 text-gray-600"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FiX size={28} className='relative left-48 gap-3  top-4 bg-green-300' /> : <FiMenu size={24} />} {/* تبديل الأيقونة */}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen bg-white shadow-md shadow-gray-500 p-4 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out lg:w-64 md:w-60`}>
                <div>
                    <h1 className="text-3xl aside-content flex justify-evenly font-bold mb-4 md:justify-start">
                        <FaHome className='lg:block sm:hidden' /> Dashboard
                    </h1>
                    <nav>
                        {memoizedRoutes.map((item, index) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`content font-sans text-lg text-gray-600 tracking-wider flex items-center w-full px-3 py-2 mb-2 rounded-md ${activeLink === index
                                    ? 'bg-green-500 text-white'
                                    : 'hover:bg-green-500 hover:text-white'
                                    } relative no-underline`}
                                onClick={() => handleLinkClick(index)}
                            >
                                <span className="text-xl mr-2">{item.icon}</span>
                                {item.name}
                                <span className="text-xl absolute right-5 lg:right-10">{/* تعديل المسافة بين السهم والنص */}
                                    <FiChevronRight />
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-0 lg:ml-64 p-4 transition-all duration-300 ease-in-out">
                {children}
            </main>
        </div>
    );
};

export default Dashboard;
