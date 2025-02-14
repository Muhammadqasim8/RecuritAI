import React, { useState } from "react";

const EducationInfo = ({ nextStep, previousStep, updateFormData }) => {
  const [education, setEducation] = useState([]);

  const handleAddEducation = () => {
    setEducation([...education, { degree: "", institution: "", year: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFormData({ education });
    nextStep();
  };

  return (
    <div className="education-info">
      <h2>Education Information</h2>
      <form onSubmit={handleSubmit}>
        {education.map((entry, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Degree"
              value={entry.degree}
              onChange={(e) => handleChange(index, "degree", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Institution"
              value={entry.institution}
              onChange={(e) => handleChange(index, "institution", e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Year"
              value={entry.year}
              onChange={(e) => handleChange(index, "year", e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddEducation}>
          Add Education
        </button>
        <div className="navigation-buttons">
          <button type="button" onClick={previousStep}>
            Back
          </button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default EducationInfo;
