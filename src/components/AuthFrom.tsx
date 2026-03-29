"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { logSuccess, logError } from "@/utils/logger";
interface AuthFormProps {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const isSignIn = type === "signin";
  const router = useRouter();

  // states _______________________________
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = React.useState(false);

  // methods ______________________________
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      let response;

      if (isSignIn) {
        response = await axios.post("/api/users/signin", user);
        logSuccess("Login successful", response.data);
        router.push("/dashboard");
      } else {
        response = await axios.post("/api/users/signup", user);
        logSuccess("Signup successful", response.data);
        router.push("/signin");
      }
    } catch (error: any) {
      logError("Auth failed", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.fullName.length > 0 &&
      !isSignIn // check all the three field in case of signup
    ) {
      setButtonDisabled(false);
    } else if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      isSignIn // check two fields in case of signin
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {loading
            ? "Processing"
            : isSignIn
              ? "Welcome Back"
              : "Create Account"}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {isSignIn
            ? "Enter your details to access your portfolio"
            : "Start tracking your stocks today"}
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isSignIn && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full text-black px-4 py-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <input
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="name@example.com"
            className="w-full px-4 py-3 mt-1 border text-black rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full px-4 text-black py-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <button
          disabled={buttonDisabled}
          type="submit"
          className={`w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 ${buttonDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {isSignIn ? "Sign In" : "Get Started"}
        </button>
      </form>


      <div className="text-center text-sm text-slate-600">
        {isSignIn && (
          <Link
            href="/forgot-password"
            className="text-blue-600 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        )}

        {isSignIn ? (
          <p>
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
