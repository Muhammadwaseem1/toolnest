import { useState } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function isValidHex(hex: string) {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function expandHex(hex: string) {
  if (hex.length === 4) {
    return "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  return hex;
}

const PRESETS = ["#6c63ff","#a855f7","#ec4899","#f97316","#eab308","#22c55e","#06b6d4","#3b82f6","#ef4444","#14b8a6"];

export default function ColorConverter() {
  const [hex, setHex] = useState("#6c63ff");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const safeHex = isValidHex(hex) ? expandHex(hex) : "#6c63ff";
  const { r, g, b } = hexToRgb(safeHex);
  const { h, s, l } = rgbToHsl(r, g, b);

  const formats = [
    { key: "hex",  label: "HEX",  value: safeHex.toUpperCase() },
    { key: "rgb",  label: "RGB",  value: `rgb(${r}, ${g}, ${b})` },
    { key: "hsl",  label: "HSL",  value: `hsl(${h}, ${s}%, ${l}%)` },
    { key: "rgba", label: "RGBA", value: `rgba(${r}, ${g}, ${b}, 1)` },
    { key: "css",  label: "CSS var", value: `--color: ${safeHex.toLowerCase()};` },
    { key: "tw",   label: "Tailwind-ish", value: `bg-[${safeHex.toLowerCase()}]` },
  ];

  const copy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1300);
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>Color Converter</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Pick a color and get every format you need instantly.</p>
      </div>

      {/* Picker + Input */}
      <div className="flex gap-4 items-start mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl shadow-lg cursor-pointer overflow-hidden" style={{ border: "2px solid var(--border)" }}>
            <input
              type="color"
              value={safeHex}
              onChange={e => setHex(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full h-full" style={{ background: safeHex }} />
          </div>
          <p className="text-xs text-center mt-1" style={{ color: "var(--muted)" }}>Click to pick</p>
        </div>
        <div className="flex-1">
          <label className="text-xs mb-1.5 block" style={{ color: "var(--muted)" }}>HEX VALUE</label>
          <input
            value={hex}
            onChange={e => setHex(e.target.value)}
            className="px-3 py-2 rounded-xl text-sm font-mono outline-none w-full"
            style={{ background: "var(--surface)", color: "var(--text)", border: `1px solid ${isValidHex(hex) ? "var(--border)" : "#f87171"}` }}
            placeholder="#6c63ff"
            maxLength={7}
          />
          {!isValidHex(hex) && <p className="text-xs mt-1" style={{ color: "#f87171" }}>Enter a valid hex like #ff6600</p>}
        </div>
      </div>

      {/* Preset palette */}
      <div className="flex gap-2 flex-wrap mb-6">
        {PRESETS.map(p => (
          <button key={p} onClick={() => setHex(p)}
            className="w-8 h-8 rounded-lg transition-transform hover:scale-110"
            style={{ background: p, border: hex === p ? "2px solid white" : "2px solid transparent" }}
            title={p}
          />
        ))}
      </div>

      {/* Formats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {formats.map(f => (
          <button key={f.key} onClick={() => copy(f.key, f.value)}
            className="flex items-center justify-between px-4 py-3 rounded-xl text-left group transition-colors"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div>
              <p className="text-xs mb-0.5 font-medium" style={{ color: "var(--muted)" }}>{f.label}</p>
              <code className="text-sm" style={{ color: "#a3e635" }}>{f.value}</code>
            </div>
            <span className="text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: copiedKey === f.key ? "#14532d" : "var(--bg)", color: copiedKey === f.key ? "#4ade80" : "var(--muted)" }}>
              {copiedKey === f.key ? "\u2713" : "Copy"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
