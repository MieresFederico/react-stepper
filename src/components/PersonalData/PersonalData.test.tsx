import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { PersonalData } from './PersonalData';

const mockFn = jest.fn();

describe('Personal Data Form', () => {
  const formId = "test";
  const firstName = "system";
  const lastName = "testing";

  const getFirstNameInput = () => screen.getByRole('textbox', {
    name: /First name/i,
  });
  const getLastNameInput = () => screen.getByRole('textbox', {
    name: /Last name/i,
  });
  const getMillionaireCheckbox = () => screen.getByRole('checkbox', {
    name: /I am a millionaire/i,
  });

  beforeEach(() => {
    render(<PersonalData formId={formId} onSubmit={mockFn} />);
  });

  it('initial render', () => {
    expect(getFirstNameInput()).toBeInTheDocument();
    expect(getLastNameInput()).toBeInTheDocument();
    expect(getMillionaireCheckbox()).toBeInTheDocument();
  });

  it('required validation failures', async () => {
    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(screen.getByText('First name is required')).toBeInTheDocument();
      expect(screen.getByText('Last name is required')).toBeInTheDocument();
    });
    expect(mockFn).not.toBeCalled();
  });

  it('successful submit', async () => {
    const firstNameInput = getFirstNameInput();
    const lastNameInput = getLastNameInput();
    const millionaireCheckbox = getMillionaireCheckbox();

    fireEvent.input(firstNameInput, { target: { value: firstName } });
    fireEvent.input(lastNameInput, { target: { value: lastName } });
    fireEvent.click(millionaireCheckbox);

    expect(firstNameInput).toHaveValue(firstName);
    expect(lastNameInput).toHaveValue(lastName);
    expect(millionaireCheckbox).toBeChecked();

    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('First name is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Last name is required')).not.toBeInTheDocument();
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toBeCalledWith({ firstName, lastName, isMillionaire: true });
    });
  });
});