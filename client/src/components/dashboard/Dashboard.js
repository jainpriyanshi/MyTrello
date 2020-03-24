import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
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
            <div class="card">
            <div id = {b.boardid} class="mt-2 mb-2" >

            <Link to={{ pathname: '/board', state: { id: b.boardid , name: b.name} }}>
              <EditIcon type = "submit" color= "action"/>
             </Link>
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
    const { user } = this.props.auth;
    return (
      <div class ="row ">
         <div class="card container col-5 center mt-5" >
            <h1 class="mt-4"> Boards </h1>
            {this.fetch_data()}
          </div>
            
          <div class="card container col-4 center mt-5" >

            <form  onSubmit={this.onSubmit} class="mt-5" >
            <input
                  onChange={this.onChange}
                  value={this.state.boardname}
                  id="boardname"
                  type="text"
              />
              <label htmlFor="boardname">Enter project</label>
              <br />
              <button
                  className="btn btn-small waves-effect blue accent-3 mb-3"
                  type="submit"> 
                <AddIcon /> 
              </button>
              <br/>
              <h2> Team Invites </h2>
              {this.fetch_team()}
            </form>
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
