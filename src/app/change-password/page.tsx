"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChangePassword() {
  const router = useRouter();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    } else if (form.currentPassword === form.newPassword) {
      alert("Current password and new passsword are same");
      return;
    }
    try {
      const response = await axios.post("/api/users/change-password", {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      console.log(
        "%c Password changed successfully ",
        "color: #00E676; font-weight: 900 ",
        response.data,
      );
      router.push("/profile");
    } catch (error: any) {
      console.log(
        "%c Failed to change password ",
        "color: red; font-weight: 900 ",
        error.response,
      );
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
          name="currentPassword"
          placeholder="Current Password"
          onChange={handleChange}
          className="border p-2 rounded text-black from-neutral-600"
        />

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
