import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js'; 
import toast from 'react-hot-toast';

const HomePage = () => {

  const [visibleCount, setVisibleCount] = useState(6);
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error fetching notes");
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("An error occurred while fetching notes. Please try again later.");
        }
      }
    };
    fetchNotes();
  }, []);

  // Slice the fetched notes to limit how many are shown initially/after clicking More
  const displayedNotes = notes.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-sm border border-gray-100 p-8 z-10">
        <Navbar />
              {isRateLimited && <RateLimitedUI />}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedNotes.map((note) => (
            <NoteCard key={note._id || note.id} note={note} />
          ))}
        </div>

        {visibleCount < notes.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium rounded-lg border border-gray-200 transition-colors duration-200"
            >
              More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;