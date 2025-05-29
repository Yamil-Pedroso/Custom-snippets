import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Confetti from "react-confetti";
import { toast } from "sonner";

const Register: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatar(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (!avatar) {
      setError("Please upload an avatar");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("isAdmin", "false");
      formDataToSend.append("avatar", avatar);

      await axios.post("/auth/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData({ username: "", email: "", password: "" });
      setAvatar(null);
      setShowConfetti(true);
      toast.success(
        "User registered successfully. Redirecting to login page...",
        {
          className: "toast",
        }
      );
      setError(null);
      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      setError("Error registering user. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
        {showConfetti && <Confetti />}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">
              Username:
            </label>
            <input
              type="text"
              name="username"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-semibold text-gray-700">Avatar:</label>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              accept="image/*"
              className="px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-bold"
            >
              Register
            </button>
            <p
              className="text-orange-500 cursor-pointer text-sm underline font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
