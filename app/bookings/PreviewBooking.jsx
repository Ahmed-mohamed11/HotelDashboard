'use client';
import { useState, useCallback, memo } from 'react';
import { Plus, X } from '@phosphor-icons/react';
import { Badge, Button, Input, Label } from 'reactstrap';
import debounce from 'lodash.debounce';
import FormBtnIcon from '../form/FormBtnIcon';

const PreviewBooking =  ({ closeModal }) => {
    const [formData, setFormData] = useState({
        customerName: 'name',
        roomNumber: '50',
        customerID: '1',
        roomType: 'observed',
        country: 'Egypt',
        mobileNumber: '01032210349',
        email: 'info@gmail.com',
        hotelName: 'kiloPatra',
        checkIn: '2002-04-17',
        checkOut: '2002-04-18',
    });

    const handleChange = useCallback(
        debounce((e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }, 300),
        []
    );

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
            role="dialog"
            aria-modal="true"
        >
            <div
                className="CreateBooking font-sans fw-bold w-full bg-white rounded-lg shadow-lg fixed top-0 right-0 h-full transition-transform duration-300 ease-in-out"
                style={{ width: '40vw', zIndex: 50 }}
                aria-labelledby="booking-title"
            >
                <div className="relative text-gray-900">
                    <div className="bg-green-700 w-full flex justify-between items-center text-white p-3 mb-4 rounded-t-lg border-b">
                        <h3 id="booking-title" className="text-lg font-semibold">View Booking</h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            aria-label="Close modal"
                            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5 inline-flex items-center"
                        >
                            <X size={18} weight="bold" />
                        </button>
                    </div>
                    <form>
                        <div className="gap-4 mb-4 px-4">
                            {/* Customer Info */}
                            <div className="flex justify-between items-center gap-3">
                                <div className="w-1/2">
                                    <Label htmlFor="customerName">Customer Name</Label>
                                    <Input
                                        id="customerName"
                                        name="customerName"
                                        value={formData.customerName}
                                        placeholder="Enter Customer Name"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="roomType">Room Type</Label>
                                    <Input
                                        id="roomType"
                                        name="roomType"
                                        value={formData.roomType}
                                        placeholder="Enter Room Type"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="flex justify-between items-center gap-3 mt-3">
                                <div className="w-1/2">
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        placeholder="Enter Country"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                                    <Input
                                        id="mobileNumber"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        placeholder="+966 0123456789"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Email and Hotel */}
                            <div className="flex justify-between items-center gap-3 mt-3">
                                <div className="w-1/2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Enter Email Address"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="hotelName">Hotel Name</Label>
                                    <Input
                                        id="hotelName"
                                        name="hotelName"
                                        value={formData.hotelName}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="flex justify-between gap-3 mt-3">
                                <div className="w-1/2">
                                    <Label htmlFor="checkIn">Check In</Label>
                                    <Input
                                        id="checkIn"
                                        type="date"
                                        name="checkIn"
                                        value={formData.checkIn}
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="checkOut">Check Out</Label>
                                    <Input
                                        id="checkOut"
                                        type="date"
                                        name="checkOut"
                                        value={formData.checkOut}
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Other Info */}
                            <div className="flex justify-between items-center gap-3 my-3">
                                <div className="w-1/2">
                                    <Label htmlFor="customerID">Customer ID</Label>
                                    <Input
                                        id="customerID"
                                        name="customerID"
                                        value={formData.customerID}
                                        placeholder="Enter Customer ID"
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="roomNumber">Room Number</Label>
                                    <Input
                                        id="roomNumber"
                                        name="roomNumber"
                                        value={formData.roomNumber}
                                        placeholder="123456789"
                                        readOnly
                                    />
                                </div>
                            </div>

                            {/* Features & Guests */}
                            <div className="flex gap-4 items-center">
                                <div className="space-y-2">
                                    <Label>Features</Label>
                                    <div className="flex space-x-1">
                                        <Badge color="secondary">WIFI</Badge>
                                        <Badge color="secondary">AC</Badge>
                                        <Badge color="secondary">Free breakfast</Badge>
                                        <Badge color="secondary">VIP</Badge>
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="adults">Adults</Label>
                                    <div className="flex items-center">
                                        <Button outline>-</Button>
                                        <Input id="adults" value="2" className="text-center" readOnly />
                                        <Button outline>+</Button>
                                    </div>
                                </div>
                                <div className="w-1/3">
                                    <Label htmlFor="children">Children</Label>
                                    <div className="flex items-center">
                                        <Button outline>-</Button>
                                        <Input id="children" value="2" className="text-center" readOnly />
                                        <Button outline>+</Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center items-center gap-3 my-5">
                                <div className="rounded-3xl bg-green-700">
                                    <FormBtnIcon
                                        label="Approve"
                                        Icon={Plus}
                                        type="submit"
                                        className="w-full mt-6 text-white font-bold py-2 px-4 rounded"
                                    />
                                </div>
                                <div className="rounded-3xl bg-red-700">
                                    <FormBtnIcon
                                        label="Decline"
                                        Icon={Plus}
                                        type="submit"
                                        className="w-full mt-6 text-white font-bold py-2 px-4 rounded"
                                    />
                                </div>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default  memo(PreviewBooking);
