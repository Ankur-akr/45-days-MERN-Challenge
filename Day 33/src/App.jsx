import React from 'react';
import ProjectSection from './components/ProjectSection';

const App = () => {
  return (
    <main>
      <header className="bg-blue-600 text-white text-center py-4 text-2xl font-bold">
        My Portfolio
      </header>
      <ProjectSection />
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2025 My Portfolio. All rights reserved.
      </footer>
    </main>
  );
};

export default App;