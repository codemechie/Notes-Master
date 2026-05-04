import { Link } from 'react-router';

const AddButton = () => {
  return (
    <Link
      to="/create"
      className="bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
      title="Create New Note"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </Link>
  );
};

export default AddButton;