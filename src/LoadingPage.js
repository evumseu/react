import { SEU_USER_ID, ProfileData, WinLost, RecentMatches} from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, NavLink, Navigate, useRouteLoaderData } from "react-router-dom"
import * as React from 'react';
import { useState, useEffect, useLayoutEffect, MouseEvent } from "react"
import { TextField, Button, Box, Avatar, Card, CardActions, CardContent, Typography, AppBar, Toolbar } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import './LoadingPage.css';

function LoadUserData() {

    const navigate = useNavigate()
    const params = useParams()
    const [profileData, setProfileData] = useState(ProfileData)
    const [winLost, setWinLost] = useState(WinLost);
    const [recentMatches, setRecentMatches] = useState(RecentMatches);
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

        fetch(`https://api.opendota.com/api/players/${id}/recentMatches`).then((Response) => Response.json()).then((data) => {
            //setRecentMatches(data)
            console.log(data)
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

                    <div className="center">
                        <Typography mt={2} ml={3} variant="h5" color="green">
                            Win: {winLost.win}
                        </Typography>

                        <Typography mt={2} ml={4} textAlign={"center"} variant="h5" color="red">
                            Lost: {winLost.lose}
                        </Typography>

                    </div>

                    <Typography mt={2} textAlign={"center"} variant="h5" color="text.primary">
                        Win Rate : {((winLost.win / (winLost.lose + winLost.win)) * 100).toFixed(2)}%
                    </Typography>
                </div>

                <MatchesTable matches={recentMatches} />

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

function MatchesTable(props) {

var matchData = [];

    const match = [
        {
            "match_id": 6906115589,
            "player_slot": 4,
            "radiant_win": false,
            "duration": 2985,
            "game_mode": 22,
            "lobby_type": 0,
            "hero_id": 110,
            "start_time": 1670419875,
            "version": null,
            "kills": 1,
            "deaths": 20,
            "assists": 10,
            "skill": null,
            "average_rank": 33,
            "xp_per_min": 424,
            "gold_per_min": 289,
            "hero_damage": 21530,
            "tower_damage": 104,
            "hero_healing": 48,
            "last_hits": 132,
            "lane": null,
            "lane_role": null,
            "is_roaming": null,
            "cluster": 151,
            "leaver_status": 0,
            "party_size": 1
          },
    ]

    const column = [
        { field: 'hero_id', headerName: 'Hero', width: 130 },
        { field: 'player_slot', headerName: 'Team', width: 130},
        { field: 'radiant_win', headerName: 'Result', width: 70 },
        { field: 'kills', headerName: 'Kills', width: 70 },
        { field: 'deaths', headerName: 'Deaths', width: 70 },
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];

    if (!props.matches){
        matchData = props.matches
    } else {
        matchData = match;
    }

    return (
        <center>
            <div className="table">
               {console.log("This is here" + props.matches)} 
                <DataGrid
                    rows={props.matches}
                    columns={column}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    getRowId={(row) =>  row.match_id}
                />
            </div>
        </center>
    );
}





export default LoadingPage
