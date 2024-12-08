import React, { useState } from "react";
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

const Sidebar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedMembershipProcesses, setSelectedMembershipProcesses] =
    useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedRecruitingCycles, setSelectedRecruitingCycles] = useState([]);
  const [isAcceptingOnly, setIsAcceptingOnly] = useState(false);

  const membershipProcesses = [
    "Open Membership",
    "Tryout Required",
    "Audition Required",
    "Application Required",
    "Application and Interview Required",
  ];

  const sizes = [
    "less than 20 members",
    "20 to 50 members",
    "50 to 100 members",
    "more than 100",
  ];
  const recruitingCycles = ["Unknown", "Fall Semester", "Spring Semester"];

  const toggleSelection = (selection, setSelection, item) => {
    setSelection((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange({
      membershipProcesses: selectedMembershipProcesses,
      sizes: selectedSizes,
      recruitingCycles: selectedRecruitingCycles,
      isAcceptingOnly,
    });
  };

  const handleResetFilters = () => {
    setSelectedMembershipProcesses([]);
    setSelectedSizes([]);
    setSelectedRecruitingCycles([]);
    setIsAcceptingOnly(false);
    onFilterChange({});
  };

  return (
    <div className="bg-transparent px-10 py-4 w-full h-screen overflow-y-auto">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-md focus:ring-blue-500 focus:border-blue-500"
          />
          <FaSearch className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>

      {/* Tags */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Tags</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for tags"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-md focus:ring-blue-500 focus:border-blue-500"
          />
          <FaFilter className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Filters</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for filters"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-md focus:ring-blue-500 focus:border-blue-500"
          />
          <FaFilter className="absolute top-3 right-3 text-gray-400" />
        </div>
      </div>

      {/* Ordering */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Ordering</h3>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-md focus:ring-blue-500 focus:border-blue-500">
          <option>Default</option>
          <option>Alphabetical</option>
          <option>Newest</option>
          <option>Oldest</option>
        </select>
      </div>

            {/* Membership Process */}
            <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">
          General Membership Process
        </h3>
        <div className="space-y-2">
          {membershipProcesses.map((process) => (
            <div key={process} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={process}
                checked={selectedMembershipProcesses.includes(process)}
                onChange={() =>
                  toggleSelection(
                    selectedMembershipProcesses,
                    setSelectedMembershipProcesses,
                    process
                  )
                }
                className="form-checkbox text-blue-500 h-4 w-4 align-middle"
              />
              <label
                htmlFor={process}
                className="ml-2 align-middle text-gray-700"
              >
                {process}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Size */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Size</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={size}
                checked={selectedSizes.includes(size)}
                onChange={() =>
                  toggleSelection(selectedSizes, setSelectedSizes, size)
                }
                className="form-checkbox text-blue-500 h-4 w-4 align-middle"
              />
              <label
                htmlFor={size}
                className="ml-2 align-middle text-gray-700"
              >
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Accepting Members */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Accepting Members</h3>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="accepting-only"
            checked={isAcceptingOnly}
            onChange={() => setIsAcceptingOnly(!isAcceptingOnly)}
            className="form-checkbox text-blue-500 h-4 w-4 align-middle"
          />
          <label
            htmlFor="accepting-only"
            className="ml-2 align-middle text-gray-700"
          >
            Is Accepting Members
          </label>
        </div>
      </div>

      {/* Recruiting Cycle */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Recruiting Cycle</h3>
        <div className="space-y-2">
          {recruitingCycles.map((cycle) => (
            <div key={cycle} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={cycle}
                checked={selectedRecruitingCycles.includes(cycle)}
                onChange={() =>
                  toggleSelection(
                    selectedRecruitingCycles,
                    setSelectedRecruitingCycles,
                    cycle
                  )
                }
                className="form-checkbox text-blue-500 h-4 w-4 align-middle"
              />
              <label
                htmlFor={cycle}
                className="ml-2 align-middle text-gray-700"
              >
                {cycle}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handleResetFilters}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-md"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="bg-blue-500 text-white px-3 py-1 rounded-md text-md"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Sidebar;