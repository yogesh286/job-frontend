import { useState } from "react";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registered successfully 😎");
      window.location.href = "/";
    } catch (err) {
      alert("Error registering ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      
      <div className="bg-gray-800 p-8 rounded-xl w-80 shadow-lg">
        
        <h2 className="text-white text-2xl mb-6 text-center">
          Register
        </h2>

        <input
          placeholder="Name"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded text-white"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have account?{" "}
          <a href="/" className="text-blue-400">
            Login
          </a>
        </p>

      </div>

    </div>
  );
}

export default Register;