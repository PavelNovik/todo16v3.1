import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import * as Yup from 'yup'
import {LoginParams} from "../../api/auth-api";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {loginTC} from "./auth-reducer";
import {ResultCodes} from "../../api/todolists-api";
import {authSelectors} from "./auth-selectors";
import {Navigate} from "react-router-dom";

// type FormData = {
//     email: string,
//     password: string,
//     rememberMe: boolean
// }

const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(3, 'Invalid password').required('Required'),
})
export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(authSelectors)

    const {
        isSubmitting,
        resetForm,
        getFieldProps,
        handleSubmit,
        handleChange,
        handleBlur,
        touched,
        values,
        errors
    } = useFormik<LoginParams>({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values) => {
            // alert(JSON.stringify((values)))
            await dispatch(loginTC(values)).then((data) => {
                if (data?.resultCode === ResultCodes.Succeeded)
                    resetForm()
            })
        },
        validationSchema
        // validate: (values) => {
        //     // const errors: Omit<Partial<FormData>, 'rememberMe'> = {}
        //     const errors: Partial<Omit<FormData, 'rememberMe'>> = {}
        //     if (!values.email) {
        //         errors.email = 'Required email field'
        //     } else if (!EMAIL_REGEXP.test(values.email)) {
        //         errors.email = 'Invalid email address'
        //     }
        //     if (!values.password) {
        //         errors.password = 'Required password field'
        //     } else if (values.password.length < 3) {
        //         errors.password = 'Invalid password'
        //     }
        //     return errors
        // }
    })

    // console.log(values)

    if(isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                            // name={'email'} onChange={handleChange}
                            // onBlur={handleBlur}
                            // value={values.email}
                                   {...getFieldProps('email')}
                        />
                        {touched.email && errors.email && <p style={{color: 'red'}}>{errors.email}</p>}
                        <TextField type="password" label="Password"
                            // name={'password'} onChange={handleChange}
                            // onBlur={handleBlur}
                            // value={values.password}
                                   {...getFieldProps('password')}
                                   margin="normal"
                        />
                        {touched.password && errors.password && <p style={{color: 'red'}}>{errors.password}</p>}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              {...getFieldProps('rememberMe')}
                                              // name={'rememberMe'} onChange={handleChange}
                                              //                onBlur={handleBlur}
                                              //                checked={values.rememberMe}
                                          />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'} disabled={isSubmitting}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}