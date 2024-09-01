"use client";
import React, { useState, useEffect, memo } from "react";
import { FaHandshake, FaBell, FaSearch, FaFileExport } from "react-icons/fa";
import { LuUserCheck } from "react-icons/lu";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TbScreenShareOff } from "react-icons/tb";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const Dashboard = dynamic(() => import("../dashboard/page"), { ssr: false });
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Card = ({ icon: Icon, label, h1, value, colorClass, colorIcon }) => (
  <div
    className={`card1 flex flex-col w-36 items-start rounded-lg ps-2 py-2 shadow-md ${colorClass}`}
  >
    <div
      className={`h-8 w-8 my-3 flex justify-center items-center rounded-full ${colorIcon}`}
    >
      <Icon size={20} className="text-white" />
    </div>
    <div>
      <h3 className="font-bold text-red-500">{h1}</h3>
      <p className="-my-1 font-bold font-sans text-gray-500">{label}</p>
      <p className="font-bold font-sans text-sm">{value}</p>
    </div>
  </div>
);

const Main = ({ role }) => {
  const [openCreate, setOpenCreate] = useState(false);
  const { i18n } = useTranslation();

  const toggleOpenCreateModal = () => {
    setOpenCreate((prev) => !prev);
  };

  const commonChartOptions = {
    chart: {
      id: "visitor-insights",
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#008FFB", "#00E396", "#FF4560"],
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
    },
    legend: {
      position: "bottom",
    },
  };

  const chartOptions = {
    ...commonChartOptions,
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Number of Visitors",
      },
    },
  };

  const series = [
    {
      name: "New Visitors",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 145, 160, 175],
    },
    {
      name: "Returning Visitors",
      data: [20, 30, 25, 40, 45, 50, 55, 65, 80, 95, 105, 115],
    },
    {
      name: "Referrals",
      data: [10, 20, 15, 30, 35, 40, 50, 55, 65, 75, 85, 95],
    },
  ];

  const onlineOfflineOptions = {
    ...commonChartOptions,
    xaxis: {
      categories: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      title: {
        text: " ",
      },
    },
    yaxis: {
      title: {
        text: "Counts",
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#00E396", "#FF4560"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#00E396", "#FF4560"],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
  };

  const onlineOfflineSeries = [
    {
      name: "Online",
      data: [100, 120, 140, 130, 150, 170, 160],
    },
    {
      name: "Offline",
      data: [80, 90, 85, 95, 100, 110, 105],
    },
  ];

  const customerSatisfactionOptions = {
    ...commonChartOptions,
    xaxis: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      title: {
        text: "Weeks",
      },
    },
    yaxis: {
      title: {
        text: "Satisfaction (%)",
      },
    },
    colors: ["#00E396", "#FF4560"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#00E396", "#FF4560"],
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
  };

  const customerSatisfactionSeries = [
    {
      name: "This Month",
      data: [70, 75, 80, 85],
    },
    {
      name: "Last Month",
      data: [65, 70, 78, 80],
    },
  ];

  const roomsOptions = {
    ...commonChartOptions,
    xaxis: {
      categories: ["Day 1", "Day 2", "Day 3", "Day 4"],
      title: {
        text: "Days",
      },
    },
    yaxis: {
      title: {
        text: "Number of Rooms",
      },
    },
    colors: ["#FF6347", "#1E90FF"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        dataLabels: {
          position: "top",
        },
      },
    },
    fill: {
      type: "solid",
    },
  };

  const roomsSeries = [
    {
      name: "Reserved Rooms",
      data: [120, 110, 130, 140],
    },
    {
      name: "Empty Rooms",
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
          ".card1",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
        );
      });
      return () => ctx.revert();
    }
  }, []);

  const donutChartOptions = {
    chart: {
      type: "donut",
      height: 350,
    },
    title: {
      text: "Countries with Bookings",
      align: "center",
    },
    colors: ["#00E396", "#FF4560", "#008FFB", "#FFC107"],  
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} Bookings`;
        },
      },
    },
    legend: {
      position: "bottom",
    },
  };

  const donutChartSeries = [
    { name: "United States", data: 10000 },
    { name: "Canada", data: 8000 },
    { name: "Germany", data: 6000 },
    { name: "United Kingdom", data: 9000 },
    { name: "France", data: 5000 },
    { name: "Italy", data: 4000 },
    { name: "Spain", data: 3500 },
    { name: "Netherlands", data: 3000 },
    { name: "Australia", data: 2500 },
    { name: "Brazil", data: 2000 },
  ];

  const groupedBarChartOptions = {
    ...commonChartOptions,
    xaxis: {
      categories: ["City 1", "City 2", "City 3", "City 4"],
      title: {
        text: "Cities",
      },
    },
    yaxis: {
      title: {
        text: "Volume",
      },
    },
    colors: ["#00E396", "#FF4560"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
        columnWidth: "60%",
      },
    },
    fill: {
      type: "solid",
    },
  };

  const groupedBarChartSeries = [
    {
      name: "Demand Volume",
      data: [30, 50, 45, 60],
    },
    {
      name: "Service",
      data: [20, 40, 35, 50],
    },
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    tl.from(".card1", {
      duration: 0.3,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex md:flex-row flex-col -mt-5">
      <div className="flex-1 p-4 w-full">
        <div className="flex justify-between items-center   bg-white p-4">
          <h3 className="flex items-center gap-3 font-bold font-sans greeting">
            Dashboard <FaHandshake size={32} />
          </h3>
          <form className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search..."
              className="border-gray-300 p-2 border rounded-lg"
            />
            <button
              type="button"
              className=" p-2 rounded-lg text-yellow-400"
              onClick={toggleOpenCreateModal}
            >
              <FaBell size={24} />
            </button>
          </form>
        </div>
        <div className="flex flex-col xl:flex-row lg:flex-row  items-center gap-4 w-full p-4">
          <div className="flex-1">
            <div className="bg-white shadow-md py-4 rounded-3xl   xl:w-[43vw] lg:w-[33vw]  pe-5 ps-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="fw-bold font-sans">Today’s Sales</h3>
                  <h4 className="fw-bold font-sans text-gray-400">
                    Sales Summary
                  </h4>
                </div>
                <button className="flex justify-around items-center gap-3 border-2 px-3 py-2 border-blue-300 rounded-3xl w-28 h-full">
                  <FaFileExport /> Export
                </button>
              </div>
              <div className="gap-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <Card
                  icon={AiOutlineUsergroupAdd}
                  label="Total Sales"
                  h1="1k$"
                  value="+8% from yesterday"
                  colorClass="bg-red-100"
                  colorIcon="bg-[#FA5A7D]"
                />
                <Card
                  icon={LuUserCheck}
                  label="Total Booking"
                  h1="300$"
                  value="+5% from yesterday"
                  colorClass="bg-[#FFF4DE]"
                  colorIcon="bg-[#FF947A]"
                />
                <Card
                  icon={AiOutlineUsergroupAdd}
                  label="Cancel Booking"
                  h1="5$"
                  value="+3% from yesterday"
                  colorClass="bg-[#F8B5B5]"
                  colorIcon="bg-red-500"
                />
                <Card
                  icon={TbScreenShareOff}
                  label="New Booking"
                  h1="400$"
                  value="+2% from yesterday"
                  colorClass="bg-[#F3E8FF]"
                  colorIcon="bg-[#BF83FF]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center items-center  ">
            <div className="bg-white shadow-md py-3 xl:px-5 lg:px-2 rounded-2xl w-[90vw] px-3 xl:w-[28vw] lg:w-[25vw] md:w-[80vw] md:px-8">
              <h3 className="mb-4 font-bold text-lg">Visitor Insights</h3>
              <ReactApexChart
                options={chartOptions}
                series={series}
                type="line"
                height={200}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row lg:flex-row xl:flex-row gap-4">
          <div className=" my-5 ">
            <ReactApexChart
              options={onlineOfflineOptions}
              series={onlineOfflineSeries}
              type="bar"
              height={350}
            />
          </div>
          <div className="my-5 ">
            <ReactApexChart
              options={customerSatisfactionOptions}
              series={customerSatisfactionSeries}
              type="line"
              height={350}
            />
          </div>
          <div className=" my-5  ">
            <ReactApexChart
              options={roomsOptions}
              series={roomsSeries}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 gap-4  ">
          <ReactApexChart
            options={groupedBarChartOptions}
            series={groupedBarChartSeries}
            type="bar"
            height={300}
          />
          <ReactApexChart
            options={donutChartOptions}
            series={donutChartSeries.map((entry) => entry.data)}
            type="donut"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Main);