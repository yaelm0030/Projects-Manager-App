import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProject } from '../redux/projects.slice';
import EditTaskDialog from './EditTaskDialog';
import AddTaskDialog from './AddTaskDialog';
import DeletionDialog from './DeletionDialog';
import { useParams } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShowTasks from './ShowTasks';
import { Typography, TextField } from '@mui/material';
import ProjectsSidebar from './ProjectsSidebar';


const ProjectDetails = () => {

  const { id } = useParams()
  const projects = useSelector((store) => store.projects.projects)
  const [project, setProject] = useState({})
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [editingDesc, setEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const proj = projects.find((p) => p.id === Number(id));
    setProject(proj || {});
    setNameValue(proj?.name || '');
    setDescValue(proj?.description || '');
  }, [id, projects])

  const [value, setValue] = useState(0);

  const tasks = useSelector((store) => store.tasks.tasks)

  const [taskToDelete, setTaskToDelete] = useState()

  const [openDeletionDialog, setOpenDeletionDialog] = useState(false)

  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false)
  const [taskToAddStatus, settaskToAddStatus] = useState()

  const [openEditTaskDialog, setOpenEditTaskDialog] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState()

  const [openSidebar, setOpenSidebar] = useState(false)

  return (
    <Box sx={{ width: '100%', marginTop: 10 }}>
      <Box sx={{ mb: 7, backgroundColor: '#f4f4f4', padding: 4, borderRadius: 0.7, width: '100%' }}>
      <Typography variant="body2" align="center" sx={{ mb: 4 }}>
        Double click on the project name or description to edit them.
      </Typography>
        {editingName ? (
          <TextField
            value={nameValue}
            onChange={e => setNameValue(e.target.value)}
            onBlur={() => {
              if (nameValue.trim() && nameValue !== project.name) {
                dispatch(updateProject({ id: project.id, name: nameValue }));
              }
              setEditingName(false);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
            size="small"
            fullWidth
            variant="outlined"
            sx={{ mb: 1 }}
            autoFocus
          />
        ) : (
          <Typography
            gutterBottom
            variant="h4"
            margin={0}
            component="div"
            onDoubleClick={() => setEditingName(true)}
            sx={{ cursor: 'pointer' }}
          >
            {project.name}
          </Typography>
        )}<br />
        {editingDesc ? (
          <TextField
            value={descValue}
            onChange={e => setDescValue(e.target.value)}
            onBlur={() => {
              if (descValue.trim() && descValue !== project.description) {
                dispatch(updateProject({ id: project.id, description: descValue }));
              }
              setEditingDesc(false);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.target.blur();
              }
            }}
            size="small"
            fullWidth
            multiline
            minRows={2}
            variant="outlined"
            sx={{ mb: 1 }}
            autoFocus
          />
        ) : (
          <Typography
            variant="h6"
            sx={{ color: 'text.secondary', cursor: 'pointer' }}
            onDoubleClick={() => setEditingDesc(true)}
          >
            {project.description}
          </Typography>
        )}
      </Box>

        <BottomNavigation
            showLabels
            value={value}
            sx={{ bgcolor: 'background.default' }}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        >
            <BottomNavigationAction label="To Do" icon={<FormatListBulletedIcon />} />
            <BottomNavigationAction label="In Progress" icon={<PendingIcon />} />
            <BottomNavigationAction label="Done" icon={<CheckCircleOutlineIcon />} />
        </BottomNavigation>
        <Box sx={{ width: "100%", border: "1px solid #072134", padding: 2, borderRadius: 0.7, minHeight: "60vh", height: "100%" }}>
            {<EditTaskDialog open={openEditTaskDialog} taskID={taskToEdit} setOpenEditTaskDialog={setOpenEditTaskDialog} />}
            {<AddTaskDialog open={openAddTaskDialog} status={taskToAddStatus} setOpenAddTaskDialog={setOpenAddTaskDialog} projectID={project.id} />}
            {<DeletionDialog open={openDeletionDialog} taskToDelete={taskToDelete} setOpenDeletionDialog={setOpenDeletionDialog} />}
            {value == 0 && <ShowTasks status={"To Do"} tasks={tasks.filter((t) => t.status === "To Do" && t.projectID === project.id)} setOpenAddTaskDialog={setOpenAddTaskDialog} setOpenDeletionDialog={setOpenDeletionDialog} setOpenEditTaskDialog={setOpenEditTaskDialog} setTaskToDelete={setTaskToDelete} settaskToAddStatus={settaskToAddStatus} setTaskToEdit={setTaskToEdit} />}
            {value == 1 && <ShowTasks status={"In Progress"} tasks={tasks.filter((t) => t.status === "In Progress" && t.projectID === project.id)} setOpenAddTaskDialog={setOpenAddTaskDialog} setOpenDeletionDialog={setOpenDeletionDialog} setOpenEditTaskDialog={setOpenEditTaskDialog} setTaskToDelete={setTaskToDelete} settaskToAddStatus={settaskToAddStatus} setTaskToEdit={setTaskToEdit} />}
            {value == 2 && <ShowTasks status={"Done"} tasks={tasks.filter((t) => t.status === "Done" && t.projectID === project.id)} setOpenAddTaskDialog={setOpenAddTaskDialog} setOpenDeletionDialog={setOpenDeletionDialog} setOpenEditTaskDialog={setOpenEditTaskDialog} setTaskToDelete={setTaskToDelete} settaskToAddStatus={settaskToAddStatus} setTaskToEdit={setTaskToEdit} />}
        </Box>
    </Box>
  );
}

export default ProjectDetails