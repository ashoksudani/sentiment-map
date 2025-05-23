import React from "react";

const legendItems = [
  { color: "#e53935", label: "Negative" },
  { color: "#ffeb3b", label: "Neutral" },
  { color: "#43a047", label: "Positive" },
];

const Legend: React.FC = () => (
  <div className="flex items-center gap-6 my-4">
    {legendItems.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <span
          className="inline-block w-4 h-4 rounded border border-gray-300"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-sm">{item.label}</span>
      </div>
    ))}
  </div>
);

export default Legend;