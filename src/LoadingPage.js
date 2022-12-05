import { SEU_USER_ID, ProfileData } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, json, useRouteLoaderData } from "react-router-dom"
import { useState, useEffect, useLayoutEffect } from "react"
import { TextField, Button } from "@mui/material"

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

    useEffect(() => {
        let mounted = true;
        fetch(`https://api.opendota.com/api/players/${id}`).then((Response) => Response.json()).then((data) => {
            console.log(data)
            setProfileData(data)
            console.log(profileData)
        })
        return () => mounted = false;
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
