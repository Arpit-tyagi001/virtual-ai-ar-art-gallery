import React, { useState } from 'react';
import './AIArtGenerator.css';

const AIArtGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('abstract');
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample AI-generated images (in a real app, these would come from an AI API)
  const sampleImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop',
      prompt: 'Abstract digital art with vibrant colors'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=600&fit=crop',
      prompt: 'Neural network visualization'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop',
      prompt: 'Futuristic landscape with AI elements'
    }
  ];

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation (in a real app, you would call an AI API here)
    // Examples: OpenAI DALL-E, Stability AI, Midjourney API, etc.
    setTimeout(() => {
      // For demo purposes, we'll add a random sample image
      const randomImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
      setGeneratedImages([
        {
          id: Date.now(),
          url: randomImage.url,
          prompt: prompt,
          style: style,
          timestamp: new Date().toLocaleString()
        },
        ...generatedImages
      ]);
      setIsGenerating(false);
      setPrompt('');
    }, 2000);
  };

  const handleSaveToGallery = (image) => {
    // In a real app, this would save to your gallery/database
    alert(`Artwork saved to gallery!\nPrompt: ${image.prompt}\nStyle: ${image.style}`);
  };

  return (
    <div className="ai-generator-container">
      <div className="ai-header">
        <h2>AI Art Generator</h2>
        <p>Create unique artworks using artificial intelligence</p>
      </div>

      <div className="ai-generator-form-container">
        <form className="ai-generator-form" onSubmit={handleGenerate}>
          <div className="form-group">
            <label htmlFor="prompt">Describe your artwork</label>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A serene landscape with mountains and a lake at sunset, in a cyberpunk style..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="style">Art Style</label>
            <select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="abstract">Abstract</option>
              <option value="realistic">Realistic</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="impressionist">Impressionist</option>
              <option value="surreal">Surreal</option>
              <option value="minimalist">Minimalist</option>
              <option value="watercolor">Watercolor</option>
              <option value="digital">Digital Art</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="generate-btn"
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              '✨ Generate Artwork'
            )}
          </button>
        </form>

        <div className="ai-info-box">
          <h3>💡 AI Art Generation Tips</h3>
          <ul>
            <li>Be specific and descriptive in your prompts</li>
            <li>Include details about colors, mood, and composition</li>
            <li>Combine different concepts for unique results</li>
            <li>Experiment with different art styles</li>
          </ul>
          <div className="api-note">
            <strong>Note:</strong> This is a demo. To use real AI generation, integrate with APIs like:
            <ul>
              <li>OpenAI DALL-E</li>
              <li>Stability AI Stable Diffusion</li>
              <li>Midjourney API</li>
              <li>Google Imagen</li>
            </ul>
          </div>
        </div>
      </div>

      {generatedImages.length > 0 && (
        <div className="generated-images-section">
          <h3>Generated Artworks</h3>
          <div className="generated-images-grid">
            {generatedImages.map((image) => (
              <div key={image.id} className="generated-image-card">
                <div
                  className="generated-image"
                  style={{ backgroundImage: `url(${image.url})` }}
                />
                <div className="generated-image-info">
                  <p className="generated-prompt">{image.prompt}</p>
                  <div className="generated-meta">
                    <span className="generated-style">{image.style}</span>
                    <span className="generated-time">{image.timestamp}</span>
                  </div>
                  <button
                    className="save-btn"
                    onClick={() => handleSaveToGallery(image)}
                  >
                    💾 Save to Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {generatedImages.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🎨</div>
          <h3>No artworks generated yet</h3>
          <p>Enter a prompt above to create your first AI-generated artwork!</p>
        </div>
      )}
    </div>
  );
};

export default AIArtGenerator;

