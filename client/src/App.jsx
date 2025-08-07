import { useState } from 'react'
import {Route,Routes} from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import BecomeInstructor from './pages/BecomeInstructor';
import InstructorDashboard from './pages/InstructorDashboard';
import CreateCourse from './pages/CreateCourse';
import CourseManager from './pages/CourseManager';
import MyCourses from './pages/MyCourses';
import CourseDescription from './pages/CourseDescription';
import WatchCourse from './pages/WatchCourse';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>

    <Route path='/courses/:courseId' element={
      <CourseDescription/>
      }/>

    <Route path='/my-courses' element={
      <ProtectedRoute>
      <MyCourses/>
      </ProtectedRoute>
      }/>

    <Route path='/become-instructor' element={
      <ProtectedRoute>
      <BecomeInstructor/>
      </ProtectedRoute>}/>

    <Route path='/instructor/dashboard' element={
      <ProtectedRoute role="instructor">
      <InstructorDashboard/>
      </ProtectedRoute>
      }/>

    <Route path="/instructor/course/:courseId/manage" element={
      <ProtectedRoute role="instructor">
      <CourseManager />
      </ProtectedRoute>
      } />

    <Route path='/courses/create' element={
      <ProtectedRoute role="instructor">
      <CreateCourse/>
      </ProtectedRoute>}/>
    

    <Route path='/watch/:courseId' element={
      <ProtectedRoute>
      <WatchCourse/>
      </ProtectedRoute>}/>

      <Route path='*' element={<NotFound/>}/>








   </Routes>
  )
}

export default App
