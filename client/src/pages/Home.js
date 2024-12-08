import React, { useState } from "react";
import "../index.css";
import Layout from "../components/Layout.js";
import ClubGrid from "../components/ClubGrid.js";
import Sidebar from "../components/Sidebar.js";

const Home = () => {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="overflow-hidden h-screen">
      <Layout>
        <div className="flex">
          <Sidebar onFilterChange={handleFilterChange} />
          <div className="flex-grow">
            <ClubGrid filters={filters} />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
