import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useAppDispatch, useAppSelector} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/auth/Login";
import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <RouterProvider router={router}/>
                {/*<Routes>*/}
                {/*<Route path='/' element={<TodolistsList/>}/>*/}
                {/*<Route path='/login' element={<Login/>}/>*/}
                {/*<Route path='/404' element={<h1>Page not found</h1>}/>*/}
                {/*<Route path='*' element={<Navigate to='/404'/>}/>*/}
                {/*// <Login/>*/}
                {/*// <TodolistsList/>*/}
                {/*</Routes>*/}
            </Container>
        </div>
    )
}

const router = createBrowserRouter([
    {path: '/', element: <TodolistsList/>},
    {path: '/login', element: <Login/>},
    {path: '/404', element: <h1>Page not found</h1>},
    {path: '*', element: <Navigate to='/404'/>}
])

export default App
