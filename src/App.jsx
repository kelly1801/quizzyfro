import React, { useState } from 'react';
import { questions } from "./data";
import GoodImg from "./imagenes/buena.jpg"
import BadImg from "./imagenes/mala.jpg"

function App() {
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false); // New state to track submission

  // Function to select 50 random questions
  function selectRandomQuestions(questions, count) {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Select 50 random questions
  const selectedQuestions = selectRandomQuestions(questions, 50);

  const handleAnswerSelect = (event,questionIndex, selectedAnswer) => {
    event.preventDefault();
    const correctAnswer = selectedQuestions[questionIndex].correctAnswer;

    // Check if the selected answer matches the correct answer
    if (selectedAnswer === correctAnswer) {
      // Increment score if correct
      setScore((prevScore) => prevScore + 1);
    }
  };

  // New function to handle quiz submission
  const handleSubmit = () => {
    setSubmitted(true); // Mark the quiz as submitted
  };

  return (
    <div className="p-24 bg-purple-100">
      <div className="p-8 bg-purple-200 rounded-md">
        {!submitted && selectedQuestions.map((question, questionIndex) => (
          <div key={question.question} className='bg-purple-300 rounded p-2 my-4'>
            <p className='my-2 font-semibold'>{question.question}</p>
            {/* Mapping through answers */}
            <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex} className='font-medium'>
                  <label>
                    <input
                      type="radio"
                      name={`question${questionIndex}`} // Unique name for each question
                      value={answer}
                      onChange={(event) => handleAnswerSelect(event, questionIndex, answer)}
                    />
                    {answer}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {submitted ? (
        <div className='bg-purple-200 flex flex-col justify-center items-center justify-items-center items-center'>
         
         {
          score >= 38 ?
          <>
          <p className='text-5xl text-green-400'>PUNTAJE: {score }</p>
          <p className='text-3xl font-medium'>PICOS EN LA COLA MI AMOR</p>
          <img src={GoodImg} alt="" />
          </>
 : 
 <>
 <p className='text-5xl text-red-400'>PUNTAJE: {score }</p>
 <p className='text-3xl font-medium text-red-400'>A ESTUDIAR VAGA</p>
 <img src={BadImg} alt="" />
 </>
 
         }
          
          <a href="/" className='p-2 bg-purple-600 rounded my-4'>Volver</a>
        </div>
      ) : (
        <>
        <button onClick={handleSubmit} type='submit' className='bg-purple-400 text-2xl w-full p-2 rounded'>
          Enviar
        </button>
        
        </>
        
        
      )}
    </div>
  );
}

export default App;
