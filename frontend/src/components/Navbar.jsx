import AddButton from "./AddButton";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800">ThinkBoard</h1>
          <AddButton />
    </div>
  );
};

export default Navbar;