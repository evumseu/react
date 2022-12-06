import { SEU_USER_ID, ProfileData, WinLost } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, NavLink, Navigate, useRouteLoaderData } from "react-router-dom"
import * as React from 'react';
import { useState, useEffect, useLayoutEffect, MouseEvent } from "react"
import { TextField, Button, Box, Avatar, Card, CardActions, CardContent, Typography } from "@mui/material"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import './LoadingPage.css';

function LoadUserData() {

    const navigate = useNavigate()
    const params = useParams()
    const [profileData, setProfileData] = useState(ProfileData)
    const [winLost, setWinLost] = useState(WinLost);
    const [id, setID] = useState(params.queryId ? params.queryId : SEU_USER_ID)


    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/player/${id}`)
    }

    const onSearchChanged = (event) => {
        setID(event.target.value)
    }

    useEffect(() => {
        fetch(`https://api.opendota.com/api/players/${id}`).then((Response) => Response.json()).then((data) => {
            setProfileData(data)
        })

        fetch(`https://api.opendota.com/api/players/${id}/wl`).then((Response) => Response.json()).then((data) => {
            setWinLost(data)
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
                <div className="container">
                    <Avatar
                        className="img"
                        alt={profileData.profile.personaname}
                        src={profileData.profile.avatarfull}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Typography textAlign={"center"} variant="h4" color="text.primary">
                        {profileData.profile.personaname}
                    </Typography>

                    <Typography mt={2} textAlign={"center"} variant="h5" color="text.primary">
                        MMR : {profileData.mmr_estimate.estimate}
                    </Typography>

                    <div className="content">
                        <Typography mt={2} mr={8} variant="h5" color="green">
                            Win: {winLost.win}
                        </Typography>

                        <Typography mt={2} variant="h5" color="red">
                            Lost: {winLost.lose}
                        </Typography>
                    </div>

                    <Typography mt={2} textAlign={"center"} variant="h5" color="text.primary">
                        Win Rate : {((winLost.win /(winLost.lose + winLost.win)) * 100).toFixed(2)}%
                    </Typography>
                </div>

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
                            color: 'white',
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
