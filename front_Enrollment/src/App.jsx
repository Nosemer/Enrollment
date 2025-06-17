import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoutes";
// Pages
import Homepage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import AdminLoginPage from "./pages/adminLoginPage";
import AdminRegisterPage from "./pages/adminRegisterPage";
import AdminDashboard from "./pages/admin/adminDashboard";
import AdminApplications from "./pages/admin/adminApplication";
import AdminCourses from "./pages/admin/adminCourses";
import AdminSubject from "./pages/admin/adminSubject"; 
import AdminGrades from "./pages/admin/adminGrade"; 
import ManageStudent from "./pages/admin/adminManageStudent"; 
import StudentDashboard from "./pages/student/studentDashboard";
import StudentApply from "./pages/student/studentApply";
import StudentStatus from "./pages/student/studentStatus";
import StudentGrades from "./pages/student/studentGrades";


// Example: dashboard pages
// import StudentDashboard from "./pages/student/StudentDashboard";
// import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Student Routes */}
      <Route path="/" element={<Homepage/>}/>
      <Route path="/students/login" element={<LoginPage />} />
      <Route path="/students/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route path="/admins/login" element={<AdminLoginPage />} />
      <Route path="/admins/register" element={<AdminRegisterPage />} />

      {/* Protected Student Dashboard */}
      <Route
        path="/students/dashboard"
        element={
          <ProtectedRoute allowedRoles={["students"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
       <Route
        path="/students/studentApply"
        element={
          <ProtectedRoute allowedRoles={["students"]}>
            <StudentApply />
          </ProtectedRoute>
        }
      />
         <Route
        path="/students/status"
        element={
          <ProtectedRoute allowedRoles={["students"]}>
            <StudentStatus />
          </ProtectedRoute>
        }
      />
    <Route
        path="/students/grades"
        element={
          <ProtectedRoute allowedRoles={["students"]}>
            <StudentGrades />
          </ProtectedRoute>
        }
      />
      {/* Protected Admin Dashboard */}
      <Route
        path="/admins/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admins"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
       <Route
        path="/admins/applications"
        element={
          <ProtectedRoute allowedRoles={["admins"]}>
            <AdminApplications />
          </ProtectedRoute>
        }
      />
        <Route
        path="/admins/courses"
        element={
          <ProtectedRoute allowedRoles={["admins"]}>
            <AdminCourses />
          </ProtectedRoute>
        }
      />
        <Route
        path="/admins/subjects"
        element={
          <ProtectedRoute allowedRoles={["admins"]}>
            <AdminSubject />
          </ProtectedRoute>
        }
      />
      
          <Route
        path="/admins/manageStudent"
        element={
          <ProtectedRoute allowedRoles={["admins"]}>
            <ManageStudent />
          </ProtectedRoute>
        }
      />
          <Route
        path="/admins/grades"
        element={
          <ProtectedRoute allowedRoles={["admins"]}>
            <AdminGrades />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}


export default App;
