import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import StudentProfile from './pages/student/StudentProfile'
import StudentHome from './pages/student/StudentHome'
import StudentLayout from './pages/student/StudentLayout'
import StudentSubjectList from './pages/student/StudentSubjectList'
import StudentPendingTasks from './pages/student/StudentPendingTasks'
import StudentSubmissionView from './pages/student/StudentSubmissionView'
import StudentLessonDetail from './pages/student/StudentLessonDetail'
import AdminUserList from './pages/admin/AdminUserList '
import AdminCourseList from './pages/admin/AdminCourseList '
import AdminLayout from './pages/admin/AdminLayout'
import LessonDetailPage from './pages/admin/LessonDetailPage'
import AdminAssignmentList from './pages/admin/AdminAssignmentList'
import SubmissionDetail from './pages/admin/SubmissionDetail'
import AdminDashboard from './pages/admin/AdminDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes >
 
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route path='/student' element={<StudentLayout/>}>
          <Route path="" element={<StudentHome/>} />
          <Route path="profile" element={<StudentProfile/>} />
          <Route path="subjects" element={<StudentSubjectList/>} />
          <Route path="tasks/pending" element={<StudentPendingTasks/>} />
          <Route path="tasks/completed" element={<StudentSubmissionView/>} />
          <Route path="lesson/:lessonId" element={<StudentLessonDetail/>} />
        </Route>


        <Route path='/admin' element={<AdminLayout/>}>
           <Route path="" element={<AdminDashboard/>} />
           <Route path="users" element={<AdminUserList/>} />
           <Route path="course" element={<AdminCourseList/>} />
           <Route path="lessons/:lessonId" element={<LessonDetailPage />} />
           <Route path="assignment" element={<AdminAssignmentList/>} />
        <Route path="submission/:id" element={<SubmissionDetail />} />           
        </Route>



      </Routes>
    </BrowserRouter>
  )
}

export default App
