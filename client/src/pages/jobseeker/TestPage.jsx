import React, { useEffect, useState } from 'react';
import { getTestQuestions, submitTest } from '../../../services/jobSeekerService';
import { useParams } from 'react-router-dom';

const MCQTest = () => {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const data = await getTestQuestions(testId);
        setQuestions(data);
      } catch (err) {
        setError('Failed to load questions.');
      } finally {
        setLoading(false);
      }
    };

    if (testId) fetchQuestions();
  }, [testId]);

const handleAnswer = (questionId, selectedOption, correctOption) => {
  // Prevent changing answer once selected
  if (answers[questionId]) return;

  // Convert 'a' → 'option_a', 'b' → 'option_b', etc.
  const normalizedCorrectOption = `option_${correctOption.toLowerCase()}`;

  const isCorrect = selectedOption === normalizedCorrectOption;

  setAnswers((prev) => ({
    ...prev,
    [questionId]: {
      selectedOption,
      isCorrect,
    },
  }));
};

  const handleSubmit = async () => {
    const totalScore = Object.values(answers).filter((a) => a.isCorrect).length;

    try {
      // ✅ Make sure we pass both testId and score in the body
      const result = await submitTest({ testId, score: totalScore });
      setScore(totalScore);
      setSubmitted(true);
      alert(`Test submitted! Your new rank: ${result.newRank}`);
    } catch (err) {
      alert('Error submitting test.');
    }
  };

  const allAnswered = questions.length > 0 && Object.keys(answers).length === questions.length;

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">MCQ Test</h2>

      {questions.map((q, index) => (
        <div key={q.id} className="mb-6 p-4 border rounded shadow">
          <p className="font-medium mb-2">Q{index + 1}: {q.question_text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {['option_a', 'option_b', 'option_c', 'option_d'].map((optKey) => {
              const optionLabel = q[optKey];
              const selected = answers[q.id]?.selectedOption === optKey;

              return (
                <button
                  key={optKey}
                  disabled={!!answers[q.id]}
                  onClick={() => handleAnswer(q.id, optKey, q.correct_option)}
                  className={`p-2 border rounded transition-colors ${
                    selected
                      ? answers[q.id]?.isCorrect
                        ? 'bg-green-200'
                        : 'bg-red-200'
                      : 'bg-white hover:bg-blue-100'
                  } ${answers[q.id] ? 'cursor-not-allowed opacity-60' : ''}`}
                >
                  {optionLabel}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && allAnswered && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Test
        </button>
      )}

      {submitted && (
        <div className="mt-6 p-4 border rounded bg-green-100 text-green-800">
          ✅ Test submitted! Your score: <strong>{score}</strong> / {questions.length}
        </div>
      )}
    </div>
  );
};

export default MCQTest;