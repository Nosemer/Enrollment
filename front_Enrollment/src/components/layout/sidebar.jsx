import { useAuth } from '../../api/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Optional icon package

const Sidebar = () => {
  const { user, role, logout } = useAuth();
const isApproved = user?.status?.toLowerCase() === 'approved';
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // for mobile drawer

  const handleLogout = () => {
    logout();
    navigate(role === 'admins' ? '/admins/login' : '/students/login');
  };

  const commonLinks = [{ label: 'School Updates', path: '/updates' }];

  const adminLinks = [
    { label: 'Dashboard', path: '/admins/dashboard' },
    { label: 'Applications', path: '/admins/applications' },
    { label: 'Manage Student', path: '/admins/manageStudent' },
    { label: 'Courses', path: '/admins/courses' },
    { label: 'Subjects', path: '/admins/subjects' },
    { label: 'Grades', path: '/admins/grades' }
  ];

  const studentLinks = [
    { label: 'Dashboard', path: '/students/dashboard' },
    { label: 'Apply', path: '/students/studentApply' },
    { label: 'My Status', path: '/students/status' },
    ...(isApproved
      ? [
          { label: 'My Grades', path: '/students/grades' }
        ]
      : [])
  ];

  let linksToRender = [];
  if (role === 'admins') {
    linksToRender = [...adminLinks, ...commonLinks];
  } else if (role === 'students') {
    linksToRender = [...studentLinks, ...commonLinks];
  }

  return (
    <div>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(true)} className="text-dark text-2xl">
          <Menu />
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-white p-6 shadow-lg hidden md:block h-full">
        <h2 className="text-2xl font-bold text-dark mb-6">
          {role === 'admins' ? 'Admin Panel' : 'Student Panel'}
        </h2>
        <ul className="space-y-4">
          {linksToRender.map((link) => (
            <li key={link.path}>
              <Link to={link.path} className ="text-dark hover:bg-blueish text">
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white p-6 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark">
            {role === 'admins' ? 'Admin Panel' : 'Student Panel'}
          </h2>
          <button onClick={() => setIsOpen(false)}>
            <X />
          </button>
        </div>
        <ul className="space-y-4">
          {linksToRender.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-blue-700 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
