import React, { useState } from 'react';
import './Gallery.css';
import { artWorks } from '../data/artworks';

const Gallery = () => {
  const [selectedArt, setSelectedArt] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredArt = filter === 'all' 
    ? artWorks 
    : artWorks.filter(art => art.category === filter);

  const categories = ['all', ...new Set(artWorks.map(art => art.category))];

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h2>Virtual Art Gallery</h2>
        <p>Explore our collection of AI-generated and curated artworks</p>
      </div>

      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category}
            className={filter === category ? 'active' : ''}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="gallery-grid">
        {filteredArt.map((art, index) => (
          <div
            key={index}
            className="art-card"
            onClick={() => setSelectedArt(art)}
          >
            <div className="art-image-container">
              <div 
                className="art-image"
                style={{ backgroundImage: `url(${art.image})` }}
              />
              <div className="art-overlay">
                <h3>{art.title}</h3>
                <p className="art-artist">{art.artist}</p>
              </div>
            </div>
            <div className="art-info">
              <p className="art-category">{art.category}</p>
              <p className="art-year">{art.year}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedArt && (
        <div className="modal" onClick={() => setSelectedArt(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedArt(null)}>
              ×
            </button>
            <div 
              className="modal-image"
              style={{ backgroundImage: `url(${selectedArt.image})` }}
            />
            <div className="modal-info">
              <h2>{selectedArt.title}</h2>
              <p className="modal-artist">By {selectedArt.artist}</p>
              <p className="modal-description">{selectedArt.description}</p>
              <div className="modal-details">
                <span>Category: {selectedArt.category}</span>
                <span>Year: {selectedArt.year}</span>
                {selectedArt.medium && <span>Medium: {selectedArt.medium}</span>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;

