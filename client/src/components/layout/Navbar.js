import React from 'react';
import {Link} from "react-router-dom"; 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root} >
       <AppBar position="relative" style={{backgroundColor:"black" , width:"100%", align:"left"}}>
        <Toolbar>
            <Typography variant="h6" className={classes.title} style={{textAlign:"left", fontFamily:'Roboto'}}>
            <Link to =  'https://morning-fjord-39504.herokuapp.com'>
            <Button style={{color:"white"}}>  MyTrello </Button>
            </Link>
          </Typography>
          
          <Link to =  'https://morning-fjord-39504.herokuapp.com/register'>
          <Button style={{color:"white"}}> Register</Button>
          </Link>
          <Link to =  'https://morning-fjord-39504.herokuapp.com/login'>
          <Button style={{color:"white"}}> Login </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;