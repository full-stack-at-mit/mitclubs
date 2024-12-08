import React, { useState, useEffect } from "react";
import ClubCard from "./ClubCard";

function ClubGrid({ filters = {} }) {
  const [clubs, setClubs] = useState([]);
  const [savedClubs, setSavedClubs] = useState(new Set());
  const [filteredClubs, setFilteredClubs] = useState([]);

  useEffect(() => {
    // fetch all clubs
    fetch("http://localhost:8000/api/clubs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setClubs(data);
        setFilteredClubs(data);
      })
      .catch((error) => console.error("Error fetching clubs:", error));
  }, []);

  useEffect(() => {
    // fetch saved clubs for the user
    fetch("http://localhost:8000/api/saved-clubs", { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const savedClubIds = new Set(data.map((club) => club.club_id));
        setSavedClubs(savedClubIds);
      })
      .catch((error) => console.error("Error fetching saved clubs:", error));
  }, []);

  // filter clubs based on applied filters
  useEffect(() => {
    let result = clubs;

    // filter by club types
    if (filters.types && filters.types.length > 0) {
      result = result.filter((club) =>
        filters.types.some((type) =>
          (Array.isArray(club.type) ? club.type : [club.type]).includes(type)
        )
      );
    }

    // filter by member ranges
    if (filters.memberRanges && filters.memberRanges.length > 0) {
      result = result.filter((club) =>
        filters.memberRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          const memberCount = parseInt(club.membersRange.replace("+", ""));
          return max
            ? memberCount >= min && memberCount <= max
            : memberCount >= min;
        })
      );
    }

    // filter by accepting members
    if (filters.isAcceptingOnly) {
      result = result.filter((club) => club.isAccepting);
    }

    setFilteredClubs(result);
  }, [filters, clubs]);

  // split filtered clubs into two columns
  const leftColumnClubs = filteredClubs.filter((_, index) => index % 2 === 0);
  const rightColumnClubs = filteredClubs.filter((_, index) => index % 2 !== 0);

  return (
    <div className="flex flex-col h-screen overflow-y-auto px-10 bg-white">
      <h1 className="text-3xl font-bold py-6">Browse Clubs</h1>
      <div className="flex gap-6">
        {/* Left Column */}
        <div className="flex flex-col w-1/2 gap-6">
          {leftColumnClubs.map((club) => (
            <ClubCard
              key={club.club_id}
              id={club.club_id}
              name={club.name}
              type={club.type}
              isAccepting={club.isAccepting}
              pictureUrl={club.picture_url}
              description={club.mission}
              recruitmentProcess={club.recruitment_cycle}
              membersRange={club.membersRange}
              isSavedInitially={savedClubs.has(club.club_id)}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col w-1/2 gap-6">
          {rightColumnClubs.map((club) => (
            <ClubCard
              key={club.club_id}
              id={club.club_id}
              name={club.name}
              type={club.type}
              isAccepting={club.isAccepting}
              pictureUrl={club.picture_url}
              description={club.mission}
              recruitmentProcess={club.recruitment_cycle}
              membersRange={club.membersRange}
              isSavedInitially={savedClubs.has(club.club_id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClubGrid;
