import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { DataGrid } from "@mui/x-data-grid";
import { Container, Typography, Box, Avatar } from "@mui/material";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users")); // Fetch from "users" collection
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => {
        usersData.push({ ...doc.data(), id: doc.id });
      });
      setTasks(usersData); // Store the user data in tasks
    });

    return () => unsubscribe();
  }, []);

  const columns = [
    {
      field: "avatar",
      headerName: "Avatar",
      width: 100,
      renderCell: (params) => (
        <Avatar src={params.value || "/static/images/avatar/1.jpg"} />
      ),
    },
    { field: "name", headerName: "Name", width: 150 }, // Full name
    { field: "position", headerName: "Position", width: 150 }, // Position
  ];

  const rows = tasks.map((user) => ({
    id: user.id,
    avatar: user.avatarUrl || "",
    name: user.fullName || "Anonymous",
    position: user.position || "Not specified",
  }));

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Dashboard
        </Typography>
        <div style={{ height: 400, width: "100%" }}>
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
