import React, { useEffect, useState } from 'react'
import api from '../services/axios'
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import MyCourseCard from '../components/MyCourseCard';
import CourseCard from '../components/CourseCard';
import styles from "../styles/InstructorDashboard.module.css";
import Button from '@mui/material/Button';

export default function InstructorDashboard() {
const [courses,setCourses]=useState([]);
const [totalCourse,setTotalCourse]=useState(0);
const [loading, setLoading] = useState(true);


const navigator=useNavigate();
    useEffect(()=>{
        async function fetchData(){
            try{
            const res=await api.get("/instructor/dashboard");
            // console.log(res.data);
            setCourses(res.data.courseStats);
            console.log(res.data.courseStats);
            setTotalCourse(res.data.totalCourses);
            
            }catch(e){
                console.error(e);
            }finally{
              setLoading(false);
              
            }
            
        }
        fetchData();
        
    },[])
    const handleClick=()=>{
        navigator("/courses/create");
    }
    const handleCardClick=(courseId)=>{
        navigator(`/instructor/course/${courseId}/manage`)
    }
  if(loading) return <Spinner/>  
  return (
    <div>
      <div className={styles.topContainer}>
        <h1>My dashboard</h1>
        <h2>total Courses : {totalCourse}</h2>
      </div>
      <div className={styles.courseContainer}>
      {
        courses.map((course,i)=>{
          return <CourseCard key={i} course={course} dashboard={true}/>
        })
      }
      </div>
      <div style={{padding:"0rem 2rem"}}>
        <Button variant="contained" style={{backgroundColor:"#5022c3"}} onClick={handleClick}>Create course</Button>
      </div>
      
      

      
    </div>
  )
}
