"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminTopics() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const { data } = await supabase.from("topics").select("*").order("created_at", { ascending: false });
    if (data) setTopics(data);
  };

  const handleAddTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("topics").insert([{ title, slug, description }]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("বিষয় সফলভাবে যুক্ত হয়েছে!");
      setTitle("");
      setSlug("");
      setDescription("");
      fetchTopics();
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6 font-bengali">বিষয় (Subject) যোগ করুন</h1>
      
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
        {message && <div className="mb-4 p-3 bg-emerald-100 text-emerald-800 rounded">{message}</div>}
        <form onSubmit={handleAddTopic} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">বিষয়ের নাম</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 outline-none"
              placeholder="যেমন: বাংলাদেশ বিষয়াবলী"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">স্লাগ (URL-এর জন্য ইংরেজি নাম)</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 outline-none"
              placeholder="যেমন: bangladesh-affairs"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">বিবরণ (ঐচ্ছিক)</label>
            <textarea
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-emerald-500 outline-none"
              placeholder="এই বিষয়ের বিবরণ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {loading ? "যোগ হচ্ছে..." : "বিষয় যোগ করুন"}
          </button>
        </form>
      </div>

      <h2 className="text-xl font-bold text-slate-800 mb-4 font-bengali">বর্তমান বিষয়সমূহ</h2>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 font-medium text-slate-600">নাম</th>
              <th className="p-4 font-medium text-slate-600">স্লাগ</th>
            </tr>
          </thead>
          <tbody>
            {topics.map(topic => (
              <tr key={topic.id} className="border-t border-slate-100">
                <td className="p-4">{topic.title}</td>
                <td className="p-4 text-slate-500">{topic.slug}</td>
              </tr>
            ))}
            {topics.length === 0 && (
              <tr><td colSpan={2} className="p-4 text-center text-slate-500">কোনো বিষয় পাওয়া যায়নি।</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
