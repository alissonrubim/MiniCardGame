import React, { useState } from 'react'; 
import { TextField, Button, Paper, Container, Box, FormControl, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      padding: 30,
      textAlign: "center",
      marginTop: 100,
      boxShadow: "0px 0px 10px #0000003b"
    },
    logo: {
        width: 280,
        height: 280,
        margin: '0 auto',
        marginBottom: 30,
    },
    logo_bg: {
        backgroundImage: "url(/images/logo_1.png)",
        backgroundSize: '280px 280px',
        width: 280,
        height: 280,
        animationName: 'spin',
        animationDuration: '50000ms',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear' 
    },
    logo_icon: {
        width: 280,
        height: 280,
        backgroundImage: "url(/images/logo_2.png)",
        backgroundSize: '280px 280px',
        position: "relative",
        top: -280,
        left: 0
    },
    buttonLogin: {
        height: 55,
    },
    appname: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#234169',
        marginBottom: 30
    }
  });

export default function HomePage(props: HomePageProps){
    const classes = useStyles();
    const [userName, setUserName] = React.useState<string>();
    
    function joinGame(){
        props.onLogin(userName!)
    }

    return (
        <Container maxWidth="sm">
            <Paper variant="outlined" className={classes.root} elevation={7}>
                <div className={classes.logo}>
                    <div className={classes.logo_bg}> </div>
                    <div className={classes.logo_icon}></div>
                </div>
                <div className={classes.appname}>
                    MINICARDGAME
                </div>
                <FormControl>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField id="username" label="Username" variant="outlined" placeholder="Type here your user name" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Button onClick={() => joinGame()} className={classes.buttonLogin}variant="contained" color="primary" size="large">Join a game</Button>
                        </Grid>
                    </Grid>
                </FormControl> 
            </Paper>
        </Container>
    );
}

export interface HomePageProps {
    onLogin: (userName: string) => void
}