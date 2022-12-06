import { SEU_USER_ID, ProfileData } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, NavLink, Navigate, useRouteLoaderData } from "react-router-dom"
import * as React from 'react';
import { useState, useEffect, useLayoutEffect, MouseEvent } from "react"
import { TextField, Button, Box, Card, CardActions, CardContent, Typography } from "@mui/material"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './LoadingPage.css';

function LoadUserData() {

    const navigate = useNavigate()
    const params = useParams()
    const [profileData, setProfileData] = useState(ProfileData)
    const [id, setID] = useState(params.queryId ? params.queryId : SEU_USER_ID)


    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/player/${id}`)
    }

    const onSearchChanged = (event) => {
        setID(event.target.value)
    }

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
        </Box>
    );

    useEffect(() => {
        fetch(`https://api.opendota.com/api/players/${id}`).then((Response) => Response.json()).then((data) => {
            console.log(data)
            setProfileData(data)
            console.log(profileData)
        })
    }, [params.queryId]);

    return <div>
        <form onSubmit={handleSubmit}>
            <TextField
                id="serach"
                label="Search"
                variant="outlined"
                size="medium"
                value={id}
                onChange={onSearchChanged}
            ></TextField> {' '}
            <Button variant="contained" size="large" onClick={handleSubmit}>Search</Button>

            <div>
                <React.Fragment>
                    <CardContent variant="outlined">
                        <Typography mt={2} variant="h4" color="text.primary" gutterBottom>
                            Player Name: {profileData.profile.personaname}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {bull}nev{bull}o{bull}lent
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            adjective
                        </Typography>
                        <Typography variant="body2">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </React.Fragment>
                <h2 >Player Name: {profileData.profile.personaname}</h2>
                <h2>MMR : {profileData.mmr_estimate.estimate}</h2>
                <img src={profileData.profile.avatar}></img>
            </div>
        </form>

    </div>
}

function HomePage() {

    return <div>
        <h1>This is Homepage</h1>

    </div>
}

function LoadingPage() {

    return <div>
        <BrowserRouter>
            <TopAppHeader />
            <br /><br />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/player/:queryId" element={<LoadUserData />}></Route>
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    </div>
}

function TopAppHeader() {
    const navigate = useNavigate()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        Dota2
                    </Typography>
                    {"   "}
                    <Button color="inherit" onClick={console.log("This is match")}>Match</Button>
                    <Button color="inherit"><NavLink
                        to={`player/${SEU_USER_ID}`}
                        style={{
                            color:'white',
                            textDecoration: 'none',
                        }}>
                        Player
                    </NavLink></Button>
                    <Button color="inherit"><NavLink to>Top Player</NavLink></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}





export default LoadingPage
