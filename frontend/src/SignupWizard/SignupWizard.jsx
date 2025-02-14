import React, { useState } from "react";
import RoleSelection from "./RoleSelection";
import PersonalInfo from "./PersonalInfo";
import EducationInfo from "./EducationInfo";
import ExperienceInfo from "./ExperienceInfo";
import RoleSpecificInfo from "./RoleSpecificInfo";

const SignupWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    education: [],
    experience: [],
    roleSpecific: {},
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const steps = [
    <RoleSelection nextStep={nextStep} updateFormData={updateFormData} />,
    <PersonalInfo nextStep={nextStep} previousStep={previousStep} updateFormData={updateFormData} />,
    <EducationInfo nextStep={nextStep} previousStep={previousStep} updateFormData={updateFormData} />,
    <ExperienceInfo nextStep={nextStep} previousStep={previousStep} updateFormData={updateFormData} />,
    <RoleSpecificInfo nextStep={nextStep} previousStep={previousStep} updateFormData={updateFormData} />,
  ];

  return <div className="wizard-container">{steps[step - 1]}</div>;
};

export default SignupWizard;
