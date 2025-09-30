import React, { useEffect, useRef, useState } from "react";
const Button = ({ children, ...props }) => (
  <button
    {...props}
    className="px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="border rounded-lg shadow bg-white mb-4">{children}</div>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;

/*
  Day 29: Mastering useEffect & Data Fetching
  Single-file React demo component + custom hook `useExperienceAPI`

  Features included:
  - useExperienceAPI: mock API (localStorage + simulated latency)
  - Multiple useEffect examples with different dependency arrays
  - Real-time state monitoring & activity logging panel
  - Loading, error handling, form validation
  - Cleanup demonstration to prevent memory leaks
  - Inline educational explanations for each useEffect

  Drop this file into a React + Tailwind project (e.g. Vite or Next.js app)
  It uses the shadcn/ui Button & Card for nicer UI; if unavailable, replace Button/Card with plain elements.
*/

// -------------------------------
// Simple Mock API using localStorage
// -------------------------------
const STORAGE_KEY = "day29_experiences_v1";
const simulate = (result, ms = 600, failRate = 0.05) =>
  new Promise((resolve, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      if (Math.random() < failRate) reject(new Error("Network error (simulated)"));
      else resolve(result);
    }, ms);
  });

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || "[]";
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}
function writeToStorage(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

// -------------------------------
// useExperienceAPI: custom hook demonstrating professional data-fetch patterns
// -------------------------------
export function useExperienceAPI({ onLog } = {}) {
  // status state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // helper to log actions for the educational panel
  const log = (msg) => {
    if (onLog) onLog(`${new Date().toLocaleTimeString()}: ${msg}`);
  };

  // fetch all experiences
  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    log("fetchAll started");
    try {
      // simulate fetch
      const items = readFromStorage();
      const res = await simulate(items, 700);
      setData(res);
      log(`fetchAll success (${res.length} items)`);
      return res;
    } catch (err) {
      setError(err.message);
      log(`fetchAll error: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const create = async (payload) => {
    setLoading(true);
    setError(null);
    log(`create started: ${payload.title}`);
    try {
      const items = readFromStorage();
      const newItem = { ...payload, id: Date.now().toString() };
      const updated = [newItem, ...items];
      writeToStorage(updated);
      await simulate(true, 500);
      setData(updated);
      log(`create success: ${newItem.id}`);
      return newItem;
    } catch (err) {
      setError(err.message);
      log(`create error: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, patch) => {
    setLoading(true);
    setError(null);
    log(`update started: ${id}`);
    try {
      const items = readFromStorage();
      const updated = items.map((it) => (it.id === id ? { ...it, ...patch } : it));
      writeToStorage(updated);
      await simulate(true, 500);
      setData(updated);
      log(`update success: ${id}`);
      return updated.find((i) => i.id === id);
    } catch (err) {
      setError(err.message);
      log(`update error: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    log(`remove started: ${id}`);
    try {
      const items = readFromStorage();
      const updated = items.filter((it) => it.id !== id);
      writeToStorage(updated);
      await simulate(true, 450);
      setData(updated);
      log(`remove success: ${id}`);
      return true;
    } catch (err) {
      setError(err.message);
      log(`remove error: ${err.message}`);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
  };
}

// -------------------------------
// Main UI Component
// -------------------------------
export default function Day29WorkExperience() {
  // Activity log (educational + API logs)
  const [logs, setLogs] = useState([]);
  const addLog = (msg) => setLogs((s) => [msg, ...s].slice(0, 200));

  // search & filter state to demonstrate effects with dependencies
  const [search, setSearch] = useState("");
  const [filterCurrent, setFilterCurrent] = useState(false);

  // wire custom hook and pass logging function
  const api = useExperienceAPI({ onLog: addLog });

  // form state
  const [form, setForm] = useState({ title: "", company: "", start: "", end: "", current: false, description: "" });
  const [formErrors, setFormErrors] = useState({});

  // derived filtered list
  const [visible, setVisible] = useState([]);

  // ref to demonstrate cleanup in useEffect
  const intervalRef = useRef(null);

  // -------------------------------
  // useEffect #1: Mount-only
  // -------------------------------
  useEffect(() => {
    addLog("useEffect#1 (mount) — calling api.fetchAll");
    api.fetchAll().catch(() => {});
  }, []);

  // -------------------------------
  // useEffect #2: dependency-based
  // -------------------------------
  useEffect(() => {
    addLog(`useEffect#2 (derive visible)`);
    const result = api.data.filter((it) => {
      const matchesSearch = [it.title, it.company, it.description].join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesCurrent = filterCurrent ? !!it.current : true;
      return matchesSearch && matchesCurrent;
    });
    setVisible(result);
  }, [api.data, search, filterCurrent]);

  // -------------------------------
  // useEffect #3: interval with cleanup
  // -------------------------------
  useEffect(() => {
    addLog(`useEffect#3 (interval)`);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      addLog(`heartbeat: ${api.loading ? "API busy" : "idle"}`);
    }, 4000);
    return () => {
      addLog("useEffect#3 cleanup");
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [api.loading]);

  // -------------------------------
  // useEffect #4: document title update
  // -------------------------------
  useEffect(() => {
    const prev = document.title;
    document.title = `Experiences (${visible.length})`;
    addLog(`useEffect#4 — updated document.title`);
    return () => {
      document.title = prev;
      addLog("useEffect#4 cleanup");
    };
  }, [visible.length]);

  return <div>Work Experience Manager Component</div>;
}