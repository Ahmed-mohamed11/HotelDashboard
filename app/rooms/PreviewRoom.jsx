'use client';
import { useState } from "react";
import { ArrowLeft,   Plus } from "@phosphor-icons/react";
import FormBtnIcon from "../form/FormBtnIcon";
import FormText from "../form/FormText";
import FormNumber from "../form/FormNumber";

export default function PreviewRoom({ closeModal, openPreview2 }) {
    const [formData, setFormData] = useState({
        roomType: "Deluxe Suite",
        roomNumber: "101",
        price: "200",
        description: "",
        currency: "USD",
    });

 
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

   
    return (
        <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end"
        >
            <div
                className="bg-gray-100 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out max-h-screen overflow-y-auto"
                style={{ width: '40vw', zIndex: 50 }}
            >
                <div className="relative text-gray-900">
                    <div className="bg-green-700 w-full flex justify-between items-center text-white p-3 mb-4 rounded-t-lg border-b">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm p-1.5 inline-flex items-center"
                        >
                            <ArrowLeft size={18} weight="bold" />
                        </button>
                        <h3 className="text-lg font-semibold mx-auto">Booking Details</h3>
                    </div>
                    <form>
                        <div className="gap-4 mb-4 px-4">
                            <div className="flex justify-between items-center gap-3">
                                <div className="w-1/2">
                                    <FormText
                                        label="Room Type"
                                        name="roomType"
                                        value={formData.roomType}
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormNumber
                                        label="Room Number"
                                        name="roomNumber"
                                        value={formData.roomNumber}
                                        readOnly
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center gap-3 mt-3">
                                <div className="w-1/3">
                                    <FormNumber
                                        label="Price"
                                        name="price"
                                        value={formData.price}
                                        readOnly
                                    />
                                </div>
                                <div className="w-1/4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900">
                                        Currency
                                    </label>
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleInputChange}
                                        className="block w-full p-2.5 border rounded-lg bg-gray-50"
                                    >
                                        <option value="USD">USD</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                    </select>
                                </div>
                                <button
                                    className="inline-flex items-center justify-center font-sans fw-bold w-fit text-md font-medium   border p-2 text-red-800 bg-red-300 hover:text-gray-800 rounded-lg"
                                    type="button"
                                    onClick={openPreview2}
                                >
                                    full reserved
                                </button>
                            </div>

                            <div className="mt-3">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    readOnly
                                    className="block w-full p-2.5 border rounded-lg bg-gray-50"
                                    placeholder="  brief description..."
                                ></textarea>
                            </div>

                            <div className="w-fit  flex justify-center items-end font-sans   mt-4 rounded-2xl bg-green-700">
                                <FormBtnIcon
                                    label="Cancel"
                                    Icon={Plus}
                                    type="button"
                                    className="w-full font-bold py-2 px-4 rounded"

                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
