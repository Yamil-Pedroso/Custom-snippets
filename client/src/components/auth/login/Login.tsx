import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/UserService";
import { useUserContext } from "../../../context/userContext";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(
        formData.email,
        formData.password
      );
      localStorage.setItem("authToken", token);
      setCurrentUser(user);
      toast.success("Logged in successfully", {
        className: "toast",
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md mx-auto mt-8 p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-600 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-600 mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition font-semibold"
            >
              Login
            </button>

            <p
              onClick={() => navigate("/register")}
              className="text-orange-600 font-bold underline cursor-pointer text-base hover:text-orange-700"
            >
              Register
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
