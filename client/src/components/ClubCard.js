import React from "react";
import { Link } from "react-router-dom";
import { saveClub } from "../api/clubs.js";

function ClubCard({ id, name, type, isAccepting, pictureUrl, recruitmentProcess }) {
    const handleSave = async () => {
        try {
            const response = await saveClub(id);
            alert(response.data.message || "Club saved successfully!");
        } catch (error) {
            alert(error.response?.data?.error || "Failed to save the club.");
        }
    };

    return (
        <div className="block">
            <Link to={`/clubs/${id}`} className="block">
                <div className="bg-white shadow-md rounded-lg overflow-hidden w-60 mx-auto">
                    <img src={pictureUrl} alt={name} className="h-40 w-full object-cover" />
                    <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{name}</h2>
                        <p className="text-sm text-gray-600">
                            <strong>Type:</strong> {type}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Accepting:</strong> {isAccepting ? "Yes" : "No"}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Recruitment Process:</strong> {recruitmentProcess}
                        </p>
                    </div>
                </div>
            </Link>
            <button
                onClick={handleSave}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block mx-auto"
            >
                Save
            </button>
        </div>
    );
}

export default ClubCard;
