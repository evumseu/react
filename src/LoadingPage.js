import { SEU_USER_ID } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, json } from "react-router-dom"
import { useState, useEffect } from "react"
import { TextField, Button } from "@mui/material"

function LoadUserData() {

    const navigate = useNavigate()
    const params = useParams()
    const [profileData, setProfileData] = useState({})
    const [id, setID] = useState(!params.id ? params.id : SEU_USER_ID)

    const handleSubmit=(event)=>{
        event.preventDefault()
        navigate(`/player/${id}`)
    }

    const onSearchChanged=(event)=> {
        setID(event.target.value)
    }

    useEffect(() => {
        fetchUserProfileData();
    }, [params.id]);

    const fetchUserProfileData = () => {
        fetch(`https://api.opendota.com/api/players/${id}`).then((Response) => Response.json()).then((data) => {
            setProfileData(data)
            console.log(data)
        })
    };


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

            {!profileData ? <div>
                <h2>Player Name: {profileData.profile.personaname}</h2>
                <h2>MMR : {profileData.mmr_estimate.estimate}</h2>
                <img src={profileData.profile.avatarmedium}></img>
            </div> : <p></p>}
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
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/player/:id" element={<LoadUserData />}></Route>
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default LoadingPage
