import React, { useState } from "react";
import api from "../services/axios";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../components/ButtonSpinner";

import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function CreateCourse() {
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formDataInfo, setFormDataInfo] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
    level: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChangeImage = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormDataInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail) {
      return alert("Select a thumbnail Image");
    }
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", formDataInfo.title);
    formData.append("description", formDataInfo.description);
    formData.append("price", formDataInfo.price);
    formData.append(
      "tags",
      JSON.stringify(formDataInfo.tags.split(",").map((tag) => tag.trim()))
    );
    formData.append("level", formDataInfo.level);
    formData.append("category", formDataInfo.category);

    try {
      setLoading(true);
      const response = await api.post("/courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      navigate("/instructor/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Development",
    "Design",
    "Business",
    "Marketing",
    "Finance",
    "Photography",
    "Music",
    "Health & Fitness",
    "Lifestyle",
    "Teaching & Academics",
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={formDataInfo.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Description"
          name="description"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={formDataInfo.description}
          onChange={handleChange}
          required
        />

        <TextField
          label="Price"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formDataInfo.price}
          onChange={handleChange}
          required
        />

        <TextField
          label="Tags (comma separated)"
          name="tags"
          fullWidth
          margin="normal"
          value={formDataInfo.tags}
          onChange={handleChange}
          required
        />

        <FormControl fullWidth margin="normal" required>
  <InputLabel>Level</InputLabel>
  <Select
    name="level"
    value={formDataInfo.level}
    onChange={handleChange}
    label="Level"
  >
    {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
      <MenuItem key={i} value={level}>
        {level}
      </MenuItem>
    ))}
  </Select>
</FormControl>

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formDataInfo.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map((category, i) => (
              <MenuItem key={i} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="outlined"
          component="label"
          sx={{ my: 2 }}
        >
          Upload Thumbnail
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleChangeImage}
          />
        </Button>
        {thumbnail && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Selected: {thumbnail.name}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
        >
          {loading ? <ButtonSpinner /> : "Create"}
        </Button>
      </form>
    </Box>
  );
}
