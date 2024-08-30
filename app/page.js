"use client";

import Dashboard from "./dashboard/page";
import Main from "./main/page.jsx";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen">
      <div className="flex items-center">
        <Dashboard />
        <Main />
      </div>
    </main>
  );
}
