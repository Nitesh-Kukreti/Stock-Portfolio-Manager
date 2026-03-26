"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  User,
  Mail,
  ShieldCheck,
  ShieldAlert,
  LogOut,
  KeyRound,
  ChevronRight,
  Camera,
  Link,
} from "lucide-react";

// Mock Data - Connect this to your backend/session
const USER_DATA = {
  fullName: "Aryan Sharma",
  email: "aryan.sharma@example.com",
  isVerified: false,
};

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/signout");
      console.log(
          "%c Logout Success ",
          "color: #00E676; font-weight: 900 ",
          response.data,
        );
        router.push("/signin");
        return response;
    } catch (error: any) {
      console.log(
        "%c Signup failed ",
        "color: #red; font-weight: 900 ",
        error.response,
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-400 p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white">Account Settings</h1>
          <p className="text-sm">
            Manage your personal information and security preferences.
          </p>
        </header>

        {/* Profile Info Card */}
        <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-zinc-700 overflow-hidden">
                <User size={40} className="text-zinc-600" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-emerald-500 text-black rounded-full hover:bg-emerald-400 transition-all shadow-lg">
                <Camera size={16} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-bold text-white mb-1">
                {USER_DATA.fullName}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                <Mail size={14} />
                <span>{USER_DATA.email}</span>
              </div>
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                USER_DATA.isVerified
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
              }`}
            >
              {USER_DATA.isVerified ? (
                <ShieldCheck size={14} />
              ) : (
                <ShieldAlert size={14} />
              )}
              {USER_DATA.isVerified ? "Verified" : "Not Verified"}
            </div>
          </div>
        </section>

        {/* Action List */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-2">
            Security
          </h3>

          <ProfileAction
            icon={<KeyRound size={20} className="text-blue-400" />}
            title="Change Password"
            description="Change your current password or request a reset link"
            onClick={() => router.push("/change-password")}
          />

          <ProfileAction
            icon={<LogOut size={20} className="text-rose-400" />}
            title="Sign Out"
            description="Securely log out of your current session"
            variant="danger"
            onClick={logout}
          />
        </div>

        {/* Conditional Verification Nudge */}
        {!USER_DATA.isVerified && (
          <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex items-start gap-4">
            <ShieldAlert className="text-amber-500 mt-1" size={20} />
            <div>
              <p className="text-sm font-bold text-amber-500">
                Action Required
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Your email is not verified. Click send code to get OTP on you
                registered email.
              </p>
              <button className="mt-2 text-xs font-bold text-white hover:underline">
                Send Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Helper Component ---

interface ActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  variant?: "default" | "danger";
}

function ProfileAction({
  icon,
  title,
  description,
  onClick,
  variant = "default",
}: ActionProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-zinc-900/30 hover:bg-zinc-800/50 border border-zinc-800 rounded-2xl transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800">
          {icon}
        </div>
        <div className="text-left">
          <p
            className={`font-bold ${variant === "danger" ? "text-rose-400" : "text-zinc-200"}`}
          >
            {title}
          </p>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
      </div>
      <ChevronRight
        size={18}
        className="text-zinc-600 group-hover:text-zinc-300 transition-transform group-hover:translate-x-1"
      />
    </button>
  );
}
