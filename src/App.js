import React, { useState } from 'react';
import './App.css';
import Gallery from './components/Gallery';
import ARView from './components/ARView';
import AIArtGenerator from './components/AIArtGenerator';
import Navbar from './components/Navbar';

function App() {
  const [activeView, setActiveView] = useState('gallery'); // gallery, ar, ai

  return (
    <div className="App">
      <Navbar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        {activeView === 'gallery' && <Gallery />}
        {activeView === 'ar' && <ARView />}
        {activeView === 'ai' && <AIArtGenerator />}
      </main>
    </div>
  );
}

export default App;