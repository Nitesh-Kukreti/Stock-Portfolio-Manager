"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { logError, logSuccess, logSimple } from "@/lib/utils/logger";

export default function ChangePassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const token = searchParams.get("token");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      if (!token) {
        alert("Invalid session. Please start the OTP process again.");
        return;
      }

      const response = await axios.post("/api/user/reset-password", {
        token,
        newPassword: form.newPassword,
      });
      logSuccess("Password reset successful", response.data);
      router.push("/signin");
    } catch (error: any) {
      logError("Password reset failed", error.response?.data || error);
    }
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 p-6 border rounded-lg bg-white"
      >
        <h1 className="text-2xl font-bold text-center text-black">
          Change Password
        </h1>

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          onChange={handleChange}
          className="border p-2 rounded text-black from-neutral-600"
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="border p-2 rounded text-black from-neutral-600"
        />

        <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Update Password
        </button>
      </form>
    </main>
  );
}
