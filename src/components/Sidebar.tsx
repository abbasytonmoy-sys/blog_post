"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";

// Mock data as fallback if DB is empty
const mockSubjects = [
  {
    id: "sub-1",
    name: "বাংলাদেশের ইতিহাস",
    chapters: [
      { id: "chap-1", title: "প্রাচীন কাল", slug: "ancient-history" },
      { id: "chap-2", title: "মধ্যযুগ", slug: "middle-age" },
      { id: "chap-3", title: "ব্রিটিশ আমল", slug: "british-period" },
    ]
  },
  {
    id: "sub-2",
    name: "মুক্তিযুদ্ধ ও স্বাধীনতা",
    chapters: [
      { id: "chap-4", title: "ভাষা আন্দোলন", slug: "language-movement" },
      { id: "chap-5", title: "৬ দফা ও গণঅভ্যুত্থান", slug: "six-point" },
      { id: "chap-6", title: "১৯৭১ এর মুক্তিযুদ্ধ", slug: "liberation-war-1971" },
    ]
  },
  {
    id: "sub-3",
    name: "ভৌগোলিক অবস্থান",
    chapters: [
      { id: "chap-7", title: "সীমানা ও আয়তন", slug: "border-area" },
      { id: "chap-8", title: "নদ-নদী", slug: "rivers" },
    ]
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const [subjects, setSubjects] = useState(mockSubjects);
  const [expandedSubject, setExpandedSubject] = useState<string | null>("sub-1");

  // In the future, we can fetch real data from Supabase here
  /*
  useEffect(() => {
    const fetchTopics = async () => {
      // Logic to fetch from your supabase tables
    };
    fetchTopics();
  }, []);
  */

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
            
            {/* Chapters inside the subject */}
            {expandedSubject === subject.id && (
              <div className="bg-white p-2 space-y-1">
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
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
