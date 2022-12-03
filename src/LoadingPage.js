import { SEU_USER_ID } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, json } from "react-router-dom"
import { useState, useEffect } from "react"

function LoadUserData() {

    const params = useParams()
    const [profileData, setProfileData] = useState({})
    const [id, setID] = useState(!params.id ? params.id : SEU_USER_ID)

    useEffect(() => {
        fetchUserProfileData();
    }, [params.id]);

    const fetchUserProfileData = async () => {
        const userProfile = await fetch(`https://api.opendota.com/api/players/${id}`);
        const user = await userProfile.json();
        setProfileData(user);
        console.log(user)
    };


    return <div>
        <h2>Player Name: {profileData.profile.personaname}</h2>
        <h2>MMR : {profileData.solo_competitive_rank}</h2>
        <img src = {profileData.profile.avatarmedium}></img>
    </div>
}

function LoadingPage() {
    return <div>
        <h1>Open Dota Project</h1>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoadUserData />}></Route>
                <Route path="/:id" element={<LoadUserData />}></Route>
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </BrowserRouter>
    </div>
}

export default LoadingPage
