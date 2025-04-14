import "../styles/StoryViewer.scss";
import React, { useEffect, useRef, useState } from "react";

type Story = {
  id: number;
  profile: string;
  media: string;
  name: string;
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentStory = stories[currentIndex];

  useEffect(() => {
    setLoading(true);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (currentStory.profile === "image") {
      timerRef.current = setTimeout(() => {
        timerRef.current = setTimeout(() => {
          if (currentIndex === stories.length - 1) {
            onClose();
          } else {
            onNext();
          }
        }, 2000);
      }, 5000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentIndex]);

  const handleMediaLoad = () => {
    setLoading(false);
  };

  const handleVideoEnd = () => {
    timerRef.current = setTimeout(() => {
      if (currentIndex === stories.length - 1) {
        onClose();
      } else {
        onNext();
      }
    }, 2000); 
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.clientX;
    const windowWidth = window.innerWidth;
  
    if (clickX < windowWidth / 2) {
      onPrev(); 
    } else {
      onNext(); 
    }
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
          alt={currentStory.name}
        />
      ) : (
        <video
          ref={videoRef}
          src={`${currentStory.media}?t=${currentStory.id}`}
          autoPlay
          playsInline
          onLoadedData={handleMediaLoad}
          onEnded={handleVideoEnd}
          className="story-viewer__media"
        />
      )}
    </div>
  );
};

export default StoryViewer;
