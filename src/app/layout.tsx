import type { Metadata } from "next";
import { Inter, Anek_Bangla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "পড়ুন | পূর্ণাঙ্গ প্রস্তুতি",
  description: "যেকোনো বিষয়, অধ্যায় এবং কুইজের মাধ্যমে আপনার প্রস্তুতিকে শাণিত করুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${inter.variable} ${anekBangla.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-slate-800 text-slate-300 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} পড়ুন। সকল স্বত্ব সংরক্ষিত।</p>
        </footer>
      </body>
    </html>
  );
}
