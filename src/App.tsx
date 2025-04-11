import React, { useEffect, useState } from 'react';
import StoryList from './components/StoryList';
import StoryViewer from './components/StoryViewer';
import './styles/main.scss';

interface Story {
  id: number;
  profile:   string;
  media: string;
  name: string
}


const App: React.FC = () => {
  const [stories, setStories] = useState<Story[]>([]);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch('/stories.json')
      .then((res) => res.json())
      .then(setStories);
  }, []);

  const closeViewer = () => setViewerIndex(null);
  const goToNext = () =>
    setViewerIndex((prev) =>
      prev !== null && prev < stories.length - 1 ? prev + 1 : prev
    );
  const goToPrev = () =>
    setViewerIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));

  return (
    <div className="app">
      <StoryList onStoryClick={(index) => setViewerIndex(index)} />
      {viewerIndex !== null && (
        <StoryViewer
          stories={stories}
          currentIndex={viewerIndex}
          onClose={closeViewer}
          onNext={goToNext}
          onPrev={goToPrev}
        />
      )}
    </div>
  );
};

export default App;
