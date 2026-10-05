import Sidebar from "@/components/Sidebar";

export default function TopicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[80vh]">
      {/* Sidebar for Subjects and Chapters */}
      <aside className="w-full md:w-64 lg:w-80 shrink-0">
        <Sidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
        {children}
      </main>
    </div>
  );
}
