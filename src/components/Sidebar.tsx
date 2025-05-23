import React from "react";
import { useSentimentContext } from "../context/SentimentContext";

// Optionally, you can map ISO codes to country/region names if needed
const sentimentLabels: Record<string, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
};

const sentimentColors: Record<string, string> = {
  positive: "#43a047",
  neutral: "#ffeb3b",
  negative: "#e53935",
};

const Sidebar: React.FC = () => {
  const { selectedCountry, sentimentData, setSelectedCountry } = useSentimentContext();

  if (!selectedCountry) {
    return null;
  }

  const sentiment = sentimentData?.[selectedCountry];

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg border-l border-gray-200 p-6 z-50 flex flex-col">
      <button
        className="self-end mb-4 text-gray-500 hover:text-gray-800"
        onClick={() => setSelectedCountry(null)}
        aria-label="Close sidebar"
      >
        &times;
      </button>
      <h2 className="text-xl font-semibold mb-2">Region Details</h2>
      <div className="mb-4">
        <div className="text-gray-700 font-medium">Region Code:</div>
        <div className="text-lg">{selectedCountry}</div>
      </div>
      <div>
        <div className="text-gray-700 font-medium">Sentiment:</div>
        {sentiment ? (
          <div className="flex items-center gap-2 mt-1">
            <span
              className="inline-block w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: sentimentColors[sentiment] }}
            />
            <span className="text-base">{sentimentLabels[sentiment]}</span>
          </div>
        ) : (
          <span className="text-base text-gray-400">No sentiment data</span>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;