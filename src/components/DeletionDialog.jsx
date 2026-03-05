import { useDispatch } from "react-redux"
import { removeTask } from '../redux/tasks.slice'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

const DeletionDialog = ({open, taskToDelete,setOpenDeletionDialog}) => {

    const dispatch = useDispatch()

    const DeleteTask = () => {
        dispatch(removeTask(taskToDelete))
    }

    const handleClose = () => setOpenDeletionDialog(false)

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Clicking the Delete button will delete this task permanently
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => { DeleteTask(); handleClose() }} autoFocus color="error">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default DeletionDialog