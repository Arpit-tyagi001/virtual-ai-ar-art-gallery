import React, { useState, useRef, useEffect } from 'react';
import './ARView.css';
import { artWorks } from '../data/artworks';

const ARView = () => {
  const [selectedArt, setSelectedArt] = useState(artWorks[0]);
  const [arMode, setArMode] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check for AR/WebXR support
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsSupported(true);
    }
  }, []);

  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setArMode(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please ensure you have granted camera permissions.');
    }
  };

  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setArMode(false);
  };

  useEffect(() => {
    return () => {
      stopAR();
    };
  }, []);

  return (
    <div className="ar-container">
      <div className="ar-header">
        <h2>AR Art Gallery Experience</h2>
        <p>View artwork in augmented reality through your camera</p>
      </div>

      {!arMode ? (
        <div className="ar-setup">
          <div className="art-selector">
            <h3>Select Artwork for AR View</h3>
            <div className="art-selector-grid">
              {artWorks.map((art) => (
                <div
                  key={art.id}
                  className={`art-selector-item ${selectedArt.id === art.id ? 'selected' : ''}`}
                  onClick={() => setSelectedArt(art)}
                >
                  <div
                    className="art-selector-image"
                    style={{ backgroundImage: `url(${art.image})` }}
                  />
                  <p>{art.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="selected-art-preview">
            <div
              className="preview-image"
              style={{ backgroundImage: `url(${selectedArt.image})` }}
            />
            <div className="preview-info">
              <h3>{selectedArt.title}</h3>
              <p>By {selectedArt.artist}</p>
            </div>
          </div>

          {isSupported ? (
            <button className="start-ar-btn" onClick={startAR}>
              🎨 Start AR Experience
            </button>
          ) : (
            <div className="ar-not-supported">
              <p>⚠️ AR features require camera access</p>
              <p>Please use a device with camera support</p>
            </div>
          )}
        </div>
      ) : (
        <div className="ar-view">
          <div className="ar-video-container">
            <video
              ref={videoRef}
              className="ar-video"
              autoPlay
              playsInline
              muted
            />
            <canvas ref={canvasRef} className="ar-canvas" />
            
            {/* AR Art Frame Overlay */}
            <div className="ar-art-overlay">
              <div className="ar-frame">
                <div
                  className="ar-art-display"
                  style={{ backgroundImage: `url(${selectedArt.image})` }}
                />
                <div className="ar-art-label">
                  <h4>{selectedArt.title}</h4>
                  <p>{selectedArt.artist}</p>
                </div>
              </div>
            </div>

            <div className="ar-controls">
              <button className="ar-control-btn" onClick={stopAR}>
                Stop AR
              </button>
              <button 
                className="ar-control-btn secondary"
                onClick={() => {
                  const newIndex = (artWorks.findIndex(a => a.id === selectedArt.id) + 1) % artWorks.length;
                  setSelectedArt(artWorks[newIndex]);
                }}
              >
                Next Artwork
              </button>
            </div>
          </div>

          <div className="ar-instructions">
            <p>📱 Point your camera at a flat surface to view the artwork</p>
            <p>Move your device to explore the artwork from different angles</p>
          </div>
        </div>
      )}

      {/* Alternative AR.js Implementation Info */}
      <div className="ar-info">
        <h3>About AR Features</h3>
        <p>
          This AR view uses your device's camera to overlay artwork. 
          For marker-based AR (using AR.js), you can implement NFT markers 
          or QR codes for more precise positioning.
        </p>
        <p className="ar-note">
          💡 Tip: Use a well-lit environment and hold your device steady for best results
        </p>
      </div>
    </div>
  );
};

export default ARView;

