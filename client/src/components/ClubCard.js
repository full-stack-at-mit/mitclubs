import React from "react";


function ClubCard({ name, type, isAccepting, pictureUrl, recruitmentProcess }) {
 return (
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
 );
}


export default ClubCard;


