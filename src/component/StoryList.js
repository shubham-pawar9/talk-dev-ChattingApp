import { useState } from "react";
import StoryViewer from "./StoryViewer";

const StoryList = () => {
  // Mock data for stories - in a real app, this would come from props or API
  const [stories, setStories] = useState([
    {
      id: 1,
      username: "John",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      viewed: false,
    },
    {
      id: 2,
      username: "Sarah",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      viewed: false,
    },
    {
      id: 3,
      username: "Mike",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      viewed: true,
    },
    {
      id: 4,
      username: "Emma",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      viewed: false,
    },
    {
      id: 5,
      username: "Alex",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      viewed: true,
    },
    {
      id: 6,
      username: "Lisa",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
      viewed: false,
    },
  ]);

  const [selectedStory, setSelectedStory] = useState(null);
  const [showStoryViewer, setShowStoryViewer] = useState(false);

  const handleAddStory = () => {
    // Handle add story functionality
    console.log("Add story clicked");
    // You can open a modal, navigate to story creation, etc.
  };

  const handleStoryClick = (story) => {
    // Mark story as viewed
    setStories((prevStories) =>
      prevStories.map((s) => (s.id === story.id ? { ...s, viewed: true } : s))
    );

    // Open story viewer
    setSelectedStory(story);
    setShowStoryViewer(true);
  };

  const handleCloseStoryViewer = () => {
    setShowStoryViewer(false);
    setSelectedStory(null);
  };

  return (
    <div className="story-list-container">
      <div className="story-list-wrapper">
        {/* Add Story Circle - First Item */}
        <div className="story-item add-story" onClick={handleAddStory}>
          <div className="story-circle add-story-circle">
            <div className="add-story-icon-wrapper">
              <svg
                className="add-story-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </div>
          </div>
          <span className="story-username">Your Story</span>
        </div>

        {/* Story View Circles */}
        {stories.map((story) => (
          <div
            key={story.id}
            className="story-item"
            onClick={() => handleStoryClick(story)}
          >
            <div
              className={`story-circle ${story.viewed ? "viewed" : "unviewed"}`}
            >
              <img src={story.image} alt={story.username} />
            </div>
            <span className="story-username">{story.username}</span>
          </div>
        ))}
      </div>
      {showStoryViewer && selectedStory && (
        <StoryViewer story={selectedStory} onClose={handleCloseStoryViewer} />
      )}
    </div>
  );
};

export default StoryList;
