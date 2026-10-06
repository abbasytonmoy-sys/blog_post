"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data to demonstrate multiple subjects (Dynamic logic will be added later)
const mockSubjects = [
  {
    id: "sub-bd",
    name: "বাংলাদেশ বিষয়াবলী",
    chapters: [
      { id: "chap-bd-1", title: "প্রাচীন কালের ইতিহাস", slug: "bd-ancient-history" },
      { id: "chap-bd-2", title: "মুক্তিযুদ্ধ ও স্বাধীনতা", slug: "bd-liberation-war" },
    ]
  },
  {
    id: "sub-intl",
    name: "আন্তর্জাতিক বিষয়াবলী",
    chapters: [
      { id: "chap-intl-1", title: "জাতিসংঘ ও বিশ্ব সংগঠন", slug: "un-and-organizations" },
      { id: "chap-intl-2", title: "বৈশ্বিক ইতিহাস", slug: "global-history" },
    ]
  },
  {
    id: "sub-geo",
    name: "ভূগোল ও পরিবেশ",
    chapters: [
      { id: "chap-geo-1", title: "সৌরজগৎ", slug: "solar-system" },
      { id: "chap-geo-2", title: "জলবায়ু পরিবর্তন", slug: "climate-change" },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [subjects, setSubjects] = useState(mockSubjects);
  const [expandedSubject, setExpandedSubject] = useState<string | null>("sub-bd");

  const toggleSubject = (id: string) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sticky top-24">
      <h2 className="text-lg font-bold text-slate-800 mb-4 pb-2 border-b flex items-center gap-2 font-bengali">
        <BookOpen className="w-5 h-5 text-emerald-600" />
        বিষয়সমূহ
      </h2>
      
      <div className="space-y-2">
        {subjects.map((subject) => (
          <div key={subject.id} className="border border-slate-100 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSubject(subject.id)}
              className={`w-full flex items-center justify-between p-3 text-left font-medium transition ${
                expandedSubject === subject.id 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }`}
            >
              <span className="font-bengali">{subject.name}</span>
              {expandedSubject === subject.id ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            <AnimatePresence>
              {expandedSubject === subject.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white p-2 space-y-1 overflow-hidden"
                >
                  {subject.chapters.map((chapter) => {
                    const isActive = pathname === `/topics/${chapter.slug}`;
                    return (
                      <Link
                        key={chapter.id}
                        href={`/topics/${chapter.slug}`}
                        className={`block px-4 py-2 rounded-md text-sm transition font-bengali ${
                          isActive 
                            ? "bg-emerald-100 text-emerald-800 font-semibold" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                        }`}
                      >
                        {chapter.title}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
