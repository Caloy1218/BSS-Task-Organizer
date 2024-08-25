import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography, Box, Avatar } from "@mui/material";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tasks"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasksData = [];
      snapshot.forEach((doc) => {
        tasksData.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe();
  }, []);

  // Define the columns for the DataGrid
  const columns = [
    {
      field: 'avatar',
      headerName: 'Avatar',
      width: 100,
      renderCell: (params) => (
        <Avatar src={params.value || "/static/images/avatar/1.jpg"} />
      )
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
  ];

  // Prepare the rows for the DataGrid
  const rows = tasks.map((task) => ({
    id: task.id,
    avatar: task.avatarUrl || "", // Assuming avatar URL is stored in the `avatarUrl` field
    name: task.name || "Anonymous", // Default to "Anonymous" if no name
    position: task.position || "Not specified", // Default if no position
  }));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Dashboard
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Box>
    </Container>
  );
};

export default Dashboard;
