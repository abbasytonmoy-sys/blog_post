"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4 font-bengali">
          আপনার পড়ার নতুন সঙ্গী
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 font-bengali">
          যেকোনো বিষয়ের সাজানো আর্টিকেল পড়ুন এবং ইন্টারেক্টিভ কুইজ দিয়ে নিজের প্রস্তুতিকে আরও শাণিত করুন।
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/topics" className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow transition font-bengali transform hover:scale-105">
            পড়া শুরু করুন
          </Link>
          <Link href="/quizzes" className="bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-600 px-6 py-3 rounded-lg font-medium shadow-sm transition font-bengali transform hover:scale-105">
            কুইজ দিন
          </Link>
        </div>
      </motion.section>

      {/* Featured Topics Preview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 font-bengali">জনপ্রিয় বিষয়সমূহ</h2>
          <Link href="/topics" className="text-emerald-600 hover:text-emerald-800 font-medium text-sm font-bengali">
            সবগুলো দেখুন &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "বাংলাদেশ বিষয়াবলী", count: "১২টি অধ্যায়", id: "bangladesh" },
            { title: "আন্তর্জাতিক বিষয়াবলী", count: "১৮টি অধ্যায়", id: "international" },
            { title: "ভূগোল ও পরিবেশ", count: "১০টি অধ্যায়", id: "geography" },
          ].map((topic, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={`/topics/`} className="group block bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition h-full">
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-emerald-700 mb-2 font-bengali">{topic.title}</h3>
                <p className="text-slate-500 text-sm font-bengali">{topic.count}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
