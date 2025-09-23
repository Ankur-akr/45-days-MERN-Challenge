import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg">
      ❌ {message}
    </div>
  );
}

export default ErrorMessage;
