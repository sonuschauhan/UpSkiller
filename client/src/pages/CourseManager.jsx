import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/axios";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import ButtonSpinner from "../components/ButtonSpinner";
import styles from "../styles/CourseManger.module.css";
import TextField from "@mui/material/TextField";
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import { Button } from "@mui/material";
export default function CourseManager() {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);
  const { courseId } = useParams();
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!video) return alert("Select a video");
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    try {
      setUploadLoading(true);
      let res = await api.post(`/courses/${courseId}/upload-video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setVideos(res.data.course.videos);
      setTitle("");
      setVideo(null);
    } catch (e) {
      console.log(e);
    } finally {
      setUploadLoading(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await api.get(`/courses/${courseId}`);
        console.log(res.data.course.videos);
        setVideos(res.data.course.videos);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) return <Spinner />;
  return (
    <div className={styles.courseManagerContainer}>
      <div className={styles.leftContainer}>
        <form onSubmit={handleSubmit} style={{}}>
          <div>
            <TextField
              type="text"
              label="title"
              name="title"
              value={title}
              onChange={handleChange}
              size="small"
              
            />
            
            <input
              type="file"
              accept="video/*"
              name="url"
              onChange={handleChangeVideo}
              style={{padding:"0.5rem"}}
              
            />
          </div>
          <div style={{margin:"5px"}}>
            <button >{uploadLoading ? <ButtonSpinner /> : "Upload"} </button>
          </div>
        </form>
      </div>

      <div className={styles.rightContainer}>
        <div className={styles.videoSidebar}>
          <h3 className={styles.videoTitleTop}>Saved Vidoes</h3>
        {videos.map((video, i) => {
          return (
            <div
              className={styles.videoCard}
              key={i}
            >
               <div className={styles.videoIcon} >
              <OndemandVideoTwoToneIcon/>
              
             </div>
             <p style={{paddingBottom:"10px"}}>{i+1}. {video.title}</p>
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}
