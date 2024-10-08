 import { Tajawal } from "next/font/google";
import Dashboard from "./dashboard/page";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${tajawal.className} flex font-sans`}>
        <Dashboard />
        {children}
      </body>
    </html>
  );
}
