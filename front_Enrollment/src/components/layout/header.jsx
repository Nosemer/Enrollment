import { Link } from "react-router-dom";
import { useAuth } from "../../api/authContext";
import {
  LayoutDashboard,
  Users,
  FileText,
  ClipboardList,
  Book,
  BookOpen,
  GraduationCap,
  CalendarCheck,
  Bell,
  Settings
} from "lucide-react";
import Avatar from "../ui/avatar";

const Header = () => {
    const { user, role, logout } = useAuth();
   const isApproved = user?.status === 'approved';
const avatarURL = user?.avatar
  ? `http://localhost:5000/upload/${user.avatar}`
  : null;

  const adminIcons = [
    { icon: <LayoutDashboard />, path: "/admins/dashboard", title: "Dashboard" },
    { icon: <Users />, path: "/admins/students", title: "Students" },
    { icon: <FileText />, path: "/admins/applications", title: "Applications" },
    { icon: <ClipboardList />, path: "/admins/manageStudent", title: "Manage Student" },
    { icon: <Book />, path: "/admins/courses", title: "Courses" },
    { icon: <BookOpen />, path: "/admins/subjects", title: "Subjects" },
    { icon: <GraduationCap />, path: "/admins/grades", title: "Grades" },
    { icon: <CalendarCheck />, path: "/admins/attendance", title: "Attendance" }
  ];

  const studentIcons = [
    { icon: <LayoutDashboard />, path: "/students/dashboard", title: "Dashboard" },
    { icon: <ClipboardList />, path: "/students/apply", title: "Apply" },
    { icon: <FileText />, path: "/students/status", title: "My Status" },
    ...(isApproved
      ? [
          { label: 'My Grades', path: '/students/grades' },
          { label: 'My Attendance', path: '/students/attendance' }
        ]
      : [])
  ];

  const commonIcons = [
    { icon: <Bell />, path: "/updates", title: "School Updates" }
  ];

  const links = role === "admins"
    ? [...adminIcons, ...commonIcons]
    : [...studentIcons, ...commonIcons];

  return (
    <header className="bg-white shadow flex justify-between items-center px-6 py-3 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {links.map((link, idx) => (
          <Link
            key={idx}
            to={link.path}
            title={link.title}
            className="text-dark hover:text-blueish transition"
          >
            {link.icon}
          </Link>
        ))}
      </div>

      {/* Right side (Notifications, Profile, Settings) */}
      <div className="flex items-center gap-4">
        <Link to="/settings" title="Settings" className="text-dark hover:text-blueish">
          <Settings />
        </Link>
          <Link to={`/profile/${user?.id}`} title="Profile">
          <Avatar
  src={avatarURL}
  alt={user?.name || "User"}
  size="sm"
/>

        </Link>
      </div>
    </header>
  );
};

export default Header;
