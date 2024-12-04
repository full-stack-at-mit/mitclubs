import React from "react";
import "../index.css";
import Layout from "../components/Layout.js";
import ClubGrid from "../components/ClubGrid.js";

const Home = () => {
  return (
    <Layout>
      <h1>MIT Clubs</h1>
      < ClubGrid />
    </Layout>
  );
};

export default Home;
