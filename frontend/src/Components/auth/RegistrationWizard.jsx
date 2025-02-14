import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const StepOne = ({ onNext }) => (
  <div className="wizard-step">
    <h2 className="text-xl font-bold mb-4">Step 1: Basic Info</h2>
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <input
        type="text"
        placeholder="Full Name"
        className="p-3 mb-4 w-full rounded-lg border"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Next
      </button>
    </form>
  </div>
);

const StepTwo = ({ onNext, onBack }) => (
  <div className="wizard-step">
    <h2 className="text-xl font-bold mb-4">Step 2: Account Details</h2>
    <form onSubmit={(e) => { e.preventDefault(); onNext(); }}>
      <input
        type="email"
        placeholder="Email"
        className="p-3 mb-4 w-full rounded-lg border"
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="p-3 mb-4 w-full rounded-lg border"
        required
      />
      <div className="flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
          Back
        </button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Next
        </button>
      </div>
    </form>
  </div>
);

const StepThree = ({ onBack, onFinish }) => (
  <div className="wizard-step">
    <h2 className="text-xl font-bold mb-4">Step 3: Confirmation</h2>
    <p className="mb-4">Review your information before submitting.</p>
    <div className="flex justify-between">
      <button type="button" onClick={onBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
        Back
      </button>
      <button type="button" onClick={onFinish} className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Finish
      </button>
    </div>
  </div>
);

const RegistrationWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  const finishRegistration = () => {
    navigate('/'); // Redirect to the homepage or a success page
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {step === 1 && <StepOne onNext={nextStep} />}
      {step === 2 && <StepTwo onNext={nextStep} onBack={previousStep} />}
      {step === 3 && <StepThree onBack={previousStep} onFinish={finishRegistration} />}
    </div>
  );
};

export default RegistrationWizard;
