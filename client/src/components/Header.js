import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <h2>My Resume</h2>
      <nav>
        <a href="#about">About</a>
        <a href="#experience">Experience</a>
        <a href="#skills">Skills</a>
      </nav>
    </header>
  );
};

export default Header;