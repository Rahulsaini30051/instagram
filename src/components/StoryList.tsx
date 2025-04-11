import React, { useEffect, useState } from "react";
import "../styles/StoryList.scss";

interface Story {
  id: number;
  media: string;
  profile: string
  name: string
}

interface Props {
  onStoryClick: (index: number) => void;
}

const StoryList: React.FC<Props> = ({ onStoryClick }) => {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then(setStories);
  }, []);

  return (
    <div className="story-list">
       {stories.map((story, index) => (
      <figure className="story-box">
       
        <span className="story-preview">
           <img
            key={story.id}
            src={story.profile}
            alt={`story-${story.id}`}
            onClick={() => onStoryClick(index)}
            
          />
        </span> 
        <figcaption>
         {story?.name}
        </figcaption>
      </figure>
      ))}
    </div>
  );
};

export default StoryList;
