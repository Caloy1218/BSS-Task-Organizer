import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { TextField, Button, Container, Box, Typography } from "@mui/material";

const TaskCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        status: "To Do",
        createdAt: new Date(),
      });
      alert("Task created successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Create Task
        </Typography>
        <Box component="form" onSubmit={handleCreateTask} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Task
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskCreation;
