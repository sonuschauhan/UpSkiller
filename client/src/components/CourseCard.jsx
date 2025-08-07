import React from 'react'
import styles from "../styles/CourseCard.module.css"
import { useNavigate } from 'react-router-dom';
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
import VideoLibraryTwoToneIcon from '@mui/icons-material/VideoLibraryTwoTone';
import { Rating } from '@mui/material';
export default function CourseCard({course,dashboard}) {
  const navigate=useNavigate();
  const handleClick=(courseId)=>{
    if(!dashboard){
      navigate(`/courses/${courseId}`);
    } 
    }
  const handleEditClick=(courseId)=>{
    navigate(`/instructor/course/${courseId}/manage`);
  } 
  
  return (
    <div className={styles.card} onClick={()=>handleClick(course._id)}>
      <img className={styles.cardThumbnail} src={course.thumbnail} alt="" />
      <div className={styles.cardBody}>
        <h3 className={styles.title}>{course.title}</h3>
        {
          dashboard && 
          <div className={styles.stats}> <Groups2TwoToneIcon/> <p>Enrolled Student : {course.studentsCount}</p>
          </div>
        }
        {
          dashboard && 
          <div className={styles.stats}> <VideoLibraryTwoToneIcon/> <p>total videos : {course.totalVideos}</p></div>
        }
        
        {!dashboard &&<p className={styles.instructor}>By {course.instructor.username}</p>}
        <div style={{display:"flex",gap:"2px",alignItems:"center"}}>
        <p style={{fontSize:"1.1rem",color:"#f26208ff"}}> <b> {course.averageRating}</b></p>
        <Rating sx={{padding:"1px 0px"}}  size="small" name="half-rating-read" value={course.averageRating} precision={0.5} readOnly />
        <p style={{color:"#827d7dff",fontSize:"0.7rem"}}>({course.review.length})</p>
          </div>
          
        {!dashboard && <p className={styles.price}>₹{course.price}</p>}
        {dashboard && <button className={styles.editButton} onClick={()=>handleEditClick(course._id)}>Edit Course</button>}
      </div>
    </div>
  )
}
