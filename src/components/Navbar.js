import React from 'react';
import './Navbar.css';

const Navbar = ({ activeView, setActiveView }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🎨 Virtual Art Gallery</h1>
      </div>
      <ul className="navbar-menu">
        <li>
          <button
            className={activeView === 'gallery' ? 'active' : ''}
            onClick={() => setActiveView('gallery')}
          >
            Gallery
          </button>
        </li>
        <li>
          <button
            className={activeView === 'ar' ? 'active' : ''}
            onClick={() => setActiveView('ar')}
          >
            AR View
          </button>
        </li>
        <li>
          <button
            className={activeView === 'ai' ? 'active' : ''}
            onClick={() => setActiveView('ai')}
          >
            AI Generator
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

