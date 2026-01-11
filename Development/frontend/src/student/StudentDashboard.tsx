import StudentEditor from './StudentEditor';

export default function StudentDashboard() {
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white">
      {/* Header */}
      <header className="p-4 text-center text-lg border-b border-slate-700">
        ManaTyping — Focused Writing
      </header>

      {/* Editor */}
      <main className="flex-1">
        <StudentEditor />
      </main>
    </div>
  );
}
