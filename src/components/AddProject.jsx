import { Button, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '../redux/projects.slice'
import { projectsRNPromotion } from '../redux/projectsRunningNum.slice'
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';


const AddProject = () => {

    const dispatch = useDispatch()
    const curID = useSelector((stor) => stor.projectsRN.currentID)
    const nav = useNavigate()

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            name: "Project's name",
            desc: "Project's description",
        },
    });

    const onSubmit = (data) => {
        dispatch(addProject({
            id: curID,
            name: data.name,
            description: data.desc,
            date: new Date().toString()
        }))
        dispatch(projectsRNPromotion())
        reset()
        nav('/show-projects')
    }

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Your New Project Details
            </Typography>
            <br />
            <Stack spacing={2} sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                width: '100%'
            }}>
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="outlined-name"
                            label="Name"
                            defaultValue="Project's name"
                        />
                    )}
                />
                <Controller
                    name="desc"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            id="outlined-description"
                            label="Description"
                            multiline
                            rows={4}
                            defaultValue="Project's description"
                        />
                    )}
                />
                <Button
                    type='submit'
                    variant="contained"
                    color="primary"
                >
                    Add Project
                </Button>
            </Stack>
        </Box>
        
    )
}

export default AddProject