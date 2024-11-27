import React from "react";
import "../index.css";
import Layout from "../components/Layout.js";
import ClubCard from "../components/ClubCard.js";
import { getClubs } from "../api/clubs";
const { useState, useEffect } = React;

const Home = () => {
  const [clubsList, setClubsList] = useState([]); // State to store club data
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await getClubs();
        const data = response.data;
        console.log("response:", data);
        const dataList = data.clubs.map((row) => ({
          id: row.club_id,
          name: row.name,
          category: row.type,
          website: row.website,
        }));
        setClubsList(dataList); // Set fetched data
      } catch (err) {
        console.log(err.message); // Handle errors
      }
    };
    fetchClubs();
  }, []);
  console.log("HELLO");
  return (
    <Layout>
      <h1>MIT Clubs</h1>
      <div>
        {clubsList.map((club) => (
          <ClubCard
            key={club.id}
            clubName={club.name}
            clubCategory={club.category}
            website={club.website}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
