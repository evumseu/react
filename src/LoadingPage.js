import { SEU_USER_ID, ProfileData } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, json, useRouteLoaderData } from "react-router-dom"
import * as React from 'react';
import { useState, useEffect, useLayoutEffect } from "react"
import { TextField, Button, Box, Card, CardActions, CardContent, Typography} from "@mui/material"

function LoadUserData() {

    const navigate = useNavigate()
    const params = useParams()
    const [profileData, setProfileData] = useState(ProfileData)
    const [id, setID] = useState(params.queryId ? params.queryId : '')


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
          •
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
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
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
        <h1>Open Dota Project</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/player/:queryId" element={<LoadUserData />}></Route>
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default LoadingPage
