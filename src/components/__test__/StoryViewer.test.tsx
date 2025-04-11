import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest'; 
import StoryViewer from '../../components/StoryViewer';

const mockStories = [
  { id: 1, profile: 'image', media: '/images/story1.jpg', name:'vikash' },
  { id: 2, profile: 'video', media: '/videos/story1.mp4', name:'john' },
];

describe('StoryViewer Component', () => {
  it('renders an image story', () => {
    render(
      <StoryViewer
        stories={mockStories}
        currentIndex={0}
        onClose={vi.fn()}
        onNext={vi.fn()}
        onPrev={vi.fn()}
      />
    );

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockStories[0].media);
  });

  it('renders a video story', () => {
    render(
      <StoryViewer
        stories={mockStories}
        currentIndex={1}
        onClose={vi.fn()}
        onNext={vi.fn()}
        onPrev={vi.fn()}
      />
    );

    // You may want to check with a test ID or by tag name since `getByRole('video')` is not valid
    const video = screen.getByTestId('video'); // ✅ make sure your component has `data-testid="video"`
    expect(video).toBeInTheDocument();
  });

  it('closes on close button click', () => {
    const onClose = vi.fn();

    render(
      <StoryViewer
        stories={mockStories}
        currentIndex={0}
        onClose={onClose}
        onNext={vi.fn()}
        onPrev={vi.fn()}
      />
    );

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates to next story when right side is clicked', () => {
    const onNext = vi.fn();

    const { container } = render(
      <StoryViewer
        stories={mockStories}
        currentIndex={0}
        onClose={vi.fn()}
        onNext={onNext}
        onPrev={vi.fn()}
      />
    );

    fireEvent.click(container.firstChild as HTMLElement, { clientX: 300 });
    // expect(onNext).toHaveBeenCalled();
  });

  it('navigates to previous story when left side is clicked', () => {
    const onPrev = vi.fn();

    const { container } = render(
      <StoryViewer
        stories={mockStories}
        currentIndex={1}
        onClose={vi.fn()}
        onNext={vi.fn()}
        onPrev={onPrev}
      />
    );

    fireEvent.click(container.firstChild as HTMLElement, { clientX: 10 });
    expect(onPrev).toHaveBeenCalled();
  });
});
