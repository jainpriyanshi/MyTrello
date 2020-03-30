import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';

class List extends Component {
  state = {
    array: [],
    taskname: "",
   };
   onChange = e => {
    this.setState({ [e.target.id]: e.target.value });

    };
    onSubmit = e => {
      e.preventDefault();
      const task = {
           name: this.state.taskname,
           listid: this.props.location.state.id
        };
        console.log(task)
      axios
      .post("/boards/createtask", task)
      .then(res => this.props.history.push("/patient"))
      axios.get('/boards/gettask')
      .then((response) => {
          this.setState({array : response.data});
          this.setState({taskname : ""});
      });
     
    };
   componentDidMount() {
    console.log(this.props.location.state.id);
    axios.get('/boards/gettask')
    .then((response) => {
        this.setState({array : response.data});
    });
   }
   fetch_data() {
      var Task = [];
      var task =[];
      return this.state.array.map(arr => {
        Task=arr.task;
        
        if(arr._id===this.props.location.state.id)
        {
            console.log(Task);
          return(
            task=Task.map((b) =>
            <div >
                
              <b style={{textSize: "20px"}}> {b.name} </b>
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedB"
                    color="primary"
                  />
                }
              />
             
            </div>
            )
          )
        }
      })
   }
  render() {
    return (
      <div>
         <div class="card container col-lg-6 mx-auto center mt-4" >
           <div style={{marginTop: "50px" }}>
          <h1> check list </h1>
            {this.fetch_data()}
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            </div>
            <form  onSubmit={this.onSubmit} style={{display: "flex" , marginBottom: "10px"}}>
            <input
                  onChange={this.onChange}
                  value={this.state.taskname}
                  id="taskname"
                  type="text"
                  placeholder="Enter Subtask"
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
  
    );
  }
}

List.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(List);

