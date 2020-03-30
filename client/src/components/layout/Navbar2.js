import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from "react-router-dom"; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Navbar2 extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{display: "flex"}} >
       <AppBar position="static" style={{backgroundColor:"white",width:"100%", align:"left"}}>
        <Toolbar>
        <Link to =  '/'>
            <Typography variant="h6"  style={{textAlign:"left", fontFamily:'Roboto' , color: "black"}}>
              <b>     MyTrello </b> 
          </Typography>
          </Link>
          <Typography variant="h6"  style={{marginLeft: "auto", color : "black" , fontFamily:'Roboto'}}>
            <b>Hey</b> {user.name.split(" ")[0]}
          </Typography>
          <button
              style={{
                marginLeft: "5px",
                borderRadius: "3px"
               
              }}
              onClick={this.onLogoutClick}
              class="btn btn-primary">
            >
              Logout
            </button>
            </Toolbar>
      </AppBar>
      </div>
    );
  }
}

Navbar2.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar2);
