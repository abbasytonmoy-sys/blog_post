"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ChevronDown, ChevronRight, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    // Fetch all topics (subjects)
    const { data: topicsData } = await supabase.from("topics").select("*").order("created_at", { ascending: true });
    
    // Fetch all articles (chapters)
    const { data: articlesData } = await supabase.from("articles").select("id, title, topic_id").order("created_at", { ascending: true });

    if (topicsData && articlesData) {
      // Map articles into their respective topics
      const formattedSubjects = topicsData.map((topic) => ({
        id: topic.id,
        name: topic.title,
        chapters: articlesData.filter((article) => article.topic_id === topic.id)
      }));

      setSubjects(formattedSubjects);
      
      // Auto-expand the first subject if none selected
      if (formattedSubjects.length > 0) {
        setExpandedSubject(formattedSubjects[0].id);
      }
    }
    setLoading(false);
  };

  const toggleSubject = (id: string) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center sticky top-24">
        <div className="animate-pulse flex space-x-4 justify-center">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

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
                  {subject.chapters.length === 0 ? (
                    <div className="text-slate-400 text-sm px-4 py-2 font-bengali">কোনো কন্টেন্ট নেই</div>
                  ) : (
                    subject.chapters.map((chapter: any) => {
                      const isActive = pathname === `/topics/${chapter.id}`;
                      return (
                        <Link
                          key={chapter.id}
                          href={`/topics/${chapter.id}`}
                          className={`block px-4 py-2 rounded-md text-sm transition font-bengali ${
                            isActive 
                              ? "bg-emerald-100 text-emerald-800 font-semibold" 
                              : "text-slate-600 hover:bg-slate-50 hover:text-emerald-600"
                          }`}
                        >
                          {chapter.title}
                        </Link>
                      );
                    })
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        {subjects.length === 0 && (
          <div className="text-center text-slate-500 py-4 font-bengali">
            কোনো বিষয় যোগ করা হয়নি।
          </div>
        )}
      </div>
    </div>
  );
}
