import React from "react";
import { useSentimentContext } from "../context/SentimentContext";
import type { SentimentMode } from "../context/SentimentContext";

const modes: { value: SentimentMode; label: string }[] = [
  { value: "overall", label: "Overall" },
  { value: "positive", label: "Positive" },
  { value: "neutral", label: "Neutral" },
  { value: "negative", label: "Negative" },
];

const SentimentToggle: React.FC = () => {
  const { mode, setMode } = useSentimentContext();

  return (
    <div className="flex gap-2 my-4">
      {modes.map((m) => (
        <button
          key={m.value}
          className={`px-3 py-1 rounded border text-sm transition
            ${mode === m.value
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-blue-50"}
          `}
          onClick={() => setMode(m.value)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
};

export default SentimentToggle;