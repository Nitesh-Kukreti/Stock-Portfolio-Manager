"use client";

import { useState } from "react";
import axios from "axios";
import { logSuccess, logError, logSimple } from "@/utils/logger";

import { sendOtp } from "@/helpers/sendOtp";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();

  const [Otp, setOtp] = useState({
    isSent: false,
    value: "",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/verify-otp", {
        email: email,
        otp: Otp.value,
        type: "RESET_PASSWORD",
      });
      logSuccess("OTP verified successfully", response.data);

      if (response.data.success) {
        router.push(`/reset-password?token=${response.data.data.token}`);
      }
    } catch (error: any) {
      logError("Forgot password Failed", error.response.data);
    }
  };

  const handleSendOtp = async (e: any) => {
    e.preventDefault();

    setOtp((prev) => ({
      ...prev,
      isSent: true,
    }));

    try {
      const response = await axios.post("/api/users/send-otp", {
        email,
        type: "RESET_PASSWORD",
      });
      logSuccess("OTP sent successfully", response);
    } catch (error: any) {
      logError("Error while sending OTP", error.response.data);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-80 p-6 border rounded-lg bg-white"
      >
        <h1 className="text-2xl font-bold text-center text-black">
          {loading ? "Processing..." : "Forgot Password"}
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded text-black from-neutral-600"
        />

        <button
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={handleSendOtp}
        >
          {Otp.isSent ? "Resent OTP" : "Send OTP"}
        </button>

        {Otp.isSent && (
          <input
            type="OTP"
            placeholder="Enter 6 digin OTP"
            value={Otp.value}
            onChange={(e) =>
              setOtp((prev) => ({
                ...prev,
                value: e.target.value,
              }))
            }
            className="border p-2 rounded text-black from-neutral-600"
          />
        )}

        {Otp.isSent && (
          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            type="submit"
          >
            Submit OTP
          </button>
        )}
      </form>
    </main>
  );
}
