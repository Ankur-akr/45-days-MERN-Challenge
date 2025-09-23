import React from "react";

function Loader() {
  return (
    <div className="flex items-center space-x-2">
      <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      <span>Loading...</span>
    </div>
  );
}

export default Loader;
