import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-emerald-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="font-bold text-xl tracking-wider">
              বাংলাদেশ বিষয়াবলী
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/topics" className="hover:text-emerald-200 transition">
              অধ্যায়সমূহ
            </Link>
            <Link href="/quizzes" className="hover:text-emerald-200 transition">
              কুইজ
            </Link>
            <Link href="/profile" className="hover:text-emerald-200 transition">
              প্রোফাইল
            </Link>
          </div>
          <div className="flex items-center">
            <Link href="/login" className="bg-emerald-600 hover:bg-emerald-800 text-white px-4 py-2 rounded-md font-medium transition shadow-sm">
              লগইন
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
