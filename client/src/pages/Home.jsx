import React, { useEffect, useState } from 'react'
import api from "../services/axios"
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import Spinner from '../components/Spinner';
import CourseCard from '../components/CourseCard';
import styles from "../styles/Home.module.css"
import { useAuth } from '../context/AuthContext';

//todo - global loader

export default function Home() {
    const [courses,setCourses]=useState([]);
    const [instructors,setInstructors]=useState([]);
    const [loading,setLoading]=useState(true);
    const {user}=useAuth();
    
    const navigate=useNavigate();

    const handleClick=(courseId)=>{
        navigate(`/courses/${courseId}`);
    }

    const fetchData=async ()=>{
        try{
        const response=await api.get("/courses");
        setCourses(response.data?.courses || []);
        setInstructors(response.data?.instructors || []);
        }catch(e){
            console.error("Error fetching courses",e);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

  if(loading) return <Spinner/>  
  return (
    <>
    {/* <VideoPlayer publicId={"Udemy/Videos/rx39qxtkbxx7xx6nxjge"}/> */}
     {/* <VideoPlayer id="player1" publicId="Udemy/Videos/rx39qxtkbxx7xx6nxjge" /> */}
     {/* <VideoPlayer
        id="player2"
        publicId="Udemy/Videos/rx39qxtkbxx7xx6nxjge"
        playerConfig={{
          muted: true,
          posterOptions: {
            transformation: { effect: 'blur' },
          },
        }}
        sourceConfig={{
          info: { title: 'Glide Over Coastal Beach' },
        }}
      /> */}

      
<div className={styles.homeContainer}>
  {/* <div className={styles.topContainer}>
    <h2>Welcome {user.username}</h2>
  </div> */}
    <div className={styles.courseContainer}>

      {courses.map((course,i)=>{
        return <CourseCard course={course} key={i}/>
      })}

      {/* //TODO instructor cards */}
         {/* <ul>
            {instructors.map((instructor,i)=>{return <div key={i} style={{width:"150px",height:"150px",background:"purple",margin:"5px"}}>{instructor.username}

            </div>})}
        </ul> */}
    </div>
    </div>
    </>
  )
}
