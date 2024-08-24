'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { FaHandshake } from 'react-icons/fa';
import gsap from 'gsap';
import Dashboard from '../dashboard/page';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import arrow from '../images/arrow.svg';
import RoomTable from './RoomTable';
import AddBooking from './AddBooking';
import EditRoom from './EditRoom';
import PreviewRoom from './PreviewRoom';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] });

const cardData = [
    { title: 'Total Rooms', value: '5,543', unit: 'Rooms', percent: '10.0%', color: 'text-green-700', bgColor: 'bg-green-100' },
    { title: 'Reserved Rooms', value: '5,543', unit: 'Hotel', percent: '22.2%', color: 'text-green-700', bgColor: 'bg-green-100' },
    { title: 'Available Rooms', value: '543', unit: 'Rooms', percent: '12.0%', color: 'text-green-700', bgColor: 'bg-green-100' },
    { title: 'Total Orders', value: '43', unit: 'Requests', percent: '7.0%', color: 'text-red-700', bgColor: 'bg-red-100' }
];

const Rooms = ({ role }) => {
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
     const [openPreview, setOpenPreview] = useState(false);

    const toggleOpenCreateModal = useCallback(() => {
        setOpenCreate(prev => !prev);
    }, []);
    const toggleOpenEditModal = useCallback(() => {
        setOpenEdit(prev => !prev);
    }, []);
    const toggleOpenPreviewModal = useCallback(() => {
        setOpenPreview(prev => !prev);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".greeting", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 });
            gsap.fromTo(".card1", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
        }, ".animate-context");

        return () => ctx.revert();
    }, []);

    const renderedCards = useMemo(() => cardData.map((card, index) => (
        <div key={index} className="card1 bg-white flex justify-between items-center rounded-lg p-4 shadow-md">
            <div>
                <div className='flex justify-between items-center gap-3 font-mono'>
                    {card.title}
                    <span className={`${card.color} flex justify-between items-center gap-2 ${card.bgColor} px-2 rounded-full`}>
                        <Image width={20} height={20} src={arrow} alt="arrow" />
                        {card.percent}
                    </span>
                </div>
                <h3 className='font-bold font-sans'>{card.value}</h3>
                <p className='text-gray-400'>{card.unit}</p>
            </div>
        </div>
    )), []);

    return (
        <div className={`flex justify-between font-sans ${inter.className}`}>
            <Dashboard />
            <div className='w-[78vw] relative right-10'>
                <h3 className='greeting flex items-center gap-3 my-4 fw-bold font-sans'>
                    Hello sir <FaHandshake size={32} />
                </h3>
                <div className="animate-context">
                    <div className="grid grid-cols-4 gap-1 font-sans">
                        {renderedCards}
                    </div>
                </div>
                <RoomTable openEdit={toggleOpenEditModal}
                 openPreview={toggleOpenPreviewModal}
                  openCreate={toggleOpenCreateModal} />
                <AddBooking
                    closeModal={toggleOpenCreateModal}
                    modal={openCreate}
                    role={role}
                />
                <EditRoom
                    closeModal={toggleOpenEditModal}
                    modal={openEdit}
                    role={role}

                />
                {openPreview && (
                    <PreviewRoom
                        closeModal={() => setOpenPreview(false)}
                     />
                )}
            </div>
        </div>
    );
};

export default React.memo(Rooms);
