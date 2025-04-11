import { vi } from "vitest"; // ✅ add this
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import StoryList from "../../components/StoryList";

const mockStories = [
  { id: 1, media: "media1.jpg", profile: "profile1.jpg", name: "John Doe" },
  { id: 2, media: "media2.jpg", profile: "profile2.jpg", name: "Jane Smith" },
];

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    json: vi.fn().mockResolvedValue(mockStories),
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("StoryList component", () => {
  test("renders stories after fetch", async () => {
    const mockClick = vi.fn();
    render(<StoryList onStoryClick={mockClick} />);

    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });
  });

  test("calls onStoryClick when an image is clicked", async () => {
    const mockClick = vi.fn();
    render(<StoryList onStoryClick={mockClick} />);

    await waitFor(() => screen.getByAltText("story-1"));

    fireEvent.click(screen.getByAltText("story-1"));

    expect(mockClick).toHaveBeenCalledWith(0);
  });
});
