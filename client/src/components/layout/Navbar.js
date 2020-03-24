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
            <Link to =  '/'>
             <b style={{color: "white"}}> MyTrello </b>
            </Link>
          </Typography>
          
          <Link to =  '/register'>
          <b style={{color: "white"}} class="mt-4 mr-4"> Register </b>
          </Link>
          <Link to =  '/login'>
          <b style={{color: "white"}} class="mt-4 mr-4"> Login </b>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;