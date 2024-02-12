import React from 'react';

function QuestionList({ questions, onDeleteQuestion, onUpdateCorrectAnswer }) {
  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <div>
              <p>{question.prompt}</p>
              <p>Correct Answer: {question.answers[question.correctIndex]}</p>
              <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
              <select
                value={question.correctIndex}
                onChange={(e) => onUpdateCorrectAnswer(question.id, parseInt(e.target.value))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>{answer}</option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
