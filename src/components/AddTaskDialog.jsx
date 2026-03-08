import { addTask } from '../redux/tasks.slice'
import { useDispatch, useSelector } from 'react-redux';
import { tasksRNPromotion } from '../redux/tasksRunningNum.slice'
import { Fragment } from 'react';
import { MenuItem, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

const AddTaskDialog = ({ open, status, setOpenAddTaskDialog, projectID }) => {

    const dispatch = useDispatch()
    const curID = useSelector((stor) => stor.tasksRN.currentID)

    const handleCloseDialog = () => {
        setOpenAddTaskDialog(true);
    };

    const { control, formState: { errors }, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "",
            desc: "",
            status: status,
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: "Low"
        }
    })

    const onSubmit = (data) => {
        dispatch(addTask({
            projectID: projectID,
            taskID: curID,
            name: data.name,
            description: data.desc,
            status: status,
            priority: data.priority,
            deadline: data.deadline
        }))
        dispatch(tasksRNPromotion())
        reset()
        setOpenAddTaskDialog(false)
    }

    return (
        <Fragment>
            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Add a new '{status}' task</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit(onSubmit)} id="add-task=form">
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="taskName"
                                    name="taskName"
                                    label="Task's name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                            )}
                        />
                        <Controller
                            name="desc"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    margin="dense"
                                    id="description"
                                    name="description"
                                    label="Task's description"
                                    type="text"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                />
                            )}
                        />
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="dense"
                                    id="status"
                                    name="status"
                                    label="Task's status"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    defaultValue={status}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="deadline"
                            control={control}
                            rules={{
                                required: "Deadline is required",
                                validate: (value) => {
                                    const selectedDate = new Date(value);
                                    const today = new Date();

                                    today.setHours(0, 0, 0, 0);

                                    if (selectedDate < today) {
                                        return "Deadline cannot be in the past";
                                    }

                                    return true;
                                }
                            }}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    {...field}
                                    required
                                    margin="dense"
                                    id="deadline"
                                    name="deadline"
                                    label="Deadline"
                                    type="date"
                                    fullWidth
                                    variant="outlined"
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                        />
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    required
                                    margin="dense"
                                    id="priority"
                                    name="priority"
                                    label="Priority"
                                    select
                                    fullWidth
                                    variant="outlined"
                                >
                                    <MenuItem value="low">Low</MenuItem>
                                    <MenuItem value="medium">Medium</MenuItem>
                                    <MenuItem value="high">High</MenuItem>
                                </TextField>
                            )}
                        />
                    </form>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => { handleCloseDialog(); setOpenAddTaskDialog(false); }}>Cancel</Button>
                    <Button type="submit" form="add-task=form" variant="contained" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AddTaskDialog