import { Box, Card, CardActions, CardContent, CardHeader, Collapse, Grid, IconButton, Tooltip, Typography, LinearProgress, Menu, MenuItem, ListSubheader } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { styled } from '@mui/material/styles'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import { changeStatus } from "../redux/tasks.slice"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import MoreVertIcon from '@mui/icons-material/MoreVert'

const ShowTasks = ({ status, tasks, setOpenAddTaskDialog, setOpenDeletionDialog, setOpenEditTaskDialog, setTaskToDelete, settaskToAddStatus, setTaskToEdit }) => {

    const dispatch = useDispatch()

    const { id } = useParams()
    const projects = useSelector((store) => store.projects.projects)
    const [project, setProject] = useState({})

    useEffect(() => {
        setProject(projects.find((p) => p.id === Number(id)))
    }, [id])

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const showMenu = Boolean(anchorEl);

    const handleClick = (event, taskId) => {
        if (anchorEl === event.currentTarget) {
            setAnchorEl(null)
            setSelectedTaskId(null)
        }
        else {
            setAnchorEl(event.currentTarget)
            setSelectedTaskId(taskId)
        }
    }

    const closeMenu = () => {
        setAnchorEl(null)
        setSelectedTaskId(null)
    }

    const handleChangeStatus = (newStatus) => {
        dispatch(changeStatus({ id: selectedTaskId, newStatus }))
        closeMenu()
    }

    const StyledListHeader = Object.assign(
        styled(ListSubheader)({
            backgroundImage: 'var(--Paper-overlay)',
        }),
        {
            muiSkipListHighlight: true,
        },
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, mb: 2, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Add new task">
                    <IconButton aria-label="add" onClick={() => { settaskToAddStatus(status); setOpenAddTaskDialog(true) }}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="h6" sx={{ ml: 1 }}>Status: {status}</Typography>
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pl: theme => theme.spacing(8)}}>
                {
                    tasks.map((t, index) => (
                        <Grid key={index} item>
                            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: 345, minWidth: 345, maxWidth: 345 }}>
                                <CardHeader
                                    action={
                                        <Tooltip title={`Change Status`} arrow>
                                            <IconButton edge="end" sx={{ mr: 1 }} onClick={(e) => handleClick(e, t.taskID)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="status-menu"
                                                anchorEl={anchorEl}
                                                open={showMenu}
                                                onClose={closeMenu}
                                                slotProps={{
                                                    paper: {
                                                        sx: {
                                                            borderRadius: 1,
                                                            boxShadow: '0px 4px 10px rgba(0,0,0,0.12)'
                                                        }
                                                    },
                                                    list: {
                                                        'aria-labelledby': 'basic-button',
                                                        sx: {
                                                            py: 0,
                                                        },
                                                    },
                                                }}

                                            >
                                                <StyledListHeader>Choose new status</StyledListHeader>
                                                <MenuItem onClick={() => handleChangeStatus("To Do")}>To Do</MenuItem>
                                                <MenuItem onClick={() => handleChangeStatus("In Progress")}>In Progress</MenuItem>
                                                <MenuItem onClick={() => handleChangeStatus("Done")}>Done</MenuItem>
                                            </Menu>
                                        </Tooltip>
                                    }
                                    sx={{ pr: 1 }}
                                    title={<Typography variant="h6" sx={{ fontWeight: 600 }}>{t.name}</Typography>}
                                />

                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                                        {t.description}
                                    </Typography>
                                </CardContent>

                                <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                                    <Tooltip title="Delete task" arrow>
                                        <IconButton aria-label="delete" onClick={() => { setTaskToDelete(t.taskID); setOpenDeletionDialog(true) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Edit task's details" arrow>
                                        <IconButton aria-label="edit" onClick={() => { setTaskToEdit(t.taskID); setOpenEditTaskDialog(true) }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>

                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 2 }}>Priority:</Typography>
                                        <Typography sx={{ mb: 2 }}>{t.priority}</Typography>
                                        <Typography variant="h6" sx={{ mb: 2 }}>Deadline:</Typography>
                                        <Typography sx={{ mb: 2 }}>{t.deadline}</Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </>
    )
}

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export default ShowTasks