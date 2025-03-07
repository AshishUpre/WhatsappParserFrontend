import { AppBar, Toolbar, Typography, Button, Box, Switch, createTheme } from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import axios from 'axios';
import { styled } from "@mui/material/styles";

const LogoutButton = styled(Button)({
  "&:hover": {
    color: "red",
  },
});

/**
 * ! Most important -> wasted lots of time and low sleep due to this small mistake
 * * in post we can send body, in get we cant
 * * => in axios.get, we dont send body hence { withCredentials: true } is 2nd arg
 * * but in pose, we can send body hence { withCredentials: true } is 3rd arg
 */
const logoutHandler = () => {
    console.log("API URL: ", `${import.meta.env.VITE_API_BASE_URL}/user/logout`);
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/logout`,{}, { withCredentials: true })
        .then(() => {
            localStorage.clear("user");
            console.log('Logout successful');
            window.location.href = '/'; // Redirect after logout
        })
        .catch((error) => {
            console.error("Logout error: ", error);
        });
  }
  

function Layout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}>
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Whatsapp Parser
            </Typography>
            
            <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/">
                Home
            </Button>

            <LogoutButton color="inherit" onClick={() => logoutHandler()}>
                Logout
            </LogoutButton>
        </Toolbar>
      </AppBar>

      {/* This renders the current page */}
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
