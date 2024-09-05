'use client';

import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import { FaBell, FaFileExport, FaHandshake } from 'react-icons/fa';
import gsap from 'gsap';
import { Inter } from 'next/font/google';
import RoomTable from './RoomTable';
import ReactApexChart from 'react-apexcharts';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { LuUserCheck } from 'react-icons/lu';
import { TbScreenShareOff } from 'react-icons/tb';

// Lazy loading components for performance
const AddBooking = lazy(() => import('./AddRoom'));
const EditRoom = lazy(() => import('./EditRoom'));
const PreviewRoom = lazy(() => import('./PreviewRoom'));
const PreviewRoom2 = lazy(() => import('./PreviewRoom2'));

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

const Rooms = ({ role }) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [openPreview2, setOpenPreview2] = useState(false);

     const toggleOpenCreateModal = useCallback(() => setOpenCreate(prev => !prev), []);
    const toggleOpenEditModal = useCallback(() => setOpenEdit(prev => !prev), []);
    const toggleOpenPreviewModal = useCallback(() => setOpenPreview(prev => !prev), []);
    const toggleOpenPreviewModal2 = useCallback(() => setOpenPreview2(prev => !prev), []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    ".greeting",
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1 }
                );
                gsap.fromTo(
                    ".chart-container",
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
                );
                gsap.fromTo(".card1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });

            });
            return () => ctx.revert();
        }
    }, []);
    const Card = ({ icon: Icon, label, h1, value, colorClass, colorIcon }) => (
        <div className={`card1 flex flex-col w-36 items-start rounded-lg ps-2 py-2 shadow-md ${colorClass}`}>
            <div className={`h-8 w-8 my-3 flex justify-center items-center rounded-full ${colorIcon}`}>
                <Icon size={20} className="text-white" />
            </div>
            <div>
                <h3 className="font-bold text-red-500">{h1}</h3>
                <p className="-my-1 font-bold font-sans text-gray-500">{label}</p>
                <p className="font-bold font-sans text-sm">{value}</p>
            </div>
        </div>
    );

    // Chart options
    const chartOptions = {
        chart: { id: "visitor-insights" },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            title: { text: "Month" },
        },
    };

     const series = [
        { name: "Empty Room", data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 145, 160, 175] },
        { name: "Book Room", data: [20, 30, 25, 40, 45, 50, 55, 65, 80, 95, 105, 115] },
    ];

    return (
        <div className={`flex justify-between font-sans ${inter.className}`}>
            <div className='flex font-sans flex-col w-full'>
                <div>
                    <div className="animate-context">
                        <div className="flex justify-between items-center bg-white p-4">
                            <h3 className="flex items-center gap-3 font-bold greeting">
                                Rooms <FaHandshake size={32} />
                            </h3>
                            <form className="flex items-center gap-2" aria-label="Search Form">
                                <label htmlFor="search-room" className="sr-only">Search Rooms</label>
                                <input
                                    id="search-room"
                                    type="text"
                                    placeholder="Search..."
                                    className="border-gray-300 p-2 border rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="p-2 rounded-lg text-yellow-400"
                                    onClick={toggleOpenCreateModal}
                                    aria-label="Notifications"
                                >
                                    <FaBell size={24} />
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col xl:flex-row lg:flex-row items-center gap-4 w-full p-4">
                            <div className="flex-1">
                                <div className="bg-white shadow-md py-4 rounded-3xl xl:w-[43.8vw] lg:w-[33vw] pe-5 ps-4">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-bold">Today’s Sales</h3>
                                            <h4 className="font-sans text-gray-400">Sales Summary</h4>
                                        </div>
                                        <button className="flex justify-around items-center gap-3 border-2 px-3 py-2 border-blue-300 rounded-3xl w-28 h-full" aria-label="Export Data">
                                            <FaFileExport /> Export
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-12">
                                        <Card
                                            icon={AiOutlineUsergroupAdd}
                                            label="Total Sales"
                                            h1="1k$"
                                            value="+8% from yesterday"
                                            colorClass="bg-red-100"
                                            colorIcon="bg-[#FA5A7D]"
                                        />
                                        <Card
                                            icon={LuUserCheck}
                                            label="Total Booking"
                                            h1="300$"
                                            value="+5% from yesterday"
                                            colorClass="bg-[#FFF4DE]"
                                            colorIcon="bg-[#FF947A]"
                                        />
                                        <Card
                                            icon={AiOutlineUsergroupAdd}
                                            label="Cancel Booking"
                                            h1="5$"
                                            value="+3% from yesterday"
                                            colorClass="bg-[#F8B5B5]"
                                            colorIcon="bg-red-500"
                                        />
                                        <Card
                                            icon={TbScreenShareOff}
                                            label="New Booking"
                                            h1="400$"
                                            value="+2% from yesterday"
                                            colorClass="bg-[#F3E8FF]"
                                            colorIcon="bg-[#BF83FF]"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white shadow-md chart-container py-3 rounded-2xl w-[90vw] xl:w-[30vw] lg:w-[30vw] md:w-[80vw] px-8">
                                <h3 className="mb-4 font-bold text-lg">Reserved rooms / Empty rooms</h3>
                                <ReactApexChart options={chartOptions} series={series} type="line" height={200} />
                            </div>
                        </div>
                    </div>
                    <RoomTable
                        openEdit={toggleOpenEditModal}
                        openPreview={toggleOpenPreviewModal}
                        openCreate={toggleOpenCreateModal}
                    />
                    <Suspense fallback={<div>Loading...</div>}>
                        {openCreate && <AddBooking closeModal={toggleOpenCreateModal} modal={openCreate} role={role} />}
                        {openEdit && <EditRoom closeModal={toggleOpenEditModal} modal={openEdit} role={role} />}
                        {openPreview && (
                            <PreviewRoom
                                closeModal={() => setOpenPreview(false)}
                                openPreview2={toggleOpenPreviewModal2}
                            />
                        )}
                        {openPreview2 && <PreviewRoom2 closeModal={() => setOpenPreview2(false)} />}
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default React.memo(Rooms);
