import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Legend,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import apiservice from "../Service/apiService"; // Import API service
import "../styles/Home.css";

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [listingStats, setListingStats] = useState({});
  const [pieChartData, setPieChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const listingsData = await apiservice.fetchListings();
        const statsData = await apiservice.fetchDashboardStats();
  
        console.log("listingsData:", listingsData);
        console.log("statsData:", statsData);
  
        // Set Listings Data
        setListings(listingsData);
  
        // Dashboard Stats
        const activeListings = listingsData.filter(
          (listing) => listing.status === "available"
        );
        const premiumListings = listingsData.filter(
          (listing) => listing.salePrice >= 10000
        );
        const forRent = listingsData.filter(
          (listing) => listing.propertyType === "rent"
        );
        const forSale = listingsData.filter(
          (listing) => listing.propertyType === "buy"
        );
  
        setListingStats({
          totalUsers: statsData.totalUsers || 0,
          totalListings: statsData.totalListings || listingsData.length || 0,
          soldListings: statsData.totalSoldListings || 0,
          revenueFromSold: statsData.totalRevenue || 0,
          forSale: forSale.length || 0,
          forRent: forRent.length || 0,
          premiumListings: premiumListings.length || 0,
          activeListings: activeListings.length || 0,
        });
  
        // Prepare Line Chart Data
        const currentYear = new Date().getFullYear();
        const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
          month: new Date(currentYear, i).toLocaleString("default", {
            month: "short",
          }),
          totalListings: 0,
          activeListings: 0,
          premiumListings: 0,
        }));
  
        listingsData.forEach((listing) => {
          const createdAt = new Date(listing.createdAt); // Ensure createdAt is a valid date
          if (createdAt.getFullYear() === currentYear) {
            const monthIndex = createdAt.getMonth(); // 0-based index for the month
            monthlyStats[monthIndex].totalListings += 1;
            if (listing.status === "available") {
              monthlyStats[monthIndex].activeListings += 1;
            }
            if (listing.salePrice >= 10000) {
              monthlyStats[monthIndex].premiumListings += 1;
            }
          }
        });
  
        setLineChartData(monthlyStats);
  
        // Prepare Pie Chart Data
        setPieChartData([
          { name: "For Sale", value: forSale.length || 0 },
          { name: "For Rent", value: forRent.length || 0 },
          { name: "Premium Listings", value: premiumListings.length || 0 },
        ]);
  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const COLORS = ["#3498db", "#2ecc71", "#f39c12", "#e74c3c"];

  const imageBodyTemplate = (rowData) => (
    <img
      src={rowData.imageUrl || "src/assets/US2.jpeg"}
      alt="Property"
      className="listing-image"
    />
  );

  const statusBodyTemplate = (rowData) => (
    <Tag
      value={rowData.status}
      severity={rowData.status === "available" ? "success" : "danger"}
    />
  );

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="card-container">
        <div className="card" style={{ background: "#3498db" }}>
          <h3>Total Users</h3>
          <p>{listingStats.totalUsers || 0}</p>
        </div>
        <div className="card" style={{ background: "#2ecc71" }}>
          <h3>Total Listings</h3>
          <p>{listingStats.totalListings || 0}</p>
        </div>
        <div className="card" style={{ background: "#f39c12" }}>
          <h3>Sold Listings</h3>
          <p>{listingStats.soldListings || 0}</p>
        </div>
        <div className="card" style={{ background: "#e74c3c" }}>
          <h3>Revenue from Sold</h3>
          <p>${(listingStats.revenueFromSold || 0).toFixed(2)}</p>
        </div>
        <div className="card" style={{ background: "#f39c12" }}>
          <h3>Premium Listings</h3>
          <p>{listingStats.premiumListings || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-container">
          <h3>Listings Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="totalListings" stroke="#8884d8" />
              <Line dataKey="activeListings" stroke="#82ca9d" />
              <Line dataKey="premiumListings" stroke="#f39c12" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Property Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={60}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Listings Table */}
      <div className="table-container">
        <InputText
          value={globalFilterValue}
          onChange={(e) => setGlobalFilterValue(e.target.value)}
          placeholder="Search..."
          className="table-search"
        />
        <DataTable
          value={listings}
          paginator
          rows={10}
          globalFilter={globalFilterValue}
          loading={loading}
          responsiveLayout="scroll"
        >
          <Column field="id" header="ID" sortable />
          <Column body={imageBodyTemplate} header="Image" />
          <Column field="propertyName" header="Property Name" sortable />
          <Column field="propertyType" header="Property Type" sortable />
          <Column field="salePrice" header="Price" sortable />
          <Column field="currencyType" header="Currency" />
          <Column field="status" header="Status" body={statusBodyTemplate} sortable />
          <Column field="city" header="City" sortable />
          <Column field="state" header="State" sortable />
        </DataTable>
      </div>
    </div>
  );
};

export default HomePage;
