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
import {CircularProgress} from "@mui/material";
import {authSelectors} from "../features/auth/auth-selectors";
import {logoutTC} from "../features/auth/auth-reducer";


function App() {
    const status = useAppSelector<RequestStatusType>((state) => state.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector(authSelectors)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if(!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress/>
            </div>
        )
    }

    const handleLogoutButtonClick = () => {
        dispatch(logoutTC())
    }

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
                    {isLoggedIn && <Button color="inherit" onClick={handleLogoutButtonClick}>Log Out</Button>}
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
