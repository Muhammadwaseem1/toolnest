"use client";

import { useState } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState(`{\n  "name": "ToolNest",\n  "type": "dev utility",\n  "awesome": true\n}`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const validate = () => {
    try {
      JSON.parse(input);
      setError("✓ Valid JSON");
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>JSON Formatter</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Format, minify, and validate JSON in one click.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <button onClick={format} className="px-4 py-1.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
          style={{ background: "var(--accent)" }}>Format</button>
        <button onClick={minify} className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--border)", color: "var(--text)" }}>Minify</button>
        <button onClick={validate} className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
          style={{ background: "var(--border)", color: "var(--text)" }}>Validate</button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs" style={{ color: "var(--muted)" }}>Indent:</span>
          {[2, 4].map(n => (
            <button key={n} onClick={() => setIndent(n)}
              className="w-7 h-7 rounded text-xs font-mono"
              style={{ background: indent === n ? "var(--accent)" : "var(--border)", color: "var(--text)" }}>
              {n}
            </button>
          ))}
        </div>
      </div>

      {/* Error/Success */}
      {error && (
        <div className="mb-3 px-3 py-2 rounded-lg text-sm font-mono"
          style={{ background: error.startsWith("✓") ? "#1a3a2a" : "#3a1a1a", color: error.startsWith("✓") ? "#4ade80" : "#f87171" }}>
          {error}
        </div>
      )}

      {/* Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--muted)" }}>INPUT</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            className="w-full rounded-xl p-4 text-sm resize-none outline-none scrollbar-thin"
            style={{ background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" }}
            placeholder="Paste JSON here..."
            spellCheck={false}
          />
        </div>
        <div className="relative">
          <label className="block text-xs mb-1.5 font-medium" style={{ color: "var(--muted)" }}>OUTPUT</label>
          <textarea
            value={output}
            readOnly
            rows={16}
            className="w-full rounded-xl p-4 text-sm resize-none outline-none scrollbar-thin"
            style={{ background: "var(--surface)", color: "#a3e635", border: "1px solid var(--border)" }}
            placeholder="Formatted output will appear here..."
            spellCheck={false}
          />
          {output && (
            <button onClick={copy}
              className="absolute top-8 right-3 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
              style={{ background: copied ? "#14532d" : "var(--border)", color: copied ? "#4ade80" : "var(--muted)" }}>
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
