import Link from "next/link";
import { BookOpen, CheckCircle } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import { supabase } from "@/lib/supabase";

export default async function ChapterPage({ params }: { params: Promise<{ articleId: string }> }) {
  const resolvedParams = await params;
  
  // Fetch article and its parent topic
  const { data: article } = await supabase
    .from("articles")
    .select("*, topics(title)")
    .eq("id", resolvedParams.articleId)
    .single();

  if (!article) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4 font-bengali">কন্টেন্ট পাওয়া যায়নি</h1>
        <Link href="/topics" className="text-emerald-600 hover:underline font-bengali">ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      {/* Breadcrumb / Header */}
      <div className="flex items-center gap-2 text-emerald-600 mb-6 font-medium font-bengali">
        <BookOpen className="w-5 h-5" />
        <span>{article.topics?.title || "বিষয়"}</span>
      </div>
      
      <h1 className="text-3xl font-bold text-slate-800 mb-8 pb-4 border-b font-bengali">
        {article.title}
      </h1>

      {/* Content Area - Rendering ReactQuill HTML */}
      <div 
        className="ql-editor prose prose-emerald max-w-none font-bengali space-y-4"
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />

      {/* Quiz Section CTA */}
      <div className="mt-12 bg-emerald-50 rounded-xl p-8 text-center border border-emerald-100">
        <h3 className="text-xl font-bold text-emerald-800 mb-2 font-bengali">পড়া শেষ?</h3>
        <p className="text-slate-600 mb-6 font-bengali">
          এই অধ্যায়ের উপর আপনার জ্ঞান যাচাই করতে কুইজে অংশগ্রহণ করুন।
        </p>
        <Link 
          href={`/quizzes/${article.id}`}
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium transition shadow-md hover:shadow-lg font-bengali"
        >
          <CheckCircle className="w-5 h-5" />
          কুইজ শুরু করুন
        </Link>
      </div>
    </div>
  );
}
