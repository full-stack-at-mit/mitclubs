import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { getID } from "../api/clubs";

const ClubDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const response = await getID(id);
                setClub(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching club details:", error);
                setLoading(false);
            }
        };

        fetchClubDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center text-xl mt-10">Loading...</p>;
    }

    if (!club) {
        return <p className="text-center text-xl mt-10">Club not found.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
            <div className="w-full max-w-5xl">
                {/* Back Button */}
                <button
                    className="mb-4 px-4 py-2 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-600"
                    onClick={() => navigate("/")} // Navigate to the homepage
                >
                    ← Back to All Clubs
                </button>
                <div className="bg-white shadow-xl rounded-lg p-12">
                    <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">{club.name}</h1>
                    <p className="text-xl text-gray-700 mb-4"><strong>Type:</strong> {club.type}</p>
                    <p className="text-xl text-gray-700 mb-4"><strong>Active:</strong> {club.is_active ? "Yes" : "No"}</p>
                    <p className="text-xl text-gray-700 mb-4"><strong>Recruitment Cycle:</strong> {club.recruiting_cycle}</p>
                    <p className="text-xl text-gray-700 mb-4"><strong>Membership Process:</strong> {club.membership_process}</p>
                    <p className="text-xl text-gray-700 mb-4">
                        <strong>Email:</strong>{" "}
                        <a href={`mailto:${club.email}`} className="text-blue-500 hover:underline">
                            {club.email}
                        </a>
                    </p>
                    <p className="text-xl text-gray-700 mb-4">
                        <strong>Website:</strong>{" "}
                        <a href={club.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {club.website}
                        </a>
                    </p>
                    <p className="text-xl text-gray-700">
                        <strong>Mission:</strong> {club.mission}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClubDetails;
