import { Link } from 'react-router';

const NoteCard = ({ note }) => {
  // Use _id from MongoDB or fallback to id
  const noteId = note._id || note.id;
  
  // Format dates cleanly. Fallback to basic string if parsed db timestamp doesn't exist
  const createdDate = note.createdAt ? new Date(note.createdAt).toLocaleDateString() : note.date || 'Unknown Date';
  const updatedDate = note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : createdDate;

  return (
    <Link 
      to={`/note/${noteId}`}
      className="bg-white p-6 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col h-full block focus:outline-none focus:ring-2 focus:ring-gray-200"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {note.title}
      </h3>
      
      <p className="text-gray-600 flex-grow mb-4 text-sm leading-relaxed">
        {note.content || note.description}
      </p>
      
      <div className="flex flex-col text-xs font-medium text-gray-400 mt-auto border-t border-gray-50 pt-3">
        <span>Created: {createdDate}</span>
        {updatedDate !== createdDate && (
          <span className="mt-0.5">Last Edited: {updatedDate}</span>
        )}
      </div>
    </Link>
  );
};

export default NoteCard;