'use client';
import React, { useState, useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { FaFemale, FaMale } from "react-icons/fa";

const Charts = () => {
    const [selectedMonth, setSelectedMonth] = useState("All");

    const jobView = useMemo(() => [
        62, 76, 92, 70, 48, 72, 78, 102, 90, 82, 56, 86
    ], []);

    const jobApplied = useMemo(() => [
        52, 64, 72, 58, 42, 58, 66, 77, 66, 58, 48, 76
    ], []);

    const months = useMemo(() => [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ], []);

    const filteredData = useMemo(() => {
        if (selectedMonth === "All") return { jobView, jobApplied };
        const monthIndex = months.indexOf(selectedMonth.slice(0, 3));
        return {
            jobView: [jobView[monthIndex]],
            jobApplied: [jobApplied[monthIndex]]
        };
    }, [selectedMonth, jobView, jobApplied, months]);

    const barOptions = useMemo(() => ({
        chart: {
            type: 'bar',
            height: 300,
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 5,
            },
        },
        dataLabels: { enabled: false },
        xaxis: {
            categories: selectedMonth === "All" ? months : [selectedMonth],
            labels: { style: { colors: '#999999' } },
        },
        yaxis: { labels: { style: { colors: '#999999' } } },
        fill: { opacity: 1 },
        colors: ['#00FF0070', '#00800024'],
        legend: { show: false },
        grid: { show: false },
        tooltip: { y: { formatter: (val) => val } },
    }), [selectedMonth, months]);

    const barSeries = useMemo(() => [
        { name: 'Job Applied', data: filteredData.jobApplied },
        { name: 'Job View', data: filteredData.jobView }
    ], [filteredData]);

    const doughnutOptions = useMemo(() => ({
        chart: { type: 'donut' },
        labels: [],
        colors: ['#FF6384', '#36A2EB'],
        legend: {
            position: 'bottom',
            labels: {
                colors: '#999999',
                useSeriesColors: true,
            },
        },
        dataLabels: {
            enabled: true,
            style: { colors: ['#999999'] },
            formatter: (val, opts) => `${opts.w.globals.series[opts.seriesIndex]}%`,
        },
        tooltip: { y: { formatter: (val) => `${val}%` } },
        plotOptions: {
            pie: {
                donut: {
                    size: '70%',
                    labels: {
                        show: true,
                        total: {
                            show: true,
                            label: 'Total Requests',
                            formatter: () => '100%',
                        }
                    }
                }
            },
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: { width: 200 },
                legend: { position: 'bottom' }
            }
        }]
    }), []);

    const doughnutSeries = [35, 65];

    const tableData = useMemo(() => [
        { name: 'Hotel Sunshine', phone: '123-456-7890', email: 'info@sunshine.com', status: 'Active' },
        { name: 'Hotel Rainfall', phone: '098-765-4321', email: 'contact@rainfall.com', status: 'Inactive' },
        { name: 'Hotel Mountainview', phone: '555-123-4567', email: 'reservations@mountainview.com', status: 'Active' },
        { name: 'Hotel Seaside', phone: '444-555-6666', email: 'hello@seaside.com', status: 'Pending' },
    ], []);

    return (
        <div className="p-4 flex flex-col font-sans">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-green-700">Job Statistics</h2>
                <div className="flex items-center">
                    <select
                        className="border border-gray-300 rounded-md p-2 mr-4"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="All">All Months</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                    <div className="flex text-green-700 font-bold p-4 rounded-md">
                        <div className="w-5 h-5 bg-green-700 mx-3"></div> Job Applied
                    </div>
                    <div className="flex font-bold text-green-500 p-4 rounded-md">
                        <div className="w-5 h-5 bg-green-500 mx-3"></div> Job View
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md mb-4">
                <ReactApexChart options={barOptions} series={barSeries} type="bar" height={300} />
            </div>
            <div className="flex justify-between gap-5">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md w-3/5">
                    <table className="w-full text-center">
                        <thead className="bg-green-100">
                            <tr>
                                <th className="px-4 py-2">Hotel Name</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2">Hotel Email</th>
                                <th className="px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((hotel, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{hotel.name}</td>
                                    <td className="px-4 py-2">{hotel.phone}</td>
                                    <td className="px-4 py-2">{hotel.email}</td>
                                    <td className="px-4 py-2">{hotel.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md w-2/5">
                    <ReactApexChart options={doughnutOptions} series={doughnutSeries} type="donut" height={300} />
                    <div className="flex justify-around mt-4">
                        <div className="text-center">
                            <FaFemale className="text-4xl text-pink-500 mx-auto" />
                            <p className="text-sm mt-2">Women</p>
                        </div>
                        <div className="text-center">
                            <FaMale className="text-4xl text-blue-500 mx-auto" />
                            <p className="text-sm mt-2">Men</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
