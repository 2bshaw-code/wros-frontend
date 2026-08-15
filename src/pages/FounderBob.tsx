import { useState } from "react";
import { Bot } from "lucide-react";
import { BobChat } from "../components/BobChat.jsx";
import { founderApi } from "../api/founder";
import { getStabilityLogs } from "../stability/linkStability";

export default function FounderBob() {
  const [open, setOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [godMode, setGodMode] = useState(false);
  const ask = async () => {
    if (!prompt.trim()) return;
    const response = await founderApi.bobAsk(
      `${prompt}\n\nLink Stability Logs:\n${JSON.stringify(getStabilityLogs().slice(-20))}`,
    );
    setContext(JSON.stringify(response.data.data, null, 2));
  };
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#6EE7A0]">
          Founder AI workspace
        </p>
        <h1 className="mt-1 text-3xl font-bold">Bob Engineering Console</h1>
        <p className="mt-2 text-gray-300">
          Private engineering conversations with Bob for system analysis and
          test support.
        </p>
      </div>
      <section className="rounded-xl border border-[#263238] bg-[#172126] p-5">
        <div className="flex items-center justify-between gap-4"><div><h2 className="font-semibold">God Mode diagnostics</h2><p className="mt-1 text-sm text-gray-400">Expose local route and stability diagnostics to this founder workspace only.</p></div><button type="button" onClick={() => setGodMode((value) => !value)} className={`rounded-lg px-4 py-2 text-sm font-bold ${godMode ? "bg-[#0FA958] text-white" : "bg-[#2A3942] text-gray-200"}`} aria-pressed={godMode}>{godMode ? "Enabled" : "Disabled"}</button></div>
        {godMode && <pre className="mt-4 overflow-auto rounded-lg bg-[#111B21] p-4 text-xs text-[#6EE7A0]">{JSON.stringify({ route: window.location.pathname, logs: getStabilityLogs().slice(-20), mode: "diagnostics" }, null, 2)}</pre>}
      </section>
      <div className="flex items-center gap-4 rounded-xl border border-[#263238] bg-[#202C33] p-5">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#0FA958] text-white">
          <Bot size={30} />
        </div>
        <div className="flex-1">
          <p className="font-semibold">
            Bob is ready for engineering questions.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ask about system health or stability"
              className="min-w-0 flex-1 rounded-lg bg-[#2A3942] px-3 py-2 text-sm text-white"
            />
            <button
              type="button"
              onClick={ask}
              className="rounded-lg bg-[#0FA958] px-4 py-2 text-sm font-semibold hover:bg-[#0C8A48]"
            >
              Analyse
            </button>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-2 rounded-lg bg-[#0FA958] px-4 py-2 text-sm font-semibold hover:bg-[#0C8A48]"
          >
            Talk to Bob
          </button>
        </div>
      </div>
      {context && (
        <pre className="overflow-auto rounded-lg bg-[#202C33] p-5 text-xs text-[#6EE7A0]">
          {context}
        </pre>
      )}
      {open && <BobChat embedded onClose={() => setOpen(false)} />}
    </div>
  );
}
