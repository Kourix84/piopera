import React from 'react';
import { createRoot } from 'react-dom/client';
import QuizGame from './quizGame.jsx';
import './styles/quiz.css';

createRoot(document.getElementById('root')).render(<QuizGame />);
