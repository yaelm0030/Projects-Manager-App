import { Box, Drawer, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/largelogo.png";

const ProjectsSidebar = ({ open, setOpen }) => {

    const projects = useSelector((store) => store.projects.projects)

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <Box sx={{ display:'flex',alignItems: 'center', flexDirection: 'column', width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <Box component="img" src={logo} alt="Task Stack Logo" sx={{ height: 'auto', width: '80%', margin: 2, marginTop:4 }} /><br/>
                    <Typography variant="h6" sx={{ color:'#f68934', mb: 2 }}>Your Projects:</Typography>
                    <List>
                        {projects.map((p, index) => (
                            <ListItem key={p.id} disablePadding>
                                <ListItemButton>
                                    <Link to={`/show-projects/${p.id}`}
                                        style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>{p.name}</Link>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default ProjectsSidebar