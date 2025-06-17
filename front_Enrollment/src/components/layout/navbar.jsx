const Navbar = ({ user, onLogout }) => (
  <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
    <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
    <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
      Logout
    </button>
  </header>
);

export default Navbar;
