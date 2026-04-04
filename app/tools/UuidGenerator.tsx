"use client";

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
    </div>
  );
}
