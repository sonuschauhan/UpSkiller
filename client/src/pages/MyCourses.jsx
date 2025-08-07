import React, { useEffect, useState } from 'react'
import api from '../services/axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import MyCourseCard from '../components/MyCourseCard';
import styles from "../styles/MyCourse.module.css"


export default function MyCourses() {
    const [courses , setCourses]=useState([]);
    const [instructor,setInstructor]=useState("");
    const navigate=useNavigate();
    const [loading, setLoading] = useState(true);
    
    

    useEffect(()=>{
        async function fetchCourses(){
        try{
            const res=await api.get("/users/my-courses");
            setCourses(res.data.courses);
            setInstructor(res.data.instructor);
        }catch(e){
            console.log(e);
        }finally{
          setLoading(false)
        }
    }
    fetchCourses();
    },[]);
    const handlePlayCourse=(courseId)=>{
        navigate(`/watch/${courseId}`);
        
    }
  if(loading) return <Spinner/>  
  return (
    <div>
      <div className={styles.topContainer}>
        <h1 >My learning</h1>
      </div>
      <div className={styles.courseContainer}>
        {courses.map((course,i)=>{
        return <MyCourseCard course={course} instructor={instructor} key={i}/>
      })}
      </div>
      
      
    </div>
  )
}
