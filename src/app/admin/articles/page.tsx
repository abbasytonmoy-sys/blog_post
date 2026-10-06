"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues with the document object
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ],
};

export default function AdminArticles() {
  const [topics, setTopics] = useState<any[]>([]);
  const [topicId, setTopicId] = useState("");
  const [title, setTitle] = useState(""); // Heading/Chapter Name
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: topicsData } = await supabase.from("topics").select("*");
    if (topicsData) setTopics(topicsData);

    const { data: articlesData } = await supabase
      .from("articles")
      .select("*, topics(title)")
      .order("created_at", { ascending: false });
    if (articlesData) setArticles(articlesData);
  };

  const handleAddArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicId) {
      setMessage("Error: একটি বিষয় নির্বাচন করুন।");
      return;
    }
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("articles").insert([
      { topic_id: topicId, title, content }
    ]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("আর্টিকেল/চ্যাপ্টার সফলভাবে যুক্ত হয়েছে!");
      setTitle("");
      setContent("");
      fetchData();
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6 font-bengali">চ্যাপ্টার ও কন্টেন্ট যোগ করুন</h1>
      
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        {message && (
          <div className={`mb-4 p-3 rounded ${message.includes("Error") ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleAddArticle} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">বিষয় (Subject) নির্বাচন করুন</label>
            <select
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 outline-none"
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
            >
              <option value="">নির্বাচন করুন...</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">চ্যাপ্টার/হেডিং (Heading)</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 outline-none"
              placeholder="যেমন: প্রাচীন বাংলার ইতিহাস"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium text-slate-700 mb-1">বিস্তারিত কন্টেন্ট (গুগল ডক্সের মতো লিখুন)</label>
            <div className="bg-white rounded-lg overflow-hidden border border-slate-300">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                className="h-64 mb-12"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition mt-4"
          >
            {loading ? "যোগ হচ্ছে..." : "কন্টেন্ট সেভ করুন"}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4 font-bengali">আপলোড করা চ্যাপ্টারসমূহ</h2>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 font-medium text-slate-600">হেডিং/চ্যাপ্টার</th>
              <th className="p-4 font-medium text-slate-600">বিষয়</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-t border-slate-100">
                <td className="p-4">{article.title}</td>
                <td className="p-4 text-slate-500">{article.topics?.title}</td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr><td colSpan={2} className="p-4 text-center text-slate-500">কোনো কন্টেন্ট পাওয়া যায়নি।</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
