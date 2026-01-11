import { useEffect, useState } from "react";
import { startSession, endSession } from "../editor/useSession";
import { useKeystrokes } from "../editor/useKeystrokes";

export default function StudentEditor() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Start session on mount
  useEffect(() => {
    startSession().then(setSessionId);

    return () => {
      if (sessionId) endSession(sessionId);
    };
  },[sessionId]);

  const { handleKeyDown } = useKeystrokes(sessionId || "");

  // Attach keystroke listener
  useEffect(() => {
    if (!sessionId) return;

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sessionId, handleKeyDown]);

  if (!sessionId) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Starting session...
      </div>
    );
  }

  return (
    <textarea
      className="w-full h-full resize-none bg-slate-900 p-6 text-lg outline-none"
      placeholder="Start writing..."
      onPaste={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    />
  );
}
