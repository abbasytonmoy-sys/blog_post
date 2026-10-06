import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Need to make Home async to fetch data
export default async function Home() {
  // Fetch up to 6 topics
  const { data: topics } = await supabase.from("topics").select("id, title, slug").limit(6);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
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
      </section>

      {/* Featured Topics Preview */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 font-bengali">জনপ্রিয় বিষয়সমূহ</h2>
          <Link href="/topics" className="text-emerald-600 hover:text-emerald-800 font-medium text-sm font-bengali">
            সবগুলো দেখুন &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics?.map((topic) => (
            <div key={topic.id}>
              <Link href={`/topics/`} className="block bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-200 transition h-full group">
                <h3 className="text-xl font-semibold text-slate-800 group-hover:text-emerald-700 mb-2 font-bengali">{topic.title}</h3>
                <p className="text-slate-500 text-sm font-bengali">ক্লিক করে পড়ুন</p>
              </Link>
            </div>
          ))}
          {(!topics || topics.length === 0) && (
            <div className="col-span-3 text-center text-slate-500 font-bengali py-8">
              এখনো কোনো বিষয় যুক্ত করা হয়নি।
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
