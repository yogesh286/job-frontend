import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Login failed ❌");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      
      <div className="bg-gray-800 p-8 rounded-xl w-80 shadow-lg">
        
        <h2 className="text-white text-2xl mb-6 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
        >
          Login
        </button>

       
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have account?{" "}
          <a href="/register" className="text-blue-400">
            Register
          </a>
        </p>

      </div>

    </div>
  );
}

export default Login;