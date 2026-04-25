import { useState } from "react";

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUID()]);
  const [count, setCount] = useState(5);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [noDashes, setNoDashes] = useState(false);

  const format = (id: string) => {
    let s = id;
    if (noDashes) s = s.replace(/-/g, "");
    if (uppercase) s = s.toUpperCase();
    return s;
  };

  const generate = () => {
    setUuids(Array.from({ length: count }, generateUUID));
  };

  const copy = (idx: number) => {
    navigator.clipboard.writeText(format(uuids[idx]));
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1200);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.map(format).join("\n"));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>UUID Generator</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Generate v4 UUIDs instantly. Bulk, formatted, ready to paste.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-5 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <label className="text-xs" style={{ color: "var(--muted)" }}>Count:</label>
          <input
            type="number" min={1} max={50} value={count}
            onChange={e => setCount(Math.min(50, Math.max(1, +e.target.value)))}
            className="w-16 px-2 py-1 rounded-lg text-sm text-center outline-none"
            style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }}
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--muted)" }}>
          <input type="checkbox" checked={uppercase} onChange={e => setUppercase(e.target.checked)} className="accent-violet-500" />
          Uppercase
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--muted)" }}>
          <input type="checkbox" checked={noDashes} onChange={e => setNoDashes(e.target.checked)} className="accent-violet-500" />
          No dashes
        </label>

        <button onClick={generate}
          className="px-5 py-1.5 rounded-lg text-sm font-medium text-white ml-auto"
          style={{ background: "var(--accent)" }}>
          Generate
        </button>
        {uuids.length > 1 && (
          <button onClick={copyAll}
            className="px-4 py-1.5 rounded-lg text-sm font-medium"
            style={{ background: "var(--border)", color: "var(--text)" }}>
            {copiedAll ? "Copied all!" : "Copy all"}
          </button>
        )}
      </div>

      {/* UUID List */}
      <div className="space-y-2">
        {uuids.map((id, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl group"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <span className="text-xs w-5 text-right shrink-0" style={{ color: "var(--muted)" }}>{i + 1}</span>
            <code className="flex-1 text-sm tracking-wide" style={{ color: "#a3e635" }}>
              {format(id)}
            </code>
            <button onClick={() => copy(i)}
              className="opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-lg text-xs"
              style={{ background: copiedIdx === i ? "#14532d" : "var(--bg)", color: copiedIdx === i ? "#4ade80" : "var(--muted)" }}>
              {copiedIdx === i ? "\u2713" : "Copy"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
