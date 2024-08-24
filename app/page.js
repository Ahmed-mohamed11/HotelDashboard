"use client";
import Dashboard from "./dashboard/page";
import Hotels from "./hotels/page";
import Requests from "./requests/page";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Rooms from "./rooms/page.jsx";
 
export default function Home() {
  return (
    <Router>
      <main className="flex min-h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex w-full">
                <Dashboard />
                <div className="flex-1 p-4"></div>
              </div>
            }
          />
          <Route path="requests" element={<Requests />} />
          <Route path="hotels" element={<Hotels />} />
          <Route path="rooms" element={<Rooms />} />
        </Routes>
      </main>
    </Router>
  );
}
