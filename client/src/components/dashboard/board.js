import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';

class Board extends Component {
  state = {
    array: [],
    listname: "",
    email: "",
    boardname: "",
   };
   componentDidMount() {
    axios.get('/boards/getlist')
    .then((response) => {
        this.setState({array : response.data});
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
  render() {
    return (
      <div class = "row">
        <div class="card container col-lg-10 mx-auto center mt-2 mb-2"> 
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
         <div class="card container col-lg-3 mx-auto center" >
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
          

          <div class="card container col-lg-3 mx-auto center" >
           <div style={{marginTop: "50px" }}>
          <h4> Things Doing </h4>
            
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            </div>
            
          </div>
          <div class="card container col-lg-3 mx-auto center" >
           <div style={{marginTop: "50px" }}>
          <h4> Things Done </h4>
            
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
