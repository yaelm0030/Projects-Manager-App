import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/whitelogo.png";
import ProjectsSidebar from "./ProjectsSidebar";
import { useState } from "react";

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <>
      <ProjectsSidebar open={openSidebar} setOpen={setOpenSidebar} />

      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0, width: "100vw" }}>
        <Toolbar>
          <Link to="/show-projects" style={{ textDecoration: 'none' }}>
          <Box
            component="img"
            src={logo}
            alt="Task Stack Logo"
            sx={{
              height: 55,
              width: 'auto',
              marginRight: 2,
              marginTop: 1,
              cursor: 'pointer'
            }}
          />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button sx={{marginTop:1.7, '&:hover': { color: '#f68934' } }} onClick={() => setOpenSidebar(true)}>
            Quick Peek At Projects
          </Button>
          <Button sx={{ marginTop: 1.7, '&:hover': { color: '#f68934' } }} color="inherit" component={Link} to="/show-projects">
            Projects
          </Button>
          <Button sx={{ marginTop: 1.7, '&:hover': { color: '#f68934' } }} color="inherit" component={Link} to="/new-project">
            New Project
          </Button>
          <Button sx={{ marginTop: 1.7, '&:hover': { color: '#f68934' } }} color="inherit" component={Link} to="/">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;