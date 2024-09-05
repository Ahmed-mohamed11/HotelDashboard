'use client';
import { useState, useCallback, memo } from "react";
import { Plus, X } from "@phosphor-icons/react";
import FormBtnIcon from "../form/FormBtnIcon";
import FormText from "../form/FormText";
import FormNumber from "../form/FormNumber";
import FormEmail from "../form/FormEmail";
import FormSelect from "../form/FormSelect";
import FormInput from "../form/FormInput";
import { Badge, Button, Input, Label } from "reactstrap";

const AddBooking =  ({ closeModal, modal }) => {
    const [formData, setFormData] = useState({
        customerName: "",
        roomNumber: "",
        customerID: "",
        roomType: "",
        country: "",
        mobileNumber: "",
        email: "",
        hotelName: "",
        checkIn: "17/4/2002",
        checkOut: "18/4/2002"
    });

    const handleChange = useCallback(
        (e) => {
            const { name, value } = e.target;
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        },
        []
    );

    const handleBackgroundClick = useCallback((e) => {
        if (e.target === e.currentTarget) closeModal();
    }, [closeModal]);

    return (
        <div
            onClick={handleBackgroundClick}
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center ${modal ? "visible" : "invisible"}`}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={`CreateBooking font-sans fw-bold w-full bg-white rounded-lg shadow-lg fixed top-0 right-0 h-full ${modal ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}
                style={{ width: '40vw', zIndex: 50 }}
            >
                <header className="bg-green-700 w-full flex justify-between items-center text-white p-3 mb-4 rounded-t-lg border-b">
                    <h3 className="text-lg font-semibold" id="addBookingTitle">Add Booking</h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5 inline-flex items-center"
                        aria-label="Close modal"
                    >
                        <X size={18} weight="bold" />
                    </button>
                </header>

                <form aria-labelledby="addBookingTitle">
                    <div className="gap-4 mb-4 px-4">
                        <div className="flex justify-between items-center gap-3">
                            <FormText
                                label="Customer Name"
                                name="customerName"
                                value={formData.customerName}
                                placeholder="Enter Customer Name"
                                required
                                onChange={handleChange}
                            />
                            <FormText
                                label="Room Type"
                                name="roomType"
                                value={formData.roomType}
                                placeholder="Enter Room Type"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-3 mt-3">
                            <FormText
                                label="Country"
                                name="country"
                                value={formData.country}
                                placeholder="Enter Country"
                                required
                                onChange={handleChange}
                            />
                            <FormNumber
                                label="Mobile Number"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                placeholder="+966 0123456789"
                                required
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-3 mt-3">
                            <FormEmail
                                label="Email"
                                name="email"
                                value={formData.email}
                                placeholder="Enter Email Address"
                                onChange={handleChange}
                            />
                            <FormSelect
                                selectLabel="Hotel Name"
                                name="hotelName"
                                value={formData.hotelName}
                                options={[
                                    { value: "hotel1", label: "Hotel 1" },
                                    { value: "hotel2", label: "Hotel 2" },
                                    { value: "hotel3", label: "Hotel 3" },
                                ]}
                                handleChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-between gap-3 mt-3">
                            <FormInput
                                label="Check In"
                                name="checkIn"
                                value={formData.checkIn}
                                required
                                type="date"
                                onChange={handleChange}
                            />
                            <FormInput
                                label="Check Out"
                                name="checkOut"
                                type="date"
                                value={formData.checkOut}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex justify-between items-center gap-3 my-3">
                            <FormText
                                label="Customer ID"
                                name="customerID"
                                value={formData.customerID}
                                placeholder="Enter Customer ID"
                                required
                                onChange={handleChange}
                            />
                            <FormNumber
                                label="Room Number"
                                name="roomNumber"
                                value={formData.roomNumber}
                                placeholder="123456789"
                                required
                                onChange={handleChange}
                            />
                        </div>

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
                                    <Button color="light" outline>-</Button>
                                    <Input id="adults" value="2" className="text-center" readOnly aria-labelledby="adultsLabel" />
                                    <Button color="light" outline>+</Button>
                                </div>
                            </div>
                            <div className="w-1/3">
                                <Label htmlFor="children">Children</Label>
                                <div className="flex items-center">
                                    <Button color="light" outline>-</Button>
                                    <Input id="children" value="2" className="text-center" readOnly aria-labelledby="childrenLabel" />
                                    <Button color="light" outline>+</Button>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center items-center gap-3 my-3">
                            <FormBtnIcon
                                label="Save"
                                Icon={Plus}
                                type="submit"
                                className="w-full mt-6 bg-green-700 text-white font-bold py-2 px-4 rounded"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default  AddBooking ;
