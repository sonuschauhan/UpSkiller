import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { useAuth } from "../context/AuthContext";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
} from "@mui/material";

export default function BecomeInstructor() {
  const [formDataInfo, setFormDataInfo] = useState({
    bio: "",
    experience: 0,
    specialization: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleOnChange = (e) => {
    setFormDataInfo((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeImage = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileImage) return alert("Select a Profile image");
    const formData = new FormData();
    formData.append("image", profileImage);
    formData.append("bio", formDataInfo.bio);
    formData.append("experience", formDataInfo.experience);
    formData.append("specialization", formDataInfo.specialization);
    try {
      let res = await api.put("/users/become-instructor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      setUser((prevUser) => ({ ...prevUser, role: "instructor" }));
      navigate("/instructor/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 500,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 2,
      }}
    >
      <TextField
        name="bio"
        label="Bio"
        multiline
        rows={4}
        value={formDataInfo.bio}
        onChange={handleOnChange}
        required
      />

      <TextField
        name="experience"
        type="number"
        label="Experience (in years)"
        value={formDataInfo.experience}
        onChange={handleOnChange}
        required
      />

      <FormControl required>
        <InputLabel>Specialization</InputLabel>
        <Select
          name="specialization"
          value={formDataInfo.specialization}
          onChange={handleOnChange}
          label="Specialization"
        >
          <MenuItem value="Web Development">Web Development</MenuItem>
          <MenuItem value="Machine Learning">Machine Learning</MenuItem>
          <MenuItem value="Data Science">Data Science</MenuItem>
          <MenuItem value="App Development">App Development</MenuItem>
          <MenuItem value="Cybersecurity">Cybersecurity</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" component="label">
        Upload Profile Image
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleChangeImage}
        />
      </Button>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
}
