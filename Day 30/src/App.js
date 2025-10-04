import React from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard";
import ThemeToggle from "./components/ThemeToggle";
import withLogger from "./components/withLogger";

const LoggedDashboard = withLogger(Dashboard, "Dashboard");

function ThemedApp() {
  const { theme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>Advanced Components Demo</h1>
        <ThemeToggle />
      </header>
      <main>
        <LoggedDashboard />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}