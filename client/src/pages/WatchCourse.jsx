import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../services/axios';
import VideoPlayer from '../components/VideoPlayer';
import styles from "../styles/WatchCourse.module.css"
import Spinner from '../components/Spinner';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';

export default function WatchCourse() {
    const [videos,setVideos]=useState([]);
    const {courseId}=useParams();
     const [loading, setLoading] = useState(true);
     const [videoTitle,setVideoTitle]=useState("");
    const [selectedVideo,setSelectedVideo]=useState(null);

    const handleSelectVideo=(publicId,title)=>{
      setSelectedVideo(publicId);
      setVideoTitle(title);
      
    }
    useEffect(()=>{
      async function fetchVideos(){
        try{
          const res=await api.get(`courses/${courseId}/content`);
          setVideos(res.data);
          setSelectedVideo(res.data[0].public_id)
          setVideoTitle(res.data[0].title)
        }catch(e){
          console.log(e);
        }finally{
          setLoading(false);
        }
      }
      fetchVideos();
    },[])

  if(loading) return <Spinner/>  
  return (
    <div className={styles.container}>

      <div className={styles.videoSideBar}>
        {videos.map((video,i)=>{
          return <div key={i} className={styles.videoCard} onClick={()=>handleSelectVideo(video.public_id,video.title)}>
            <div className={styles.videoIcon} >
              <OndemandVideoTwoToneIcon/>
             </div>
             <p style={{paddingBottom:"10px"}}>{i+1}. {video.title}</p>

              </div>
        })}
      </div>
      <div className={styles.videoPlayer} >
        <VideoPlayer id="player1" publicId={selectedVideo}  playerConfig={{ autoplay: true }}/>
        <h2 style={{padding:"1rem"}}>{videoTitle}</h2>
      </div>
    </div>
  )
}
