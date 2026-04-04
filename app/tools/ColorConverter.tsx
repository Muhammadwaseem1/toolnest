"use client";

import { useState } from "react";

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

export default function ColorConverter() {
  const [hex, setHex] = useState("#6c63ff");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  return (<div><h2>Color Converter</h2></div>);
}
