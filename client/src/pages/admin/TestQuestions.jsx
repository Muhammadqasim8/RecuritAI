// src/components/admin/TestQuestions.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMcqsForTest, updateMCQ, deleteMCQ } from '../../../services/adminService';

const TestQuestions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [mcqs, setMcqs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMcqs = async () => {
      try {
        const data = await getMcqsForTest(testId);
        setMcqs(data);
      } catch (err) {
        setError('Failed to load MCQs');
      } finally {
        setLoading(false);
      }
    };

    fetchMcqs();
  }, [testId]);

  const handleEditClick = (mcq) => {
    setEditingId(mcq.id);
    setEditData({ ...mcq });
  };

  const handleUpdate = async () => {
    try {
      await updateMCQ(editingId, editData);
      const updated = mcqs.map((m) => (m.id === editingId ? { ...editData, id: editingId } : m));
      setMcqs(updated);
      setEditingId(null);
    } catch (err) {
      alert('Error updating MCQ');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this MCQ?')) return;
    try {
      await deleteMCQ(id);
      setMcqs(mcqs.filter((m) => m.id !== id));
    } catch (err) {
      alert('Error deleting MCQ');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Questions</h2>
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-500 hover:underline">← Back</button>

      {mcqs.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <div className="space-y-4">
          {mcqs.map((mcq) => (
            <div key={mcq.id} className="bg-white shadow rounded-lg p-4">
              {editingId === mcq.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editData.question_text}
                    onChange={(e) => setEditData({ ...editData, question_text: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    {['a', 'b', 'c', 'd'].map((opt) => (
                      <input
                        key={opt}
                        value={editData[`option_${opt}`]}
                        onChange={(e) =>
                          setEditData({ ...editData, [`option_${opt}`]: e.target.value })
                        }
                        placeholder={`Option ${opt.toUpperCase()}`}
                        className="p-2 border rounded"
                      />
                    ))}
                  </div>
                  <select
                    value={editData.correct_option}
                    onChange={(e) =>
                      setEditData({ ...editData, correct_option: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Correct Option</option>
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold">{mcq.question_text}</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>A. {mcq.option_a}</li>
                    <li>B. {mcq.option_b}</li>
                    <li>C. {mcq.option_c}</li>
                    <li>D. {mcq.option_d}</li>
                  </ul>
                  <p className="text-sm text-green-600 mt-1">Correct: {mcq.correct_option}</p>
                  <div className="flex gap-4 mt-2">
                    <button onClick={() => handleEditClick(mcq)} className="text-blue-500 hover:underline">Update</button>
                    <button onClick={() => handleDelete(mcq.id)} className="text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestQuestions;
