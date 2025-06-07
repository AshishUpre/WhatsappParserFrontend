import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Avatar, CircularProgress, Paper, getListItemIconUtilityClass } from "@mui/material";
import UserFiles from '../components/UserFiles'
import FileUploader from "../components/FileUploader";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const goHomeIfNotAuthenticated = () => {
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/me`, { withCredentials: true })
          .then(() => {
          })
          .catch(() => {
              console.log("in dashboard, user not auth, sending home");
              // User is not authenticated, redirect to home
              navigate("/");
          });
  };

  useEffect(() => {
      goHomeIfNotAuthenticated();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.log("in dashboard, localstorage user details not present, sending home");
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container 
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // Align to top
        minHeight: "100vh",
        pt: 5, // Adds padding from top
      }}
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 3, width: "100%" }}>
        {user ? (
          <>
            {/* Centering the Avatar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Avatar
                src={user.picture}
                alt={user.name}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
            </div>

            <Typography variant="h5" gutterBottom>
              Welcome, {user.name}!
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.email}
            </Typography>

            <UserFiles showDeleteButtons={true}/>
          </>
        ) : (
          <CircularProgress />
        )}
      </Paper>

      <FileUploader />
    </Container>
  );
}

export default Dashboard;
