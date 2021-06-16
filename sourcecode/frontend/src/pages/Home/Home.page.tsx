import React, { useState } from 'react'; 
import { TextField, Button, Paper, Container, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      padding: 30,
      textAlign: "center",
      marginTop: 100
    },
  });

export default function HomePage(props: HomePageProps){
    const classes = useStyles();
    const [userName, setUserName] = React.useState<string>();
    
    function joinGame(){
        props.onLogin(userName!)
    }

    return (
        <Container maxWidth="sm">
            <Paper variant="outlined" className={classes.root}>
                <h2>Welcome to</h2>
                <h1>Mini Card Game!</h1>
                <form noValidate autoComplete="off">
                    <TextField id="username" label="Username" variant="outlined" placeholder="Type here your user name" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                    <Box>
                        <Button onClick={() => joinGame()} variant="contained" color="primary">Join a game</Button>
                    </Box>
                </form> 
            </Paper>
        </Container>
    );
}

export interface HomePageProps {
    onLogin: (userName: string) => void
}