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
        width: 320
    },
    buttonLogin: {
        height: 55
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
                <img src="/images/logo.png" className={classes.logo}/>
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