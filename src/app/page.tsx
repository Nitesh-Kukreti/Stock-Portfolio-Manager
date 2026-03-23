import Link from "next/link";
import React from "react";
import { TrendingUp, PieChart, ShieldCheck, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Hero Section */}
      <header className="px-6 py-16 md:py-24 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">
          Now supporting Real-Time NASDAQ Data
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Master Your Wealth, <br /> One Trade at a Time.
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
          The all-in-one portfolio tracker that gives you deep insights into
          your investments, dividend growth, and risk distribution.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href={"signup"}>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              Get Started Free <ArrowRight size={18} />
            </button>
          </Link>
          <button className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
            View Demo
          </button>
        </div>
      </header>

      {/* Feature Section */}
      <section className="px-6 py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-start">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-4">
                <TrendingUp size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
              <p className="text-slate-600">
                Visualize your gains and losses with interactive charts and
                automated daily benchmarks.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mb-4">
                <PieChart size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">
                Diversification Analysis
              </h3>
              <p className="text-slate-600">
                See your asset allocation by sector, market cap, or country to
                ensure a balanced risk profile.
              </p>
            </div>

            <div className="flex flex-col items-start">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl mb-4">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-slate-600">
                Your financial data is encrypted. We focus on tracking your
                numbers, not your identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust Banner */}
      <footer className="py-12 text-center text-slate-500 text-sm">
        <p>© 2026 StockFolio Inc. Built with Next.js and Tailwind CSS.</p>
      </footer>
    </div>
  );
}
