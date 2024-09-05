'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { FaBell, FaHandshake, FaStar } from 'react-icons/fa';
import gsap from 'gsap';
import { Inter } from 'next/font/google';

import ReactApexChart from 'react-apexcharts';
import HotelTable from './HotelTable';
import AddHotel from './AddHotel';
import PreviewHotel from './PreviewHotel';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

const Hotels = ({ role }) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);

    const toggleOpenPreviewModal = useCallback(() => {
        setOpenPreview(prev => !prev);
    }, []);
    const toggleOpenCreateModal = useCallback(() => {
        setOpenCreate(prev => !prev);
    }, []);

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
            });
            return () => ctx.revert();
        }
    }, []);

    const hotelChartOptions = {
        chart: {
            id: "hotel-insights",
            type: 'area',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            title: {
                text: "Month",
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        colors: ['#008FFB'],
    };

    const hotelSeries = [
        {
            name: "Hotel",
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 145, 160, 175],
        },
    ];

    const newHotelChartOptions = {
        chart: {
            id: "new-hotel-insights",
            type: 'area',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
            },
        },
        stroke: {
            curve: 'smooth',
            width: 2,
        },
        xaxis: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            title: {
                text: "Month",
            },
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 90, 100]
            }
        },
        colors: ['#00E396'],
    };

    const newHotelSeries = [
        {
            name: "New Hotel",
            data: [20, 30, 25, 40, 45, 50, 55, 65, 80, 95, 105, 115],
        },
    ];

    const topRatedHotels = [
        { name: "Hotel A", count: 120, rating: 5 },
        { name: "Hotel B", count: 90, rating: 4.5 },
        { name: "Hotel C", count: 75, rating: 4 },
        { name: "Hotel D", count: 60, rating: 3.5 },
    ];

    const getRatingColor = (rating) => {
        if (rating >= 4.5) return "bg-green-500 text-white";
        if (rating >= 4) return "bg-yellow-400 text-black";
        if (rating >= 3.5) return "bg-orange-400 text-white";
        return "bg-red-500 text-white";
    };

    const getPercentageWidth = (count) => {
        const maxCount = Math.max(...topRatedHotels.map(hotel => hotel.count));
        return (count / maxCount) * 100;
    };

    return (
        <main className="flex flex-col lg:flex-row w-full p-4 -mt-5 overflow-x-auto">
            <section className='flex-1 lg:overflow-x-auto '>
                <header className="flex justify-between items-center  bg-white p-4 rounded-lg shadow-md mb-4">
                    <h3 className="flex items-center gap-3 font-bold greeting" aria-label="Requests">
                        Requests <FaHandshake size={32} />
                    </h3>
                    <form className="flex items-center gap-2  " role="search">
                        <input
                            type="text"

                            placeholder="Search..."
                            className="border-gray-300 p-2 border rounded-lg"
                            aria-label="Search bookings"
                        />
                        <button
                            type="button"
                            className="p-2 rounded-lg text-yellow-400"
                            onClick={toggleOpenCreateModal}
                            aria-label="Add new booking"
                        >
                            <FaBell size={24} />
                        </button>
                    </form>
                </header>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:grid-cols-2 gap-4 '>
                    <div className="bg-white  chart-container shadow-md p-3 rounded-2xl md:w-[45vw]  xl:w-[24vw] lg:w-[30vw] w-full">
                        <h3 className="mb-4 font-bold text-lg">Hotel</h3>
                        <ReactApexChart
                            options={hotelChartOptions}
                            series={hotelSeries}
                            type="area"
                            height={200}
                            width="100%"
                        />
                    </div>

                    <div className="bg-white shadow-md  chart-container p-3 rounded-2xl w-full md:w-[40vw] lg:w-[30vw] xl:w-[24vw]  ">
                        <h3 className="mb-4 font-bold text-lg">New Hotel</h3>
                        <ReactApexChart
                            options={newHotelChartOptions}
                            series={newHotelSeries}
                            type="area"
                            height={200}
                            width="100%"
                        />
                    </div>

                    <div className="flex flex-col justify-center items-center bg-white  chart-container  xl:w-[24vw] shadow-md px-3 pt-1 rounded-2xl w-full  ">
                        <h3 className="font-bold text-lg">Top Rated Hotels</h3>
                        <ul>
                            {topRatedHotels.map((hotel, index) => (
                                <li
                                    key={index}
                                    className="relative flex items-center px-2 py-1 mb-1 rounded-lg bg-gray-100 w-full"
                                >
                                    <div className="flex items-center">
                                        <span className="font-bold">{index + 1}.</span>
                                        <span className="ml-3 font-semibold">{hotel.name}</span>
                                    </div>
                                    <div className="flex items-center justify-between relative w-full">
                                        <div
                                            className="absolute inset-0 rounded-lg"
                                            style={{
                                                width: `${getPercentageWidth(hotel.count)}%`,
                                                backgroundColor: getRatingColor(hotel.rating),
                                                opacity: 0.3,
                                            }}
                                        ></div>
                                        ,/
                                    </div>
                                    <div className="relative z-10 flex items-center justify-between w-full">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <FaStar
                                                key={starIndex}
                                                className={`ml-1 ${hotel.rating >= starIndex + 1
                                                    ? "text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                        <div className='flex'>
                                            <span className="ml-2 font-bold flex">{hotel.rating} </span>
                                            <span>★</span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <HotelTable openPreview={toggleOpenPreviewModal}
                    openCreate={toggleOpenCreateModal} />
                <AddHotel
                    closeModal={toggleOpenCreateModal}
                    modal={openCreate}
                    role={role}
                />
                {openPreview && (
                    <PreviewHotel
                        closeModal={() => setOpenPreview(false)}
                    />
                )}

            </section>
        </main>
    );
};

export default React.memo(Hotels);


