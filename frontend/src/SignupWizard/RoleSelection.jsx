import React, { useState } from "react";

const RoleSelection = ({ nextStep, updateFormData }) => {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ role });
    nextStep();
  };

  return (
    <div className="role-selection">
      <h2>Select Your Role</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            id="recruiter"
            name="role"
            value="recruiter"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="recruiter">Recruiter</label>
        </div>
        <div>
          <input
            type="radio"
            id="job-seeker"
            name="role"
            value="job-seeker"
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="job-seeker">Job Seeker</label>
        </div>
        <button type="submit" disabled={!role}>
          Next
        </button>
      </form>
    </div>
  );
};

export default RoleSelection;
