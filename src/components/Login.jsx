import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FormControl, Typography, FormHelperText, InputAdornment, InputLabel, OutlinedInput, IconButton, TextField, Box } from '@mui/material';
import logo from '../assets/largelogo.png';

const Login = () => {

    const nav = useNavigate()
    const user = useSelector((store) => store.user)
    const [showPassword, setShowPassword] = useState(false);
    const [illegalUserMassage, setIllegalUserMassage] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };


    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            password: ""
        }
    })

    const onSubmit = (data) => {
        if (data.name != user.name || data.password != user.password) {
            setIllegalUserMassage(true)
        }
        else {
            setIllegalUserMassage(false)
            nav('/show-projects')
        }
    }

    return (
        <>
            <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                    left: '50%',
                    width: 200,
                    height: 'auto',
                    mb: 4
                }}
            />
            <Typography gutterBottom variant="h5" component="div">
                Welcome!
            </Typography><br />
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: true, maxLength: 15 }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    helperText="Please enter user name"
                                    id="user-name-input"
                                    label="User Name"
                                />
                            )}
                        />
                        {errors.name?.type === "required" && <FormHelperText error>User name is required</FormHelperText>}
                        {errors.name?.type === "maxLength" && <FormHelperText error>User name is too long</FormHelperText>}
                    </FormControl>
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true, minLength: 4, maxLength: 20 }}
                            render={({ field }) => (
                                <OutlinedInput
                                    {...field}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment
                                            position="end">
                                            <IconButton
                                                aria-label={
                                                    showPassword ? 'hide the password' : 'display the password'
                                                }
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                onMouseUp={handleMouseUpPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            )}
                        />
                        <FormHelperText id="password-helper-text">
                            Please enter password
                        </FormHelperText>
                        {errors.password?.type === "required" && <FormHelperText error>Password is required</FormHelperText>}
                        {errors.password?.type === "minLength" && <FormHelperText error>Password is too short</FormHelperText>}
                        {errors.password?.type === "maxLength" && <FormHelperText error>Password is too Long</FormHelperText>}
                    </FormControl>
                </Box><br />
                <Button
                    type='submit'
                    variant="outlined">
                    Get Started
                </Button><br /><br />
                {illegalUserMassage && <FormHelperText error sx={{ textAlign: 'center' }}>User details were not found.</FormHelperText>}
            </Box>
        </>
    )
}

export default Login