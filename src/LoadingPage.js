import { HeroDataBase } from "./HeroDataBase"
import { SEU_USER_ID, ProfileData, WinLost, RecentMatches, playerLists } from "./OpenDotaDB"
import { BrowserRouter, Routes, Route, useParams, useNavigate, NavLink } from "react-router-dom"
import * as React from 'react';
import { useState, useEffect } from "react"
import { TextField, Button, Box, Avatar, Card, CardActions, CardContent, CardMedia, Typography, AppBar, Toolbar, Grid } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
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
                    <Button color="inherit">Match</Button>
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

    function getTeam(params) {
        if (params.value > 127) {
            return "Dire"
        } else {
            return "Radiant"
        }
    }

    function getResult(params) {
        if (params.row.player_slot > 127) {
            if (params.value) {
                return "Lost"
            } else {
                return "Win"
            }
        } else {
            if (params.value) {
                return "Win"
            } else {
                return "Lost"
            }
        }
    }

    function getHero(params) {
        for (var i = 0; i < HeroDataBase.length; i++) {
            if (params.value === HeroDataBase[i].id) {
                return HeroDataBase[i].localized_name
            }
        }
    }

    function getHeroAvatar(params) {
        for (var i = 0; i < HeroDataBase.length; i++) {
            if (params.value === HeroDataBase[i].id) {
                var name = '' + HeroDataBase[i].localized_name
                var result = name.toLocaleLowerCase().replace(/ /g, '')
                var link = "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + result + ".png"
                return link
            }
        }

    }

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
        {
            field: 'player_slot',
            headerName: 'Team',
            width: 130,
            valueGetter: getTeam,
        },
        {
            field: 'radiant_win',
            headerName: 'Result',
            width: 130,
            valueGetter: getResult,
        },
        { field: 'kills', headerName: 'Kills', width: 130 },
        { field: 'deaths', headerName: 'Deaths', width: 130 },
        { field: 'assists', headerName: 'Assists', width: 130 },
        {
            field: 'average_rank',
            headerName: 'Average Rank',
            width: 130
        },

    ];

    useEffect(() => {

        fetch(`https://api.opendota.com/api/players/${props.id}/recentMatches`).then((Response) => Response.json()).then((data) => {
            setRecentMatches(data)
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

function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function PlayerList() {

    const navigate = useNavigate()
    const params = useParams()
    const [queryString, setQueryString] = useState(params.queryString ? params.queryString : '')
    const [playerList, setPlayerList] = useState(playerLists)

    useEffect(() => {
        fetch(`https://api.opendota.com/api/search?q=${queryString}`).then((Response) => Response.json()).then((data) => {
            setPlayerList(data)
            console.log(data)
        })

    }, [params.queryString]);

    function convertDate(date) {
        var d = new Date(date);
        var month = d.getUTCMonth() + 1
        var dates = d.getUTCDate() + "-" + month + "-" + d.getUTCFullYear()
        return dates
    }

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
                            sx={{ padding: "3px 3px 3px 3px", objectFit: "contain", justifyContent: "center" }}
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



export default LoadingPage
