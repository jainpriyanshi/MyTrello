import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import './board.css';
import io from "socket.io-client";
const socket = io.connect("https://morning-fjord-39504.herokuapp.com");
class Board extends Component {
  state = {
    array: [],
    listname: "",
    email: "",
    boardname: "",
    text: "",
    messages: []
   };
   
   componentDidMount() {
     console.log(this.props);
     socket.on("change_data", this.change_data);
    axios.get('/boards/getlist')
    .then((response) => {
        this.setState({array : response.data});
    });
    axios.get('/boards/getchat')
    .then((response) => {
        this.setState({messages : response.data});
    });
   }
   onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state);
    };
    onSubmit = e => {
      e.preventDefault();
      const list = {
           name: this.state.listname,
           boardid: this.props.location.state.id
        };
        console.log(list)
      axios
      .post("/boards/createlist", list)
      .then(res => this.props.history.push("/patient"))
      axios.get('/boards/getlist')
      .then((response) => {
          this.setState({array : response.data});
      });
    };
    onMessageSubmit = e => {
      e.preventDefault();
      const msg = {
            text: this.state.text,
           boardid: this.props.location.state.id,
           name: this.props.auth.user.name
        };
        socket.emit("chat message" , msg);
        this.setState({text: ""});
    };
    change_data = () =>{
      console.log("data changed")
      axios.get('/boards/getchat')
    .then((response) => {
        this.setState({messages : response.data});
    });
     }
    onInvite = e => {
      e.preventDefault();
      const list = {
           email: this.state.email,
           boardid: this.props.location.state.id,
           boardname: this.props.location.state.name
        };
      axios
      .post("/boards/invitemember", list)
      .then(res => this.props.history.push("/patient"));
      this.setState({email: ""});
      
    };
   fetch_data() {
      var List = [];
      var list =[];
      return this.state.array.map(arr => {
        List=arr.list;
        
        if(arr._id===this.props.location.state.id)
        {
          return(
            list=List.map((b) =>
            <div class = "card container mt-1" >
            <div id = {b.listid} class = "mt-2 mb-2">
              <Link to={{ pathname: '/board/list', state: { id: b.listid} }}>
              
              <EditIcon type = "submit" color= "action"/> 
            
                </Link>
              <b class= "large"> {b.name} </b>
            </div>
            </div>
            )
          )
        }
      })
   }
   fetch_msg() {
    var List = [];
    var list =[];
    return this.state.messages.map(arr => {
      List=arr.list;
      
      if(arr.boardid===this.props.location.state.id)
      {
        return(
          <div class="overflow-auto msg">
             <b> {arr.name} </b>
             <p> {arr.text}</p>
          </div>
        )
      }
    })
 }
  render() {
    return (
      <div class = "row">
        <div class="card container col-lg-11 mx-auto center mt-2 mb-2"> 
        <form  onSubmit={this.onInvite} >
            <input
                  onChange={this.onChange}
                  value={this.state.email}
                  id="email"
                  type="email"
              />
              <label htmlFor="boardname">Invite Members by mail address</label>
              <br />
           
              <button
                  className="btn btn-small  waves-effect waves-light grey accent-3 mb-3"
                        type="submit"
                          > 
                              <AddIcon /> 
                          </button>
            </form>
        </div>
         <div class="card container col-lg-2 overflow-auto center" >
           <div style={{marginTop: "50px" }}>
          <h4> Things To do </h4>
            {this.fetch_data()}
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            </div>
            <form  onSubmit={this.onSubmit} >
            <input
                  onChange={this.onChange}
                  value={this.state.listname}
                  id="listname"
                  type="text"
              />
              <label htmlFor="boardname">Enter Task</label>
              <br />
           
              <button
                  className="btn btn-small  waves-effect waves-light grey accent-3 mb-3"
                        type="submit"
                          > 
                              <AddIcon /> 
                          </button>
            </form>
          </div>
          

          <div class="card container col-lg-2  center overflow-auto" >
           <div style={{marginTop: "50px" }}>
          <h4> Things Doing </h4>
            
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            </div>
            
          </div>
          <div class="card container col-lg-2  center overflow-auto" >
           <div style={{marginTop: "50px" }}>
          <h4> Things Done </h4>
            
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            </div>
            
          </div>

          <div class="card container col-lg-3 overflow-auto scroll"  >
           <div style={{marginTop: "50px" }}>
          <h4 class="center "> Chat </h4>
          <form  onSubmit={this.onMessageSubmit} >
            <input
                  onChange={this.onChange}
                  value={this.state.text}
                  id="text"
                  type="text"
                  autofocus="true"
              />
              <label htmlFor="boardname">Type Message</label>
              <br />
  
            </form>
          <div class="overflow-auto container " style={{maxHeight: "200px", bottom: "0px"}}>
          {this.fetch_msg()}
          </div>
          
            
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
          
            </div>
            
          </div>
         
         
          </div>
  
    );
  }
}

Board.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Board);
