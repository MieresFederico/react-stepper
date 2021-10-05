import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BankInfo } from './BankInfo';

const mockFn = jest.fn();

const getMoneyInput = () => screen.getByRole('textbox', {
  name: /All the money I have/i,
});

const formId = "test";
const moneyNotMillionaire = 1000;
const moneyMillionaire = 1000000;

describe('Bank Info Form not millionaire', () => {
  beforeEach(() => {
    render(<BankInfo formId={formId} onSubmit={mockFn} defaultValues={{ isMillionaire: false }} />);
  });

  it('initial render', () => {
    expect(getMoneyInput()).toBeInTheDocument();
  });

  it('required validation failures', async () => {
    const moneyInput = getMoneyInput();

    fireEvent.input(moneyInput, { target: { value: moneyMillionaire } });

    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(screen.getByText('Because you said you are not a millionaire you need to have less than 1 million')).toBeInTheDocument();
    });
    expect(mockFn).not.toBeCalled();
  });

  it('successful submit', async () => {
    const moneyInput = getMoneyInput();

    fireEvent.input(moneyInput, { target: { value: moneyNotMillionaire } });

    expect(moneyInput).toHaveValue(moneyNotMillionaire.toString());

    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Because you said you are not a millionaire you need to have less than 1 million')).not.toBeInTheDocument();
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toBeCalledWith({ money: moneyNotMillionaire, isMillionaire: false });
    });
  });
});

describe('Bank Info Form millionaire', () => {

  beforeEach(() => {
    render(<BankInfo formId={formId} onSubmit={mockFn} defaultValues={{ isMillionaire: true }} />);
  });

  it('initial render', () => {
    expect(getMoneyInput()).toBeInTheDocument();
  });

  it('required validation failures', async () => {
    const moneyInput = getMoneyInput();

    fireEvent.input(moneyInput, { target: { value: moneyNotMillionaire } });

    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(async () => {
      expect(screen.getByText('Because you said you are a millionaire you need to have 1 million or more')).toBeInTheDocument();
    });
    expect(mockFn).not.toBeCalled();
  });

  it('successful submit', async () => {
    const moneyInput = getMoneyInput();

    fireEvent.input(moneyInput, { target: { value: moneyMillionaire } });

    expect(moneyInput).toHaveValue(moneyMillionaire.toString());

    const submitButton = document.createElement("button");
    submitButton.setAttribute("form", formId);
    document.body.appendChild(submitButton);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Because you said you are a millionaire you need to have 1 million or more')).not.toBeInTheDocument();
      expect(mockFn).toHaveBeenCalledTimes(1);
      expect(mockFn).toBeCalledWith({ money: moneyMillionaire, isMillionaire: true });
    });
  });
});