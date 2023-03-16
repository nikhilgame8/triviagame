import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TriviaGame = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('https://opentdb.com/api.php?amount=1')
            .then(response => {
                const data = response.data.results[0];
                setQuestion(data.question);
                setAnswer(data.correct_answer);
            })
            .catch(error => console.log(error));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const userAnswer = event.target.answer.value;
        if (userAnswer === answer) {
            setMessage('Correct!');
        } else {
            setMessage(`Incorrect. The correct answer is ${answer}.`);
        }
        event.target.answer.value = '';
        axios.get('https://opentdb.com/api.php?amount=1')
            .then(response => {
                const data = response.data.results[0];
                setQuestion(data.question);
                setAnswer(data.correct_answer);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="triviaGameContainer">
            <h1>Trivia Game</h1>
            <div className="triviaGame">
                <h2>{question}</h2>
                <form className='gameForm' onSubmit={handleSubmit}>
                    <label htmlFor="answer">Answer:</label>
                    <input type="text" id="answer" placeholder='Write your answer here...' name="answer" required />
                    <button type="submit">Submit</button>
                </form>
                <p className='answerShow'>{message}</p>
            </div>
        </div>
    );
};

export default TriviaGame;
