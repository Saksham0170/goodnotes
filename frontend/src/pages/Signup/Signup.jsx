import React, { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");

    try {
      const res = await axios.post(
        `https://goodnotes-andx.onrender.com/api/auth/signup`,
        { username: name, email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setError("");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
        setError(error.response.data.message || "Signup failed");
        console.log("Error Response:", error.response.data);
      } else {
        toast.error(error.message);
        setError(error.message);
        console.log("Error:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-28">
      <div className="w-96 border rounded bg-white px-7 py-10">
        <form onSubmit={handleSignUp}>
          <h4 className="text-2xl mb-7">Sign Up</h4>

          <input
            type="text"
            placeholder="Name"
            className="input-box"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Email"
            className="input-box"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-[#2B85FF] underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
