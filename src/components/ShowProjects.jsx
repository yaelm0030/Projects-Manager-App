import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeProject } from '../redux/projects.slice'
import squareicon from '../assets/squareicon.png'

const ShowProjects = () => {

    const dispatch = useDispatch()

    const projects = useSelector((store) => store.projects.projects)
    const userName = useSelector((store) => store.user.name)

    const DeleteProject = (id) => {
        dispatch(removeProject(id))
    }

    const angles = [0, 90, 180, 270];

    return (
        <>
            <Box>
                <Box sx={{
                    mt: 10,
                    padding: 6,
                    backgroundColor: '#f4f4f4',
                    width: '100%',
                    minHeight: '30vh',
                    borderRadius: 0.7
                }}>
                    <Typography variant="h4" align="center" sx={{ pt: 4 }}>
                        Welcome back, {userName}!
                    </Typography>
                    <Typography variant="subtitle1" align="center" sx={{ mt: 1 }}>
                        Here you can view your projects.<br /> Click on a project to see its details and manage its tasks.
                    </Typography>
                    <Box sx={{ mt: 5, mb: 2, display: 'flex', justifyContent: 'center' }}>
                        <Link to="/new-project" style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary">
                                New Project
                            </Button>
                        </Link>
                    </Box>
                </Box>

                <Box sx={{ mt: 8, display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'space-between' }}>
                    {projects.map((p, index) => (
                        <Card
                            key={p.id}
                            sx={{
                                padding: 5,
                                width: 345,
                                minHeight: 200,
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                overflow: 'visible',
                                backgroundColor: '#f4f4f4',
                                borderRadius: 2,
                                boxShadow: 'none',
                                border: 'none',
                                borderRadius: 0.7
                            }}
                        >
                            <Box
                                component="img"
                                src={squareicon}
                                alt="project icon"
                                sx={{
                                    position: 'absolute',
                                    top: -30,
                                    left: '50%',
                                    width: 70,
                                    height: 'auto',
                                    transform: `translateX(-50%) rotate(${angles[index % angles.length]}deg)`,
                                    zIndex: 2,
                                    filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.1))'
                                }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Link to={`/show-projects/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography gutterBottom variant="h5">
                                        {p.name}
                                    </Typography>
                                </Link>
                                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                                    {p.description}
                                </Typography>
                            </CardContent>

                            <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'center' }}>
                                <Button
                                    onClick={() => DeleteProject(p.id)}
                                    size="large"
                                    color="secondary"
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Card>
                    ))}
                </Box>
            </Box>
        </>
    )
}

export default ShowProjects