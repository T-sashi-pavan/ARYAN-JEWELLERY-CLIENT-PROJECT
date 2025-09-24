import React from 'react';
import './VideoSection.css';

const VideoSection = () => {
  return (
    <section className="video-section">
      <div className="container">
        <div className="video-placeholder">
          <div className="video-content">
            <h2>VIDEO SECTION AS AN AD</h2>
            <div className="play-button">
              <div className="play-icon">▶</div>
            </div>
          </div>
          <div className="video-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
