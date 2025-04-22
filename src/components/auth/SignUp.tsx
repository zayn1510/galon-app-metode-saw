"use client"

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNextStep = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Final step (submit the form)
      console.log(formData);
      toast.success('Account Created Successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Implement form submission logic here
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        {/* Step Progress Indicator */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center justify-between w-full">
            {['1', '2', '3', '4'].map((num, index) => (
              <div key={num} className="relative flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl 
                    ${step >= index + 1 ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  {num}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleNextStep} className="space-y-6">
          {step === 1 && (
            <div className="form-group">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="Enter your phone number"
                pattern="^\+?[0-9]{10,15}$"
                required
              />
              <small className="text-xs text-gray-500 mt-1 block">Format: +6281234567890</small>
            </div>
          )}

          {step === 2 && (
            <div className="form-group">
              <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>
          )}

          {step === 3 && (
            <div className="form-group">
              <label htmlFor="fullName" className="text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          {step === 4 && (
            <>
              <div className="form-group">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            {step === 4 ? 'Submit' : 'Next'}
          </button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700">Login here</a>
          </p>
        </form>

        {/* Toast Container for Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
