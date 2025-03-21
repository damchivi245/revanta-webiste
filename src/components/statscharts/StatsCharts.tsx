/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import TopCustomersChart from "./TopCustomerPieChart";

const fetchStats = async () => {
  try {
    const response = await api.get("/stats");
    console.log("charts", response.data.stats);
    return response.data.stats;
  } catch (error) {
    console.error("Lỗi khi lấy thống kê:", error);
    return null;
  }
};

export default function StatsCharts() {
  const [stats, setStats] = useState<any>(null);
  console.log("stats", stats);
  useEffect(() => {
    fetchStats().then((data) => setStats(data));
  }, []);

  if (!stats) return <p>Đang tải dữ liệu...</p>;

  const chartData = stats.topCustomers.map((customer: any) => ({
    email: customer.email || "Không có dữ liệu",
    totalSpent: customer.totalspent || 0,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Biểu đồ 1: Doanh thu theo tháng */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Doanh thu theo tháng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.monthlyRevenue}>
            <XAxis
              dataKey="month"
              tickFormatter={(tick) => {
                const date = new Date(tick);
                return date.getMonth() + 1 + "/" + date.getFullYear();
              }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total_revenue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ 2: Top khách hàng */}
      <div className="bg-white p-4 rounded-lg shadow">
        <TopCustomersChart chartData={chartData} />
      </div>

      {/* Biểu đồ 3: Xe được thuê nhiều nhất */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">Xe được thuê nhiều nhất</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.topRentedCar}>
            <XAxis dataKey="carId" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="_count.id" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ 4: Phương thức thanh toán phổ biến */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-3">
          Phương thức thanh toán phổ biến
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats.paymentMethodStats}
              dataKey="_count.id"
              nameKey="method"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stats.paymentMethodStats.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
