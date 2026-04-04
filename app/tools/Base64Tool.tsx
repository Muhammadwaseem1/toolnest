"use client";

import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const run = () => {
    setError("");
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch {
      setError(mode === "decode" ? "Invalid Base64 string." : "Encoding failed.");
      setOutput("");
    }
  };

  const swap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
    setError("");
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>Base64 Encoder / Decoder</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Encode text to Base64 or decode Base64 back to plain text.</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-1 p-1 rounded-xl mb-4 w-fit" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        {(["encode", "decode"] as const).map(m => (
          <button key={m} onClick={() => { setMode(m); setOutput(""); setError(""); }}
            className="px-5 py-1.5 rounded-lg text-sm font-medium capitalize transition-all"
            style={{ background: mode === m ? "var(--accent)" : "transparent", color: mode === m ? "white" : "var(--muted)" }}>
            {m}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-3 px-3 py-2 rounded-lg text-sm font-mono" style={{ background: "#3a1a1a", color: "#f87171" }}>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--muted)" }}>
            {mode === "encode" ? "PLAIN TEXT" : "BASE64"}
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            rows={12}
            className="w-full rounded-xl p-4 text-sm resize-none outline-none"
            style={{ background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" }}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Paste Base64 string here..."}
            spellCheck={false}
          />
        </div>
        <div className="relative">
          <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--muted)" }}>
            {mode === "encode" ? "BASE64 OUTPUT" : "DECODED TEXT"}
          </label>
          <textarea
            value={output}
            readOnly
            rows={12}
            className="w-full rounded-xl p-4 text-sm resize-none outline-none"
            style={{ background: "var(--surface)", color: "#a3e635", border: "1px solid var(--border)" }}
            placeholder="Output appears here..."
            spellCheck={false}
          />
          {output && (
            <button onClick={copy}
              className="absolute top-8 right-3 px-2.5 py-1 rounded-lg text-xs font-medium"
              style={{ background: copied ? "#14532d" : "var(--border)", color: copied ? "#4ade80" : "var(--muted)" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={run}
          className="px-5 py-2 rounded-lg text-sm font-medium text-white"
          style={{ background: "var(--accent)" }}>
          {mode === "encode" ? "Encode →" : "Decode →"}
        </button>
        {output && (
          <button onClick={swap}
            className="px-5 py-2 rounded-lg text-sm font-medium"
            style={{ background: "var(--border)", color: "var(--text)" }}>
            ⇄ Swap & Flip
          </button>
        )}
      </div>
    </div>
  );
}
