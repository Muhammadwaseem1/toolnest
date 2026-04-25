import { useState } from "react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");

function randomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function randomSentence(wordCount = 8): string {
  const count = wordCount + Math.floor(Math.random() * 6) - 3;
  const words = Array.from({ length: Math.max(5, count) }, randomWord);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ") + ".";
}

function generateParagraph(sentences = 5): string {
  return Array.from({ length: sentences }, () => randomSentence()).join(" ");
}

export default function LoremGenerator() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);

  const generate = () => {
    let result = "";
    if (type === "paragraphs") {
      const paras = Array.from({ length: count }, (_, i) => {
        let p = generateParagraph(5);
        if (i === 0 && startWithLorem) p = "Lorem ipsum dolor sit amet consectetur adipiscing elit. " + p;
        return p;
      });
      result = paras.join("\n\n");
    } else if (type === "sentences") {
      const sents = Array.from({ length: count }, (_, i) => {
        if (i === 0 && startWithLorem) return "Lorem ipsum dolor sit amet consectetur adipiscing elit.";
        return randomSentence();
      });
      result = sents.join(" ");
    } else {
      const words = Array.from({ length: count }, randomWord);
      if (startWithLorem) words[0] = "lorem";
      result = words.join(" ");
    }
    setOutput(result);
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const wordCount = output ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>Lorem Ipsum Generator</h2>
        <p className="text-sm" style={{ color: "var(--muted)" }}>Generate placeholder text for your designs and mockups.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center mb-4 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg)" }}>
          {(["paragraphs", "sentences", "words"] as const).map(t => (
            <button key={t} onClick={() => setType(t)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
              style={{ background: type === t ? "var(--accent)" : "transparent", color: type === t ? "white" : "var(--muted)" }}>
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs" style={{ color: "var(--muted)" }}>Count:</label>
          <input
            type="number" min={1} max={type === "words" ? 500 : type === "sentences" ? 50 : 20}
            value={count}
            onChange={e => setCount(Math.max(1, +e.target.value))}
            className="w-16 px-2 py-1 rounded-lg text-sm text-center outline-none"
            style={{ background: "var(--bg)", color: "var(--text)", border: "1px solid var(--border)" }}
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: "var(--muted)" }}>
          <input type="checkbox" checked={startWithLorem} onChange={e => setStartWithLorem(e.target.checked)} className="accent-violet-500" />
          Start with &ldquo;Lorem ipsum&rdquo;
        </label>

        <button onClick={generate}
          className="px-5 py-1.5 rounded-lg text-sm font-medium text-white ml-auto"
          style={{ background: "var(--accent)" }}>
          Generate
        </button>
      </div>

      {/* Output */}
      {output && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex gap-3 text-xs" style={{ color: "var(--muted)" }}>
              <span>{wordCount} words</span>
              <span>{charCount} chars</span>
            </div>
            <button onClick={copy}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ background: copied ? "#14532d" : "var(--border)", color: copied ? "#4ade80" : "var(--muted)" }}>
              {copied ? "Copied!" : "Copy text"}
            </button>
          </div>
          <div className="rounded-xl p-5 leading-relaxed text-sm whitespace-pre-wrap"
            style={{ background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" }}>
            {output}
          </div>
        </div>
      )}

      {!output && (
        <div className="rounded-xl p-12 text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <p className="text-4xl mb-3">\u00b6</p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>Hit Generate to create placeholder text</p>
        </div>
      )}
    </div>
  );
}
