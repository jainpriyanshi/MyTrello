import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import './board.css';
import io from "socket.io-client";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const socket = io.connect("http://localhost:3000");

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
      this.setState({listname: ""});
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
   fetch_data = e => {
      var List = [];
      var list =[];
      return this.state.array.map(arr => {
        List=arr.list;
        
        if(arr._id===this.props.location.state.id)
        {
          return(
            list=List.map((b) =>
            {
            if(b.state===e)
            {
              return(
             <div class = "card container mt-1" style={{display: "flex"}} >
             <div id = {b.listid} class = "mt-2 mb-2" style={{display: "flex"}}>
              <Link to={{ pathname: '/board/list', state: { id: b.listid} }} class="mt-2" style={{marginLeft: "20%"}}>
              <EditIcon color="action" type = "submit" /> 
              </Link>
              <b class= "large mt-2 ml-2 mr-2"> {b.name} </b>
              < SimpleMenu  listid= {b.listid} boardid = {this.props.location.state.id} />
            </div>
            </div>
            )}}
            )
          )
        }
      })
   }
   fetch_msg() {
    var List = [];
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
      <div class = "row ml-2 mr-2 " style={{display: "flex"}}>
       
        <div class=" col-lg-6 mx-auto center mb-2 ml-2 mr-2"> </div>
        <div class="container col-lg-6 mx-auto center mb-2 ml-2 mr-2"> 
          <form  onSubmit={this.onInvite} style={{display: "flex"}} >
            <input
              onChange={this.onChange}
              value={this.state.email}
              id="email"
              type="email"
              placeholder= "Invite Member by mail address"
              style={{color: "white"}}
            />
            
            <br />
            <Avatar className="blue center mt-2" >
              <button
                  className="btn "
                  type="submit"> 
                <AddIcon /> 
              </button>
              </Avatar>
          </form>
        </div>
        <div class="col-3 container">                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
        <div class="card container col-12  center" >
          <div style={{marginTop: "50px" }}>
            <h4> Things To do </h4>
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            {this.fetch_data('1')}
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> 
            </div>
          </div>
          <form  onSubmit={this.onSubmit} style={{display: "flex"}}>
            <input
              onChange={this.onChange}
              value={this.state.listname}
              id="listname"
              type="text"
              placeholder = "Enter task"
            />
            <br />
            <Avatar className="blue center mt-2" >
              <button
                  className="btn "
                  type="submit"> 
                <AddIcon /> 
              </button>
              </Avatar>
            </form>
          </div>
          </div>
          <div class="col-3 container">   
          <div class="card container col-12  center "  >
           <div style={{marginTop: "50px" }}>
          <h4> Things Doing </h4>
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            {this.fetch_data('2')}
            </div>
          </div>
          </div>
          <div class="col-3 container">   
          <div class="card container col-12  center "  >
           <div style={{marginTop: "50px" }}>
          <h4> Things Done </h4>
            
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            {this.fetch_data('3')}
            </div>
          </div>
          </div>
          <div class="col-3 container">   
          <div class="card container col-12  center "  >
           <div style={{marginTop: "50px" }}>
          <h4 class="center "> Chat </h4>
          <form  onSubmit={this.onMessageSubmit} >
            <input
                  onChange={this.onChange}
                  value={this.state.text}
                  id="text"
                  type="text"
                  autofocus="true"
                  placeholder="type message"
              />
              
              <br />
            </form>
          <div class="overflow-auto container  scroll " style={{maxHeight: "200px", bottom: "0px"}}>
          {this.fetch_msg()}
          </div>
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            </div>
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

const SimpleMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleThing =(e) =>
  {
    e.preventDefault();
    var obj = {
      index: e.target.getAttribute('index'),
      listid: props.listid,
      boardid: props.boardid
    }
    axios.post('/boards/changestate',obj);
    window.location.reload(false);
  } 

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{display: "flex"}}>
         <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem index="1"  onClick={handleThing}>Things to do</MenuItem>
        <MenuItem index="2" onClick={handleThing}>Things doing</MenuItem>
        <MenuItem index="3" onClick={handleThing}>Things done</MenuItem>
      </Menu>
    </div>
  );
}
