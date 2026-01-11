import api from "../api/axios";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(null);
  const [error, setError] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });

      // Save auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setRole(res.data.role);

      // Redirect by role
      if (res.data.role === "student") {
        window.location.href = "/student";
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white p-6 rounded w-80">
        <h2 className="text-xl mb-4 text-center font-semibold">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <input
          className="w-full p-2 mb-2 border text-black"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 border text-black"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="bg-blue-600 text-white w-full p-2 rounded"
        >
          Login
        </button>

        {/* Role Display (read-only) */}
        {role && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-bold uppercase text-blue-600">{role}</p>
          </div>
        )}
      </div>
    </div>
  );
}
