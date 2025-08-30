import { render, screen, fireEvent } from '@testing-library/react';
import BlogForm from '../BlogForm';

// Mock the api module
jest.mock('../api/axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: { _id: '123', title: 'Test Post', content: 'Test content' } }))
}));

describe('BlogForm', () => {
  const mockOnPostCreated = jest.fn();

  beforeEach(() => {
    render(<BlogForm onPostCreated={mockOnPostCreated} />);
  });

  test('renders form with all fields', () => {
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/upload image/i)).toBeInTheDocument();
    expect(screen.getByText(/create post/i)).toBeInTheDocument();
  });

  test('allows user to input title and content', () => {
    const titleInput = screen.getByLabelText(/title/i);
    const contentInput = screen.getByLabelText(/content/i);

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    expect(titleInput.value).toBe('Test Title');
    expect(contentInput.value).toBe('Test Content');
  });

  test('shows file name when file is selected', () => {
    const fileInput = screen.getByLabelText(/upload image/i);
    const file = new File(['test'], 'test.png', { type: 'image/png' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText(/selected: test\.png/i)).toBeInTheDocument();
  });
});
