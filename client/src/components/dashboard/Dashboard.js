import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Pageview';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

class Dashboard extends Component {
  state = {
    array: [],
    boardname: ""
   };
   componentDidMount() {
    axios.get('/boards/getboards')
    .then((response) => {
        this.setState({array : response.data});
    });
   }
   onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
      e.preventDefault();
      const board = {
           name: this.state.boardname,
           userid: this.props.auth.user.id
        };
        console.log(board)
      axios
      .post("/boards/createboard", board)
      .then(res => this.props.history.push("/patient/login"))
      axios.get('/boards/getboards')
      .then((response) => {
          this.setState({array : response.data});
      });
    };
    onClick = (e,id) =>
        {   
            e.preventDefault();
            const data= { id: this.props.auth.user.id , boardid: id};
            console.log(data);
            axios.post('/boards/acceptinvite',data)
            .then(res => this.props.history.push("/patient/login"));
            axios.get('/boards/getboards')
            .then((response) => {
             this.setState({array : response.data});
      });
            
        }

   fetch_data() {
      var Board = [];
      var board =[];
      return this.state.array.map(arr => {
        Board=arr.boards;
        if(arr._id===this.props.auth.user.id)
        {
          return(
            board=Board.map((b) => {
            if(b.accepted===true)
            {
              return(
            <div class="card" style={{display: "flex"}}>
            <div id = {b.boardid} class="mt-2 mb-2" style={{display: "flex"}} >

            <Link to={{ pathname: '/board', state: { id: b.boardid , name: b.name} }} style={{marginLeft: "35%"}}>
            <Avatar className="blue center" >
                <EditIcon />
              </Avatar>
             </Link>
              <b style={{fontSize: "19px", fontFamily: "roboto" , marginLeft: "6%" , marginTop: "7px"}}> {b.name} </b>
            </div>
            </div>
              )
            } }
            )
          )
        }
      })
   }
   fetch_team() {
    var Board = [];
    var board =[];
    return this.state.array.map(arr => {
      Board=arr.boards;
      if(arr._id===this.props.auth.user.id)
      {
        return(
          board=Board.map((b) => {
          if(b.accepted===false)  
          {
            return(
          <div class="card">
          <div id = {b.boardid} class="mt-2 mb-2" >

          <FavoriteBorderIcon onClick={(event)=> {this.onClick(event,b.boardid)}}></FavoriteBorderIcon>
            <b style={{textSize: "20px"}}> {b.name} </b>
          </div>
          </div>
            )
          } }
          )
        )
      }
    })
 }
  render() {
    return (
      <div class ="row ">
         <div class="card container col-5 center mt-5" >
            <h1 class="mt-4"> Boards </h1>
            {this.fetch_data()}
          </div>
          <div class="col-4 container" >
          <div class="card container col-12 center mt-5" >
            <form  
            onSubmit={this.onSubmit} 
            class="mt-3" 
            style={{display: "flex"}} 
            >
              <div className="input-field col s12">
            <input
                  onChange={this.onChange}
                  value={this.state.boardname}
                  id="boardname"
                  type="text"
                  placeholder="Enter New Project Name"
              />
              </div>
              <Avatar className="blue center mt-3" >
              <button
                  className="btn "
                  type="submit"> 
                <AddIcon /> 
              </button>
              </Avatar>
              <br/>
             
            </form>
           
            </div>
            <div class="card container col-12 center mt-5" >
            <h2 class="mt-2"> Team Invites </h2>
              {this.fetch_team()}
            </div>
            </div>
            </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Dashboard);
