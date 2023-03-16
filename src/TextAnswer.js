import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TriviaGame from './TriviaGame';

describe('TriviaGame', () => {
  test('renders a question and form', () => {
    render(<TriviaGame />);
    const questionElement = screen.getByRole('heading', { level: 2 });
    expect(questionElement).toBeInTheDocument();
    const answerInput = screen.getByLabelText('Answer:');
    expect(answerInput).toBeInTheDocument();
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('shows an error message when the user submits the form without entering an answer', () => {
    render(<TriviaGame />);
    const submitButton = screen.getByRole('button', { name: 'Submit' });
    const messageElement = screen.getByText('Please enter an answer.');
    fireEvent.click(submitButton);
    expect(messageElement).toBeInTheDocument();
  });
});
