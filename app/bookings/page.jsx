'use client'
import React, { useCallback, useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { FaBell, FaHandshake } from 'react-icons/fa';
import RequestTable from './BookingTable';
import Chart from 'react-apexcharts';
import gsap from 'gsap';
import DropdownUser from '../home/DropdownUser';

const PreviewBooking = lazy(() => import('./PreviewBooking'));
const AddBooking = lazy(() => import('./AddBooking'));

const Bookings = ({ role }) => {
    const [openPreview, setOpenPreview] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleOpenCreateModal = useCallback(() => {
        setOpenCreate(prev => !prev);
    }, []);

    const toggleOpenPreviewModal = useCallback(() => {
        setOpenPreview(prev => !prev);
    }, []);

    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    // Memoized chart options to prevent re-creation on each render
    const lineChartOptions = useMemo(() => ({
        chart: { type: 'line', height: 350 },
        series: [
            { name: 'Reserved Rooms', data: [30, 40, 35, 50, 49, 60, 70] },
            { name: 'Empty Rooms', data: [70, 60, 65, 50, 51, 40, 30] },
        ],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] },
        title: { text: 'Reserved / Empty Rooms', align: 'left' },
    }), []);

    const donutChartOptions = useMemo(() => ({
        chart: { type: 'donut' },
        series: [44, 55, 13, 43, 22],
        labels: ['USA', 'Germany', 'France', 'Japan', 'India'],
        title: { text: 'Booking Maps by Country', align: 'left' },
    }), []);

    const roomsOptions = useMemo(() => ({
        chart: { type: 'bar', height: 350 },
        xaxis: { categories: ['Day 1', 'Day 2', 'Day 3', 'Day 4'], title: { text: 'Days' } },
        yaxis: { title: { text: 'Number of Rooms' } },
        colors: ['#FF6347', '#1E90FF'],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 5,
                dataLabels: { position: 'top' },
            },
        },
        fill: { type: 'solid' },
        title: { text: 'Rooms Status', align: 'left' },
    }), []);

    const roomsSeries = useMemo(() => ([
        { name: 'Reserved Rooms', data: [120, 110, 130, 140] },
        { name: 'Empty Rooms', data: [50, 40, 60, 70] },
    ]), []);

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

    return (
        <main className="flex flex-col lg:flex-row w-full p-4 -mt-5">
            <section className='flex-1'>
                <header className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
                    <h3 className="flex items-center gap-3 font-bold greeting" aria-label="Bookings">
                        Bookings <FaHandshake size={32} />
                    </h3>
                    <form className="flex items-center gap-2" role="search">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="border-gray-300 p-2 border rounded-lg"
                            aria-label="Search bookings"
                        />
                        <DropdownUser />
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
                    <div className='flex-1 chart-container p-4 bg-white rounded-2xl shadow-md'>
                        <Chart options={lineChartOptions} series={lineChartOptions.series} type="line" height={250} />
                    </div>
                    <div className='flex-1 chart-container p-4 bg-white rounded-2xl shadow-md'>
                        <Chart options={donutChartOptions} series={donutChartOptions.series} type="donut" />
                    </div>
                    <div className='flex-1 chart-container p-4 bg-white rounded-2xl shadow-md'>
                        <Chart options={roomsOptions} series={roomsSeries} type="bar" height={250} />
                    </div>
                </div>
                <RequestTable openPreview={toggleOpenPreviewModal} openCreate={toggleOpenCreateModal} />
                <Suspense fallback={<div>Loading...</div>}>
                    {openCreate && <AddBooking closeModal={toggleOpenCreateModal} modal={openCreate} role={role} />}
                    {openPreview && <PreviewBooking closeModal={() => setOpenPreview(false)} />}
                </Suspense>
            </section>
        </main>
    );
};

export default React.memo(Bookings);
