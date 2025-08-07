import React from 'react'
import styles from "../styles/MyCourseCard.module.css"
import { useNavigate } from 'react-router-dom';
import PlayCircleFilledTwoToneIcon from '@mui/icons-material/PlayCircleFilledTwoTone';
import { Rating } from '@mui/material';

export default function MyCourseCard({course,instructor}) {
    const navigate=useNavigate();
    const handleClick=(courseId)=>{
        navigate(`/watch/${courseId}`)
    }
    
  return (
    <div onClick={()=>handleClick(course._id)}>
      <div className={styles.card} onClick={()=>handleClick(course._id)}>
        <div className={styles.thumbnailWrapper}>
            <img className={styles.cardThumbnail} src={course.thumbnail} alt="" />
            <div className={styles.playIcon}>
              <PlayCircleFilledTwoToneIcon style={{fontSize:"3rem",color:"#4b4b51ff"}}/>
            </div>
        </div>
            <div className={styles.cardBody}>
              <h3 className={styles.title}>{course.title}</h3>
              {<p className={styles.instructor}>By {instructor}</p>}
              <div style={{display:"flex",gap:"2px",alignItems:"center"}}>
        <p style={{fontSize:"1.1rem",color:"#f26208ff"}}> <b> {course.averageRating}</b></p>
        <Rating sx={{padding:"1px 0px"}}  size="small" name="half-rating-read" value={course.averageRating} precision={0.5} readOnly />
        <p style={{color:"#827d7dff",fontSize:"0.7rem"}}>({course.review.length})</p>
          </div>
            </div>
          </div>
    </div>
  )
}
