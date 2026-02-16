"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      router.push("/admin");
    } else {
      setError("Username atau password salah");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f0ed]">
      <div className="w-full max-w-sm mx-4">
        <div className="editorial-card">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl text-[#181313]">Admin Panel</h1>
            <p className="mt-2 text-sm text-[#8a7973]">Sahara Attire</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#8a7973] mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="luxury-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#8a7973] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="luxury-input"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full justify-center mt-6">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
