import { SEU_USER_ID, ProfileData, WinLost, RecentMatches, PlayerLists, ProPlayerList} from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, NavLink } from "react-router-dom"
import * as React from 'react';
import { useState, useEffect } from "react"
import { TextField, Button, Box, Avatar, Card, CardActions, CardContent, CardMedia, Typography, AppBar, Toolbar, Grid } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import { convertDate, getHero, getHeroAvatar, getTeam, getResult, generateRandom, getGameMode, getDuration, getCountry, getRole, getRankByTier} from "./Utils"
import './LoadingPage.css';

function LoadUserData() {

    const navigate = useNavigate()
    const params = useParams()
    const [profileData, setProfileData] = useState(ProfileData)
    const [winLost, setWinLost] = useState(WinLost);
    const [recentMatches, setRecentMatches] = useState(RecentMatches);
    const [id, setID] = useState(params.queryId ? params.queryId : SEU_USER_ID)
    const [query, setQuery] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`/players/${query}`)
    }

    const onSearchChanged = (event) => {
        setQuery(event.target.value)
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
                value={query}
                onChange={onSearchChanged}
            ></TextField> {' '}
            <Button variant="contained" size="large" onClick={handleSubmit}>Search</Button>

            <div>
                <div className="container">
                    <Avatar
                        className="img"
                        alt={profileData.profile.personaname}
                        src={profileData.profile.avatarfull}
                        //src={window.location.origin + '/img/archon3.png'}
                        sx={{ width: 120, height: 120 }}
                    />
                    <Typography textAlign={"center"} variant="h4" color="text.primary">
                        {profileData.profile.personaname}
                    </Typography>

                    <Typography mt={2} textAlign={"center"} variant="h5" color="text.primary">
                        MMR : {profileData.mmr_estimate.estimate}
                    </Typography>


                    <div className="test_center">

                        <Typography mt={2} ml={3} variant="h5" color="green">
                            Win: {winLost.win}
                        </Typography>

                        <Typography mt={2} ml={3} variant="h5" color="red">
                            Lost: {winLost.lose}
                        </Typography>
                    </div>

                    <Typography mt={2} textAlign={"center"} variant="h5" color="text.primary">
                        Win Rate : {((winLost.win / (winLost.lose + winLost.win)) * 100).toFixed(2)}%
                    </Typography>
                </div>

                <Typography mt={6} md={4} textAlign={"center"} variant="h4" color="text.primary">
                    Recent Matches
                </Typography>

                <MatchesTable matches={recentMatches} id={id} />

            </div>
        </form>

    </div>
}

function HomePage() {

    console.log(getRankByTier(2553))

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
                <Route path="/players/:queryString" element={<PlayerList />}></Route>
                <Route path="/pros" element={<ProPLayer/>}></Route>
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
                        variant="h6" noWrap component="a" href="/"
                        sx={{mr: 2, display: { xs: 'none', md: 'flex' }, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',}}
                        >Dota2
                    </Typography>
                    {"   "}
                    <Button color="inherit">Match</Button>
                    <Button color="inherit"><NavLink
                        to={`player/${SEU_USER_ID}`}
                        style={{color: 'white', textDecoration: 'none',}}
                        >Player
                    </NavLink></Button>
                    <Button color="inherit"><NavLink to={`pros`}
                        style={{color: 'white', textDecoration: 'none',}}>Top Player</NavLink></Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}



function MatchesTable(props) {

    const [recentMatches, setRecentMatches] = useState(RecentMatches);
    const column = [
        {
            field: 'hero_id',
            headerName: 'Hero',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="tableAvatar">
                        <Avatar sx={{ mr: 2 }} src={getHeroAvatar(params)} /> {getHero(params)}
                    </div>
                );
            }
        },
        { field: 'player_slot', headerName: 'Team', width: 130, valueGetter: getTeam},
        { field: 'radiant_win', headerName: 'Result', width: 130, valueGetter: getResult},
        { field: 'kills', headerName: 'Kills', width: 130 },
        { field: 'deaths', headerName: 'Deaths', width: 130 },
        { field: 'assists', headerName: 'Assists', width: 130 },
        { field: 'average_rank', headerName: 'Skill Rank', width: 130, valueGetter:getRankByTier},
        { field: 'game_mode', headerName: 'Game Mode', width: 130, valueGetter:getGameMode},
        { field: 'duration', headerName: 'Duration (Mins)', width: 130, valueGetter:getDuration},
    ];

    useEffect(() => {
        fetch(`https://api.opendota.com/api/players/${props.id}/recentMatches`).then((Response) => Response.json()).then((data) => {
            setRecentMatches(data)
            console.log("The matches data is " + data)
        })
    }, [props.id]);

    return (
        <center>
            <div className="table">
                <DataGrid
                    rows={recentMatches}
                    columns={column}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    getRowId={(row) => generateRandom()}
                />
            </div>
        </center>
    );
}

function PlayerList() {

    const navigate = useNavigate()
    const params = useParams()
    const [queryString, setQueryString] = useState(params.queryString ? params.queryString : '')
    const [playerList, setPlayerList] = useState(PlayerLists)

    useEffect(() => {
        fetch(`https://api.opendota.com/api/search?q=${queryString}`).then((Response) => Response.json()).then((data) => {
            setPlayerList(data)
        })
    }, [params.queryString]);

    const toUserData = (id) => {
        navigate(`/player/${id}`)

    }

    return <div>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">

            {playerList.map((data, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            sx={{ padding: "6px 6px 6px 6px", objectFit: "contain", justifyContent: "center" }}
                            src={data.avatarfull}
                            alt={data.personaname}

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.personaname}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Last Online : {convertDate(data.last_match_time)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClickCapture={() => toUserData(data.account_id)}>More Details</Button>
                        </CardActions>
                    </Card>
                </Grid>

            ))}
        </Grid>
    </div>
}

function ProPLayer() {

    const navigate = useNavigate()
    const [proPlayerList , setProPlayerList] = useState(ProPlayerList)

    useEffect(() => {
        fetch(`https://api.opendota.com/api/proPlayers`).then((Response) => Response.json()).then((data) => {
            setProPlayerList(data)
            console.log(data)
        })
    }, []);

    const toUserData = (id) => {
        navigate(`/player/${id}`)

    }

    return <div>
        <Grid container spacing={2} direction="row" justify="flex-start" alignItems="flex-start">
            {proPlayerList.slice(0,500).map((data, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="150"
                            sx={{ padding: "6px 6px 6px 6px", objectFit: "contain", justifyContent: "center" }}
                            src={data.avatarfull}
                            alt={data.personaname}/>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {data.personaname}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Last Online : {convertDate(data.last_match_time)}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Country : {data.loccountrycode ? getCountry(data.loccountrycode) : 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Role : {data.fantasy_role? getRole(data.fantasy_role) : 'N/A'}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Team : {data.team_name? data.team_name : 'N/A'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClickCapture={() => toUserData(data.account_id)}>More Details</Button>
                        </CardActions>
                    </Card>
                </Grid>

            ))}
        </Grid>
    </div>
}



export default LoadingPage
