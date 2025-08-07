import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import styles from "../styles/CourseDescription.module.css";
import LanguageIcon from "@mui/icons-material/Language";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import PeopleOutlineTwoToneIcon from "@mui/icons-material/PeopleOutlineTwoTone";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export default function CourseDescription() {
  const [course, setCourse] = useState({});
  const [loadings, setLoading] = useState(true);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [reviewFormData, setReviewFormData] = useState({ rating: "5", comment: "" });
  const [reviews,setReviews]=useState([]);

  const { courseId } = useParams();
  const { user, loading } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    async function fetchCourse() {
      try {
        const res = await api.get(`/courses/${courseId}`);
        // console.log(user);
        setHasPurchased(res.data.course.studentsEnrolled.includes(user._id));
        setCourse(res.data.course);
        setReviews(res.data.course.review);
        console.log(res.data.course);
        
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCourse();
  }, [loading, user]);
  //   console.log(user);
  const handlePurchase = async () => {
    if (user) {
      if (hasPurchased) {
        navigate(`/watch/${courseId}`);
      }
      try {
        const res = await api.post(`users/purchase/${courseId}`);
        navigate("/my-courses");
      } catch (e) {
        console.log(e);
      }
    } else {
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    setReviewFormData((prevReview) => {
      return { ...prevReview, [e.target.name]: e.target.value };
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        `/courses/${course._id}/review/create`,
        reviewFormData
      );

      const refreshed = await api.get(`/courses/${courseId}`);
      setCourse(refreshed.data.course);
      setReviews(refreshed.data.course.review);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteReview=async(reviewId)=>{
    try{
      const res=await api.delete(`/courses/${course._id}/review/${reviewId}/delete`);

      const refreshed = await api.get(`/courses/${courseId}`);
      setCourse(refreshed.data.course);
      setReviews(refreshed.data.course.review);

    }catch(e){
      console.log(e)
    }
  }
  const date = new Date(course.createdAt);

  if (loadings) return <Spinner />;
  //   console.log(course);
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.topContainer}>
          <img src={course.thumbnail} className={styles.thumbnail} />

          <div className={styles.mainContent}>
            <h2 style={{ margin: "4px 0px" }}>{course.title}</h2>
            <p style={{ fontSize: "1.1rem", margin: "4px 0px" }}>
              {course.description}
            </p>
            <button style={{ backgroundColor: "#968dbc", borderRadius: "5px" }}>
              {course.category}
            </button>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
              <p>Created by {course.instructor?.username || "Unknown"}</p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <LanguageIcon style={{ color: "#6e6b6bff" }} fontSize="small" />
                <span>English</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <InfoIcon style={{ color: "#6e6b6bff" }} fontSize="small" />
                <span>
                  Last Updated {date.getMonth() + 1}/{date.getFullYear()}{" "}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.overView}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#5022c3",
                padding: "1.5rem",
                borderRadius: "7px 0px 0px 7px",
                color: "white",
              }}
              className={styles.premium}
            >
              <CheckCircleOutlineTwoToneIcon />
              <span>Premium</span>
            </div>
            <div style={{ width: "15rem" }}>
              <p>
                Access this top-rated course, plus 26,000+ more top-rated
                courses, with a Udemy plan.{" "}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>{course.averageRating}</h2>
              <Rating size="small" name="half-rating-read" value={course.averageRating} precision={0.5} readOnly />
              <p>{course.review.length} ratings</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                paddingRight: "1rem",
              }}
            >
              <PeopleOutlineTwoToneIcon />
              <span>{course.studentsEnrolled.length}</span>
              <p>learners</p>
            </div>
          </div>
          {
            <button onClick={handlePurchase} className={styles.buyButton}>
              <b>{hasPurchased ? "Explore" : "Buy now"}</b>
            </button>
          }
        </div>
        <div className={styles.reviewContainer}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            component={"form"}
            onSubmit={handleReviewSubmit}
            mb={3}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Rate Us
            </Typography>
            <Rating
              name="rating"
              value={reviewFormData.rating}
              size="large"
              onChange={handleChange}
            />
            <TextField
              placeholder="Share your experience..."
              name="comment"
              type="text"
              multiline
              fullWidth
              rows={4}
              value={reviewFormData.comment}
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="outlined"
              sx={{ alignSelf: "flex-start" }}
            >
              Submit
            </Button>
          </Box>

          <Box  display={"flex"} flexWrap={"wrap"} justifyContent={"center"} gap={2}>
          {reviews.map((review,i)=>{
            return <Card key={i} variant="outlined" sx={{flexFlow:"1",width:"260px"}} > 
            <CardContent>
              <Typography
                gutterBottom
                sx={{ color: "text.secondary", fontSize: 14 }}
              >
                {review.username}
              </Typography>
              <Rating name="read-only" value={review.rating} readOnly />
              <Typography variant="body2">
                {review.comment}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>handleDeleteReview(review._id)}>Delete</Button>
            </CardActions>
            </Card>
          })}
          
             
          </Box>
        </div>
      </div>
    </div>
  );
}
