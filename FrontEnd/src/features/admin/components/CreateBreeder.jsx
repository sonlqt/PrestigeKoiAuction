import React, { useState } from "react";
import api from "../../../config/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBreeder = () => {
  const [breederName, setBreederName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const accessToken = localStorage.getItem("accessToken"); // Get the access token

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const requestBody = {
      breederName,
      location,
      account: {
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
      },
    };

    try {
      const response = await api.post("/manager/createBreeder", requestBody, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the access token
        },
      });
      const { status } = response.data;
      const { message } = response.data;
      if (status === 8) {
        toast.success(message);
        // Clear form fields
        setBreederName("");
        setLocation("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setPhoneNumber("");
      } else if (status === 3) {
        toast.error(message);
        // Clear form fields
        setBreederName("");
        setLocation("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setPhoneNumber("");
      }
    } catch (error) {
      toast.error(
        "Error creating breeder: " +
          (error.response?.data?.message || error.message)
      );
      // Clear form fields
      setBreederName("");
      setLocation("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setPhoneNumber("");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const validatePhoneNumber = (value) => {
    const phonePattern = /^[0-9]{10}$/; // Adjust pattern as needed for your requirements
    if (!phonePattern.test(value)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");
    }
  };

  const validateName = (value, fieldName) => {
    const namePattern = /^[a-zA-Z]+$/;
    if (!namePattern.test(value)) {
      fieldName === "firstName"
        ? setFirstNameError("Please enter a valid name.")
        : setLastNameError("Please enter a valid name.");
    } else {
      fieldName === "firstName" ? setFirstNameError("") : setLastNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value);
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstName(value);
    validateName(value, "firstName");
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastName(value);
    validateName(value, "lastName");
  };

  return (
    <div className="max-w-fit mx-auto mt-24 ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-200 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create New Breeder
        </h2>
        <div className="mb-2">
          <label
            htmlFor="breederName"
            className="block mb-1 text-sm font-medium"
          >
            Breeder Name:
          </label>
          <select
            id="breederName"
            value={breederName}
            onChange={(e) => setBreederName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a breeder</option>
            <option value="Marushin">Marushin</option>
            <option value="NND">NND</option>
            <option value="Saki">Saki</option>
            <option value="Torazo">Torazo</option>
            <option value="Shinoda">Shinoda</option>
            <option value="Maruhiro">Maruhiro</option>
            <option value="Kanno">Kanno</option>
            <option value="Izumiya">Izumiya</option>
            <option value="Isa">Isa</option>
            <option value="Dainichi">Dainichi</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-x-1.5">
          <div className="mb-2">
            <label
              htmlFor="location"
              className="block mb-1 text-sm font-medium"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-sm font-medium"
            >
              Phone Number:
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneChange}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {phoneError && (
              <p className="text-red-500 text-sm mt-1">{phoneError}</p>
            )}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {emailError && (
            <p className="text-red-500 text-sm mt-1">{emailError}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-x-1.5">
          <div className="mb-2">
            <label
              htmlFor="firstName"
              className="block mb-1 text-sm font-medium"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {firstNameError && (
              <p className="text-red-500 text-sm mt-1">{firstNameError}</p>
            )}
          </div>

          <div className="mb-2">
            <label
              htmlFor="lastName"
              className="block mb-1 text-sm font-medium"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {lastNameError && (
              <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
            )}
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition duration-200"
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? "Loading..." : "Create Breeder"}{" "}
          {/* Toggle button text */}
        </button>
      </form>
      <ToastContainer /> {/* Toast container for notifications */}
    </div>
  );
};

export default CreateBreeder;
