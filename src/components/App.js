import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:4000/questions');
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleAddQuestion = async (newQuestion) => {
    try {
      const response = await fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      setQuestions([...questions, data]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });
      setQuestions(questions.filter(question => question.id !== id));
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleUpdateCorrectAnswer = async (id, correctIndex) => {
    try {
      await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correctIndex }),
      });
      setQuestions(questions.map(question =>
        question.id === id ? { ...question, correctIndex } : question
      ));
    } catch (error) {
      console.error('Error updating correct answer:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>New Question</button>
      {showForm && <QuestionForm onAddQuestion={handleAddQuestion} />}
      <button onClick={fetchQuestions}>View Questions</button>
      <QuestionList
        questions={questions}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
      />
    </div>
  );
}

export default App;
