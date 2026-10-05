import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "বাংলাদেশ বিষয়াবলী | BCS & Job Prep",
  description: "বিসিএস এবং অন্যান্য প্রতিযোগিতামূলক পরীক্ষার জন্য বাংলাদেশ বিষয়াবলীর পূর্ণাঙ্গ প্রস্তুতি।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${inter.variable} ${notoSansBengali.variable} font-sans bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-slate-800 text-slate-300 py-6 text-center text-sm">
          <p>© {new Date().getFullYear()} বাংলাদেশ বিষয়াবলী। সকল স্বত্ব সংরক্ষিত।</p>
        </footer>
      </body>
    </html>
  );
}
