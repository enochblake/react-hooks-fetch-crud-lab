// src/QuestionForm.js
import React, { useState } from 'react';

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', ''],
    correctIndex: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'correctIndex' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddQuestion(formData);
    setFormData({
      prompt: '',
      answers: ['', '', ''],
      correctIndex: 0,
    });
  };

  return (
    <div>
      <h2>New Question</h2>
      <form onSubmit={handleSubmit}>
        <label>Prompt:
          <input type="text" name="prompt" value={formData.prompt} onChange={handleChange} />
        </label>
        <label>Answers:
          {formData.answers.map((answer, index) => (
            <input
              key={index}
              type="text"
              value={answer}
              onChange={(e) => handleChange({
                target: { name: 'answers', value: e.target.value, index },
              })}
            />
          ))}
        </label>
        <label>Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {formData.answers.map((answer, index) => (
              <option key={index} value={index}>{answer}</option>
            ))}
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default QuestionForm;
