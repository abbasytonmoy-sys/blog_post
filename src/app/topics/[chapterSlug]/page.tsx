import Link from "next/link";
import { BookCheck, HelpCircle } from "lucide-react";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ chapterSlug: string }>
}) {
  const { chapterSlug } = await params;
  
  // Here we would fetch the article content from Supabase using the chapterSlug.
  // For now, displaying mock content.
  
  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold tracking-wider">
          অধ্যায়
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4 mb-4 font-bengali leading-tight">
          {chapterSlug === 'ancient-history' ? 'প্রাচীন কালের ইতিহাস' : 'অধ্যায়ের শিরোনাম'}
        </h1>
        <div className="flex items-center gap-4 text-sm text-slate-500 pb-6 border-b border-slate-100">
          <span className="flex items-center gap-1">
            <BookCheck className="w-4 h-4" /> ১০ মিনিট পাঠ
          </span>
        </div>
      </div>

      <article className="prose prose-emerald lg:prose-lg max-w-none font-bengali text-slate-700 space-y-6">
        <p>
          এখানে অধ্যায়ের বিস্তারিত লেখা থাকবে। আপনি চাইলে প্যারাগ্রাফ, বুলেট পয়েন্ট, এবং হেডিং ব্যবহার করে তথ্যগুলো সুন্দরভাবে সাজিয়ে লিখতে পারবেন। 
        </p>
        
        <h2 className="text-2xl font-bold text-slate-800 mt-8 mb-4">গুরুত্বপূর্ণ পয়েন্টসমূহ</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>বিসিএস পরীক্ষার জন্য এই অংশটি খুবই গুরুত্বপূর্ণ।</li>
          <li>এই অধ্যায় থেকে সাধারণত ১-২টি প্রশ্ন এসে থাকে।</li>
          <li>তথ্যগুলো মনে রাখার জন্য বারবার রিভিশন দেওয়া প্রয়োজন।</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-800 mt-8 mb-3">বিস্তারিত আলোচনা</h3>
        <p>
          প্রাচীন বাংলার ইতিহাস মূলত পাল এবং সেন বংশের রাজত্বের সময়কালকে ঘিরে আবর্তিত। সেসময়কার শাসনব্যবস্থা, অর্থনীতি এবং সংস্কৃতি আমাদের আজকের বাংলার ভিত্তি গড়ে দিয়েছে। বিস্তারিত তথ্যগুলো আপনার ড্যাশবোর্ড থেকে ডাটাবেজে সেভ করলেই এখানে চলে আসবে।
        </p>
      </article>

      {/* Quiz Section Trigger */}
      <div className="mt-16 bg-slate-50 border border-emerald-100 rounded-2xl p-6 md:p-8 text-center shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2 font-bengali">পড়া শেষ? নিজেকে যাচাই করুন!</h3>
        <p className="text-slate-600 mb-6 max-w-md mx-auto">
          এই অধ্যায়ের উপর ১০টি প্রশ্নের একটি কুইজ আছে। কুইজে অংশ নিয়ে আপনার প্রস্তুতি যাচাই করুন।
        </p>
        <Link 
          href={`/quizzes/${chapterSlug}`} 
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition"
        >
          কুইজ শুরু করুন
        </Link>
      </div>
    </div>
  );
}
