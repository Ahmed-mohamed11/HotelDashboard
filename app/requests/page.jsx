'use client';
import React, { useState, useEffect, memo } from 'react';
import { FaHandshake } from 'react-icons/fa';
import { LuUserCheck } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbScreenShareOff } from "react-icons/tb";
import RequestTable from './RequestTable';
import gsap from 'gsap';
import dynamic from 'next/dynamic'; // Lazy loading dynamic import

// Lazy load Dashboard and AddHotel
const Dashboard = dynamic(() => import('../dashboard/page'), { ssr: false });
const AddHotel = dynamic(() => import('./AddHotel'), { ssr: false });

// Memoized Card component
const Card = ({ icon: Icon, label, value, colorClass }) => (
    <div className="card1 bg-white flex justify-between items-center rounded-lg p-3 shadow-md">
        <div className={`bg-green-300 h-12 w-16 flex justify-center items-center rounded-full ${colorClass}`}>
            <Icon size={32} className='text-green-900' />
        </div>
        <div>
            <p className='text-gray-400'>{label}</p>
            <h3 className='font-bold'>{value}</h3>
        </div>
    </div>
);

const Requests = ({ role }) => {
    const [openCreate, setOpenCreate] = useState(false);

    const toggleOpenCreateModal = () => {
        setOpenCreate(prev => !prev);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".greeting",
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1 }
            );
            gsap.fromTo(".card1",
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
            );
        });
        return () => ctx.revert(); // Cleanup GSAP animations on unmount
    }, []);

    return (
        <div className='flex justify-between'>
            <Dashboard />
            <div className='w-[78vw] relative right-10'>
                <h3 className='greeting flex items-center gap-3 my-4 fw-bold font-sans sm:flex justify-center sm:items-center'>
                    Hello sir <FaHandshake size={32} />
                </h3>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card icon={AiOutlineUsergroupAdd} label="Total Orders" value="5,543" />
                        <Card icon={LuUserCheck} label="Total Approved Orders" value="1,543" />
                        <Card icon={AiOutlineUsergroupAdd} label="Total Pending Orders" value="143" />
                        <Card icon={TbScreenShareOff} label="Total Rejected Orders" value="543" />
                    </div>
                </div>
                <RequestTable openCreate={toggleOpenCreateModal} />
                <AddHotel
                    closeModal={toggleOpenCreateModal}
                    modal={openCreate}
                    role={role}
                />
            </div>
        </div>
    );
}

export default React.memo(Requests);
