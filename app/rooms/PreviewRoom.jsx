'use client';
import { X, ArrowLeft } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { MdOutlinePrivacyTip } from "react-icons/md";
import image from '../images/Frame 1430104571.svg';
import image2 from '../images/Frame 1430104571 (1).svg';
import { FaBell, FaWifi } from "react-icons/fa";
import FormText from "../form/FormText";
import debounce from "lodash.debounce";
import FormEmail from "../form/FormEmail";
import FormSelect from "../form/FormSelect";
import FormNumber from "../form/FormNumber";
import FormTextArea from "../form/FormTextArea";
import FormBtnIcon from "../form/FormBtnIcon";

export default function PreviewRoom({ closeModal }) {
    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    const [formData, setFormData] = useState({
        rating: 0,
        fullName: "",
        roomType: "",
        country: "",
        mobileNumber: "",
        email: "",
        description: "",
    });

    const handleRatingChange = useCallback((rating) => {
        setFormData(prevData => ({
            ...prevData,
            rating,
        }));
    }, []);

    const handleChange = useCallback(debounce((e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    }, 300), []);

    return (
        <div
            onClick={handleBackgroundClick}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
        >
            <div
                className="w-full max-w-4xl bg-white rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out max-h-screen overflow-y-auto"
                style={{ zIndex: 50 }}
            >
                <div className="relative text-gray-900 bg-gray-100">
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

                    <div className="bg-white shadow-md rounded-xl m-3 py-2">
                        <div className="flex justify-between items-center px-5 mb-2">
                            <div className='text-gray-500 rounded-lg bg-green-100 p-2 w-1/3'>Free Wifi</div>
                        </div>

                        <div className="flex justify-start items-center border-b-2 border-gray-400 px-5">
                            <div className='p-5'>
                                <Image className='rounded-lg' src={image} alt='hotel' width={150} height={150} />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold">Cairo Hotel Five Stars</h3>
                                <div className="flex space-x-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            onClick={() => handleRatingChange(i + 1)}
                                            className={`h-6 w-6 cursor-pointer ${i < formData.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 17.27l5.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73-1.64 7.03L12 17.27z"
                                            />
                                        </svg>
                                    ))}
                                </div>
                                <div className="text-gray-500 font-light mt-2">
                                    <h4 className='mr-2 text-green-700 font-bold'>4.5 <span className='text-black'>Good</span></h4>
                                    <span>Robert Robertson, 1234 NW</span>
                                </div>
                            </div>
                        </div>

                        <div className='my-3 px-5 flex justify-between border-b-2 border-gray-400'>
                            <div className="flex flex-col items-center">
                                <div className='text-green-500'>Check In</div>
                                <div className='font-bold'>3-8-2023</div>
                                <div className='text-gray-500'>2:30 AM</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className='text-green-500'>Check Out</div>
                                <div className='font-bold'>9-8-2023</div>
                                <div className='text-gray-500'>2:30 AM</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className='text-green-500'>Days</div>
                                <div className='font-bold'>6 Days</div>
                            </div>
                        </div>

                        <div className='flex items-center px-5 gap-2 mt-3'>
                            <MdOutlinePrivacyTip size={32} />
                            <h5 className="font-bold">Cancellation policy</h5>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-xl m-3 py-2">
                        <div className="flex justify-start items-center border-b-2 border-gray-400 px-5">
                            <div className='p-5'>
                                <Image className='rounded-lg' src={image2} alt='hotel' width={150} height={150} />
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold">Single Room</h3>
                                <div className="text-gray-500 font-light mt-2">
                                    <h4 className='mr-2 font-bold'>Space: <span className='text-green-700'>20 Metres</span></h4>
                                    <h4 className='mr-2 font-bold'>Maximum: <span className='text-green-700'>1 adult</span></h4>
                                </div>
                            </div>
                        </div>

                        <div className='my-3 flex items-center gap-3 text-center px-5'>
                            <div className="w-1/3 p-2 text-gray-700 font-bold rounded-lg bg-green-100 flex items-center gap-2">
                                <FaWifi size={24} /> Free Wifi
                            </div>
                            <div className="w-1/3 p-2 text-gray-700 font-bold rounded-lg bg-green-100 flex items-center gap-2">
                                <FaBell size={24} /> Free Breakfast
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-xl m-3 py-2">
                        <div className="border-b-2 border-gray-400 px-5">
                            <h4 className='flex justify-between my-3 font-bold'>
                                Room(2 Nights) <span className='text-green-700'>200 $</span>
                            </h4>
                            <h4 className='flex justify-between my-3 font-bold'>
                                Tax & Fees <span className='text-green-700'>0 $</span>
                            </h4>
                            <h4 className='flex justify-between my-3 font-bold'>
                                Promo Code <span className='text-green-700'>20 $</span>
                            </h4>
                        </div>

                        <h4 className='flex justify-between my-3 px-5 font-bold'>
                            Total: <span className='text-green-700'>200 $</span>
                        </h4>
                    </div>

                    <div className="bg-white shadow-md rounded-xl m-3 py-2">
                        <div className=" px-5">
                            <h3 className="font-bold mb-3">Guest Details</h3>
                            <div className="flex gap-3 items-center my-4">
                                <div className="w-1/2 md:w-1/2">
                                    <FormText
                                        label="Full Name"
                                        name="fullName"
                                        value={formData.fullName}
                                        placeholder="Enter Full Name"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormEmail
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        placeholder="Enter Email Address"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div className="w-1/2">
                                    <FormNumber
                                        label="Mobile Number"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        placeholder="+966 0123456789"
                                        required
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <FormSelect
                                        selectLabel="Country"
                                        name="country"
                                        value={formData.country}
                                        options={[
                                            { value: "country1", label: "country 1" },
                                            { value: "country2", label: "country 2" },
                                            { value: "country3", label: "country 3" },
                                        ]}
                                        handleChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>


                    </div>

                    <div className=" m-5   z-50">
                        <FormTextArea
                            label="Discount Code"
                            name="description"
                            value={formData.description}
                            placeholder="Type Your Notes Here"
                            required
                            onChange={handleChange}
                            className="shadow-md bg-white-50"
                        /></div>
                    <div className=" mx-5 pb-4 z-50">
                        <FormTextArea
                            label="Add Notes"
                            name="description"
                            value={formData.description}
                            placeholder="Type Your Notes Here"
                            required
                            onChange={handleChange}
                            className="shadow-md bg-white-50 "
                        /></div>
                    <div className=" mx-5 pb-4 z-50">
                        <FormSelect
                            selectLabel="Payment Method"
                            name="locationType"
                            value={formData.locationType}
                            options={[{ value: "cash", label: "Vodafone cash" }]}
                            handleChange={handleChange}
                            className="w-1/2"
                        />
                    </div>
                    <div className="  w-fit  mx-auto rounded-5 mt-4 mb-3 flex justify-center items-center bg-green-700">
                        <FormBtnIcon
                            label="Confirm"
                            type="submit"
                            className=" mt-6 text-center font-bold py-2  "
                        />
                    </div>
                    <div className="w-36 h-2 bg-black rounded-full mx-auto mb-5"></div>
                </div>
            </div>
        </div>
    );
}
