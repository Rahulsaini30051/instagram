import "../styles/StoryViewer.scss";

import React, { useEffect, useRef, useState } from "react";

type Story = {
  id: number;
  profile: string;
  media: string;
  name: string
};

interface StoryViewerProps {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const currentStory = stories[currentIndex];

  useEffect(() => {
    setLoading(true);
  
    if (timerRef.current) clearTimeout(timerRef.current);
  
    timerRef.current = setTimeout(() => {
      // Wait 2 more seconds before moving to next
      timerRef.current = setTimeout(() => {
        if (currentIndex === stories.length - 1) {
          onClose();
        } else {
          onNext();
        }
      }, 2000); // 2-second delay
    }, 5000); // Story display duration
  
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);
  
  

  const handleMediaLoad = () => {
    setLoading(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const x = e.clientX;
    const width = window.innerWidth;
    x < width / 2 ? onPrev() : onNext();
  };

  return (
    <div className="story-viewer" onClick={handleClick}>
      {loading && (
        <div className="story-viewer__progress">
          <div className="story-viewer__bar" />
        </div>
      )}

      <button className="story-viewer__close" onClick={onClose}>
        ×
      </button>

      {currentStory.profile === "image" ? (
        <img
          src={currentStory.media}
          onLoad={handleMediaLoad}
          className="story-viewer__media"
        />
      ) : (
        <video
          src={currentStory.media}
          autoPlay
          playsInline
          onLoadedData={handleMediaLoad}
          className="story-viewer__media"
          data-testid="video"
        />
      )}
    </div>
  );
};

export default StoryViewer;
