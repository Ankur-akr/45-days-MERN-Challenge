import React from "react";

const ErrorMessage = ({ message, onRetry }) => (
  <div className="text-center py-8">
    <p className="text-red-600 mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Retry
    </button>
  </div>
);

export default ErrorMessage;
