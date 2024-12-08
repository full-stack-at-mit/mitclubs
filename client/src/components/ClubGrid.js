import React, { useState, useEffect } from "react";
import ClubCard from "./ClubCard";

function ClubGrid() {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/clubs")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.statusText);
                }
                return response.json();
            })
            .then((data) => setClubs(data))
            .catch((error) => console.error("Error fetching clubs:", error));
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-white min-h-screen">
            {clubs.map((club) => (
                <ClubCard
                    key={club.club_id}
                    id={club.club_id}
                    name={club.name}
                    type={club.type}
                    isAccepting={club.is_accepting}
                    pictureUrl={club.picture_url}
                    recruitmentProcess={club.recruitment_cycle}
                />
            ))}
        </div>
    );
}

export default ClubGrid;
