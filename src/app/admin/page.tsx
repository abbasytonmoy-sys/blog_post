export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2 font-bengali">স্বাগতম, অ্যাডমিন!</h1>
      <p className="text-slate-600 mb-8">
        এখান থেকে আপনি পুরো ওয়েবসাইট নিয়ন্ত্রণ করতে পারবেন। বাম পাশের মেনু থেকে নতুন বিষয়, আর্টিকেল বা কুইজ যুক্ত করতে পারবেন।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-emerald-800 mb-2">মোট বিষয়/অধ্যায়</h3>
          <p className="text-4xl font-bold text-emerald-600">০</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-blue-800 mb-2">মোট আর্টিকেল</h3>
          <p className="text-4xl font-bold text-blue-600">০</p>
        </div>
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-xl">
          <h3 className="text-xl font-bold text-purple-800 mb-2">মোট কুইজ প্রশ্ন</h3>
          <p className="text-4xl font-bold text-purple-600">০</p>
        </div>
      </div>
    </div>
  );
}
