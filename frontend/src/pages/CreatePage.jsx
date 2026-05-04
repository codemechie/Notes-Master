import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';

const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await api.post('/notes', {
        title,
        content
      });
      toast.success('Note created successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create note');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <Link to="/" className="text-gray-500 hover:text-black font-semibold mb-6 inline-block transition-colors duration-200">
          ← Back to ThinkBoard
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Note</h1>
          <p className="text-gray-500 mb-8 border-b border-gray-100 pb-6">Write down your thoughts and ideas</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-sm font-semibold text-gray-800 mb-2">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note content here..."
                rows="10"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition-all duration-200"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isLoading ? 'Creating...' : 'Create Note'}
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg text-center transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;