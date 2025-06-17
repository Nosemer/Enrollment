import Sidebar from './sidebar';
import Navbar from './navbar';

const AdminLayout = ({ user, children, onLogout }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col">
        <Navbar user={user} onLogout={onLogout} />
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
