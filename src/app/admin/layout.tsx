"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, FileText, PlusCircle, HelpCircle } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      // Check user role from profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role === "admin") {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return <div className="min-h-[50vh] flex items-center justify-center">লোড হচ্ছে...</div>;
  }

  if (!isAdmin) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[80vh]">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-slate-800 text-white rounded-2xl p-4 sticky top-24">
          <h2 className="text-xl font-bold mb-6 pb-4 border-b border-slate-700 font-bengali">
            অ্যাডমিন প্যানেল
          </h2>
          <nav className="space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <LayoutDashboard className="w-5 h-5" />
              <span>ড্যাশবোর্ড</span>
            </Link>
            <Link href="/admin/topics" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <PlusCircle className="w-5 h-5" />
              <span>বিষয় ও অধ্যায়</span>
            </Link>
            <Link href="/admin/articles" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <FileText className="w-5 h-5" />
              <span>আর্টিকেল ম্যানেজমেন্ট</span>
            </Link>
            <Link href="/admin/quizzes" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition">
              <HelpCircle className="w-5 h-5" />
              <span>কুইজ ম্যানেজমেন্ট</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        {children}
      </main>
    </div>
  );
}
