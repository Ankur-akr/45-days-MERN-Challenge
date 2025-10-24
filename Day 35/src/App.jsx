import React from 'react';
import SkillsSection from './components/SkillsSection';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h1>My Resume Page</h1>
      <SkillsSection />
      <ContactForm />
    </div>
  );
};

export default App;