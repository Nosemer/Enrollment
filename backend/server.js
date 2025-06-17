const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require("path");
dotenv.config();

const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const studentPortalRoutes = require('./routes/studentPortalRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
// Allow CORS from frontend port
app.use(cors({
  origin: "http://localhost:5173", // allow your frontend
  credentials: true,               // if using cookies or auth headers
}));
// const allowedOrigins = ["http://localhost:5173", "https://your-prod-site.com"];

//app.use(cors({
 // origin: function (origin, callback) {
  //  if (!origin || allowedOrigins.includes(origin)) {
   //   return callback(null, true); }
    // return callback(new Error("Not allowed by CORS")); },
  // credentials: true,}));

app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/students', studentRoutes); // Student-related API
app.use('/api/courses', courseRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/student-portal', studentPortalRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
