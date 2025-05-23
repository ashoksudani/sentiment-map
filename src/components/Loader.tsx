import React from "react";

const Loader: React.FC = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
    <span className="ml-4 text-lg text-gray-700">Loading sentiment data...</span>
  </div>
);

export default Loader;