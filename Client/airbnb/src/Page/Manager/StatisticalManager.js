import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
} from "recharts";
import { localStorageService } from "../../services/localStorageService";
import { orderService } from "../../services/orderService";


export default function StatisticalManager() {
  const [statiscal, setStatiscal] = useState([]);
  useEffect(() => {
    const id = localStorageService.get("USER").userDTO.id;
    const getStatiscalByYear = async () => {
      try {
        const response = await orderService.getStatiscalByYear(id, 2023);
        console.log(response);
        setStatiscal(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatiscalByYear();
  }, []);
  return (
    <div className="w-full h-full ">
      <div className="headerManager font-roboto mb-5">
        <h1 className="font-bold text-[20px] uppercase ">
          Statistical Management
        </h1>
      </div>
      <AreaChart
        width={900}
        height={400}
        data={statiscal}
        margin={{ top: 10, right: 0, left: 10, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="reallyReceived"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="totalRevenue"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
}