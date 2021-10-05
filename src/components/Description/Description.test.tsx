import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Description } from './Description';

const mockFn = jest.fn();

describe('Description Form', () => {
  const formId = "test";
  const description = "example description";

  const getDescriptionInput = () => screen.getByRole('textbox', {
    name: /Description/i,
  });

  beforeEach(() => {
    render(<Description formId={formId} onSubmit={mockFn} />);
  });

  it('initial render', () => {
    expect(getDescriptionInput()).toBeInTheDocument();
  });

  it('successful submit', async () => {
    const descriptionInput = getDescriptionInput();

    fireEvent.input(descriptionInput, { target: { value: description } });

    expect(descriptionInput).toHaveValue(description);

    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toBeCalledWith({ description });
    });
  });
});