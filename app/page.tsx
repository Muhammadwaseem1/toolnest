"use client";

import { useState } from "react";
import JsonFormatter from "./tools/JsonFormatter";
import Base64Tool from "./tools/Base64Tool";
import UuidGenerator from "./tools/UuidGenerator";
import ColorConverter from "./tools/ColorConverter";
import LoremGenerator from "./tools/LoremGenerator";

const TABS = [
  { id: "json",   label: "JSON",   icon: "{ }" },
  { id: "base64", label: "Base64", icon: "B64" },
  { id: "uuid",   label: "UUID",   icon: "⊞"   },
  { id: "color",  label: "Color",  icon: "◉"   },
  { id: "lorem",  label: "Lorem",  icon: "¶"   },
];

export default function Home() {
  const [active, setActive] = useState("json");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>
      <header className="border-b px-6 py-4 flex items-center gap-3" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #6c63ff, #a855f7)" }}>
            TN
          </div>
          <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>ToolNest</span>
          <span className="text-xs px-2 py-0.5 rounded-full ml-1" style={{ background: "var(--border)", color: "var(--muted)" }}>
            dev utilities
          </span>
        </div>
      </header>

      <nav className="flex gap-1 px-6 pt-4 pb-0" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-150 border border-b-0"
              style={{
                background: isActive ? "var(--bg)" : "transparent",
                color: isActive ? "var(--accent-light)" : "var(--muted)",
                borderColor: isActive ? "var(--border)" : "transparent",
                marginBottom: isActive ? "-1px" : "0",
              }}
            >
              <span className="font-mono text-xs opacity-70">{tab.icon}</span>
              {tab.label}
            </button>
          );
        })}
      </nav>

      <main className="flex-1 p-6" style={{ background: "var(--bg)" }}>
        <div className="max-w-5xl mx-auto">
          <div style={{ display: active === "json"   ? "block" : "none" }}><JsonFormatter /></div>
          <div style={{ display: active === "base64" ? "block" : "none" }}><Base64Tool /></div>
          <div style={{ display: active === "uuid"   ? "block" : "none" }}><UuidGenerator /></div>
          <div style={{ display: active === "color"  ? "block" : "none" }}><ColorConverter /></div>
          <div style={{ display: active === "lorem"  ? "block" : "none" }}><LoremGenerator /></div>
        </div>
      </main>

      <footer className="text-center text-xs py-3" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>
        ToolNest — everything a dev needs, nothing they don&apos;t
      </footer>
    </div>
  );
}