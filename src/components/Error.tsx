import React from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded shadow">
      <h2 className="font-bold text-lg mb-2">Error</h2>
      <p>{message}</p>
    </div>
  </div>
);

export default ErrorMessage;