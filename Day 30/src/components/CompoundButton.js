import React, { createContext, useContext } from "react";

const ButtonContext = createContext();

export function ButtonGroup({ onClick, children }) {
  return (
    <ButtonContext.Provider value={onClick}>
      <div className="button-group">{children}</div>
    </ButtonContext.Provider>
  );
}

export function Button({ label }) {
  const handleClick = useContext(ButtonContext);
  return (
    <button className="btn" onClick={() => handleClick(label)}>
      {label}
    </button>
  );
}