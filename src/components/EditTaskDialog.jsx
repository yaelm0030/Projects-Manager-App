import { setNameDescAndDeadline } from '../redux/tasks.slice'
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';
import { MenuItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const EditTaskDialog = ({ open, setOpenEditTaskDialog, taskID }) => {


    const dispatch = useDispatch()

    const handleCloseDialog = () => {
        setOpenEditTaskDialog(false);
    };

    const tasks = useSelector((store) => store.tasks.tasks)
    const [task, setTask] = useState(null)

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: '',
            desc: '',
            deadline: '',
            priority: ''
        }
    })

    useEffect(() => {
        if (open) {
            const found = tasks.find((t) => t.taskID === Number(taskID));
            if (found) {
                setTask(found);
                reset({ name: found.name, desc: found.description, deadline: found.deadline, priority: found.priority });
            }
        }
    }, [taskID, open, tasks, reset])

    const onSubmit = (data) => {
        dispatch(setNameDescAndDeadline(
            {
                id: taskID,
                name: data.name,
                description: data.desc,
                deadline: data.deadline,
                priority: data.priority
            }
        ))
        reset()
        setOpenEditTaskDialog(false)
    }

    return (
        <Fragment>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Edit Task's Details</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} id="edit-task-form">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoFocus
                                    margin="dense"
                                    id="taskName"
                                    name="taskName"
                                    label="Task's name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            )}
                        />
                        <Controller
                            name="desc"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Task's description"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="standard"
                                />
                            )}
                        />
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    id="deadline"
                                    name="deadline"
                                    label="Deadline"
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    id="priority"
                                    name="priority"
                                    label="Priority"
                                    select
                                    fullWidth
                                    variant="standard"
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </TextField>
                            )}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit" form="edit-task-form">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default EditTaskDialog