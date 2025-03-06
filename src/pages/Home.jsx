import { Typography, Button, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/background.jpg"; // Replace with your image

function Home() {
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* Main Content */}
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{ mb: 2, fontWeight: "bold" }}>
          Welcome to Whatsapp Parser
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Lost years of chats with your friends while they still have them? Don't worry, I've got you covered.
        </Typography>
        {localStorage.getItem("user") ? (<Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/dashboard"
          sx={{ backgroundColor: "green", ":hover": { backgroundColor: "darkgreen" } }}
        >
          GOTO dashboard
        </Button>) : (<Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/login/google"
          sx={{ backgroundColor: "#DB4437", ":hover": { backgroundColor: "#B33629" } }}
        >
          Login with Google
        </Button>)}
      </Container>
    </Box>
  );
}

export default Home;
