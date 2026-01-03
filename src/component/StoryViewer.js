import { useEffect, useState } from "react";

const StoryViewer = ({ story, onClose }) => {
  const [progress, setProgress] = useState(0);
  const STORY_DURATION = 10; // 10 seconds

  useEffect(() => {
    // Reset progress when story changes
    setProgress(0);

    // Start timer
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000; // elapsed time in seconds
      const newProgress = (elapsed / STORY_DURATION) * 100;

      if (newProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        // Close story after duration
        setTimeout(() => {
          onClose();
        }, 100);
      } else {
        setProgress(newProgress);
      }
    }, 50); // Update every 50ms for smooth animation

    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [story, onClose]);

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="story-viewer-overlay" onClick={handleClose}>
      <div
        className="story-viewer-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Progress bar at top */}
        <div className="story-progress-bar-container">
          <div
            className="story-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Story image */}
        <div className="story-image-container">
          <img
            src={story.image}
            alt={story.username}
            className="story-full-image"
          />
        </div>

        {/* Story info at bottom */}
        <div className="story-viewer-bottom">
          <div className="story-viewer-username">{story.username}</div>
        </div>

        {/* Close button */}
        <button className="story-viewer-close" onClick={handleClose}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;
