import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock the PostsList component to isolate the test of the Home component.
// This prevents PostsList's internal logic (e.g., API calls, complex rendering) from running
// during Home component's test, allowing us to focus on Home's direct responsibilities.
jest.mock('./posts/page', () => {
  const MockPostsList = () => <div data-testid="mock-posts-list">Mock Posts List Content</div>;
  MockPostsList.displayName = 'PostsList'; // Helps in debugging with component names
  return MockPostsList;
});

describe('Home Component', () => {
  /**
   * Test Case: Home component renders successfully
   * Description: Checks if the Home component mounts and renders without throwing errors.
   * Importance: high
   */
  it('renders successfully without crashing', () => {
    render(<Home />);
    // If no error is thrown during render, and the mock child is found, the component rendered successfully.
    expect(screen.getByTestId('mock-posts-list')).toBeInTheDocument();
  });

  /**
   * Test Case: Home component displays the PostsList component
   * Description: Verifies that the PostsList component is rendered as a child of Home.
   * Importance: high
   */
  it('displays the PostsList component', () => {
    render(<Home />);
    // Check if the mocked PostsList component is present in the document.
    const postsListComponent = screen.getByTestId('mock-posts-list');
    expect(postsListComponent).toBeInTheDocument();
    expect(postsListComponent).toHaveTextContent('Mock Posts List Content');
  });

  /**
   * Test Case: Home component renders with the correct wrapper div
   * Description: Ensures the root element rendered by the Home component is a `div` element.
   * Importance: medium
   */
  it('renders with the correct wrapper div', () => {
    const { container } = render(<Home />);

    // The Home component structure is `<div><PostsList /></div>`.
    // We expect the direct child of the container (which represents the rendered component) to be a DIV.
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement);

    // Additionally, verify that this div contains the PostsList component.
    expect(container.firstChild).toContainElement(screen.getByTestId('mock-posts-list'));
  });
});
