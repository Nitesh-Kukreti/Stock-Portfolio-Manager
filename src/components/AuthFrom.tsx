import React from "react";
import Link from "next/link";

interface AuthFormProps {
  type: "signin" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const isSignIn = type === "signin";

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-100">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {isSignIn ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {isSignIn
            ? "Enter your details to access your portfolio"
            : "Start tracking your stocks today"}
        </p>
      </div>

      <form className="space-y-4">
        {!isSignIn && (
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
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
            placeholder="name@example.com"
            className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          {isSignIn ? "Sign In" : "Get Started"}
        </button>
      </form>

      <div className="text-center text-sm text-slate-600">
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
