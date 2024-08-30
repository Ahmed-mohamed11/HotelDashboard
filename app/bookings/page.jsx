'use client'
import React, { useCallback, useState, useEffect } from 'react';
import { FaBell, FaHandshake } from 'react-icons/fa';
 import RequestTable from './BookingTable';
 import Chart from 'react-apexcharts';
import gsap from 'gsap';
import PreviewBooking from './PreviewBooking';
import AddBooking from './AddBooking';

const Bookings = ({ role }) => {
    const [openPreview, setOpenPreview] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const toggleOpenCreateModal = useCallback(() => {
        setOpenCreate(prev => !prev);
    }, []);
    const toggleOpenPreviewModal = useCallback(() => {
        setOpenPreview(prev => !prev);
    }, []);
     const lineChartOptions = {
        chart: {
            type: 'line',
            height: 350,
        },
        series: [
            {
                name: 'Reserved Rooms',
                data: [30, 40, 35, 50, 49, 60, 70],
            },
            {
                name: 'Empty Rooms',
                data: [70, 60, 65, 50, 51, 40, 30],
            },
        ],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        title: {
            text: 'Reserved / Empty Rooms',
            align: 'left',
        },
    };

    // Donut chart options for Booking Maps by Country
    const donutChartOptions = {
        chart: {
            type: 'donut',
        },
        series: [44, 55, 13, 43, 22],
        labels: ['USA', 'Germany', 'France', 'Japan', 'India'],
        title: {
            text: 'Booking Maps by Country',
            align: 'left',
        },
    };

    // Bar chart options for Rooms Status
    const roomsOptions = {
        chart: {
            type: 'bar',
            height: 350,
        },
        xaxis: {
            categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
            title: {
                text: 'Days',
            },
        },
        yaxis: {
            title: {
                text: 'Number of Rooms',
            },
        },
        colors: ['#FF6347', '#1E90FF'],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                dataLabels: {
                    position: 'top',
                },
            },
        },
        fill: {
            type: 'solid',
        },
        title: {
            text: 'Rooms Status',
            align: 'left',
        },
    };

    const roomsSeries = [
        {
            name: 'Reserved Rooms',
            data: [120, 110, 130, 140],
        },
        {
            name: 'Empty Rooms',
            data: [50, 40, 60, 70],
        },
    ];

    useEffect(() => {
        if (typeof window !== "undefined") {
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

    return (
        <div className={`flex justify-between font-sans  w-full`}>

            <div className='flex font-sans flex-col w-full'>
                <div  >
                    <div className="animate-context">
                        <div className="flex justify-between items-center bg-white p-4">
                            <h3 className="flex items-center gap-3 font-bold font-sans greeting">
                                Bookings <FaHandshake size={32} />
                            </h3>
                            <form className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="border-gray-300 p-2 border rounded-lg"
                                />
                                <button
                                    type="button"
                                    className="p-2 rounded-lg text-yellow-400"
                                    onClick={toggleOpenCreateModal}
                                >
                                    <FaBell size={24} />
                                </button>
                            </form>
                        </div>
                        <div className='p-4 flex justify-between items-center gap-4 flex-wrap'>
                            <div className='flex-1 chart-container p-4 font-sans bg-white rounded-2xl'>
                                <Chart options={lineChartOptions} series={lineChartOptions.series} type="line" height={250} />
                            </div>

                            <div className='flex-1 chart-container font-sans align-content-center   rounded-2xl'>
                                <Chart options={donutChartOptions} series={donutChartOptions.series} type="donut" height={450} />
                            </div>

                            <div className='flex-1 chart-container font-sans p-4 bg-white rounded-2xl'>
                                <Chart
                                    options={roomsOptions}
                                    series={roomsSeries}
                                    type="bar"
                                    height={250}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <RequestTable openPreview={toggleOpenPreviewModal}
                            openCreate={toggleOpenCreateModal} />
                        <AddBooking
                            closeModal={toggleOpenCreateModal}
                            modal={openCreate}
                            role={role}
                        />
                        {openPreview && (
                            <PreviewBooking
                                closeModal={() => setOpenPreview(false)}
                            />
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Bookings;
