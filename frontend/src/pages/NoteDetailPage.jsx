import { useParams, Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import { formatDate } from '../lib/util.js';

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteData, setNoteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNoteData(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error(error);
        toast.error('Failed to load note.');
        navigate('/');
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.put(`/notes/${id}`, { title, content });
      setNoteData(res.data);
      toast.success('Note updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to update note');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        toast.success('Note deleted successfully!');
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete note');
      }
    }
  };

  if (!noteData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  const createdDate = formatDate(new Date(noteData.createdAt || noteData.date));
  const updatedDate = noteData.updatedAt ? formatDate(new Date(noteData.updatedAt)) : createdDate;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-gray-500 hover:text-black font-semibold mb-6 inline-block transition-colors duration-200">
          ← Back to ThinkBoard
        </Link>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {!isEditing ? (
            <>
              {/* View Mode */}
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{noteData.title}</h1>
                <div className="flex flex-col text-sm text-gray-500">
                  <span>Created: {createdDate}</span>
                  {updatedDate !== createdDate && (
                    <span className="mt-1">Last updated: {updatedDate}</span>
                  )}
                </div>
              </div>

              <div className="prose prose-sm max-w-none mb-12">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg">{noteData.content}</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Edit Note
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <h1 className="text-3xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Edit Note</h1>
              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-semibold text-gray-800 mb-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="12"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none transition-all duration-200"
                  ></textarea>
                </div>

                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;