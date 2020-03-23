import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";

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
 
      axios.get('/boards/getboards')
      .then((response) => {
          this.setState({array : response.data});
      });
    };

   fetch_data() {
      var Board = [];
      var board =[];
      return this.state.array.map(arr => {
        Board=arr.boards;
        if(arr._id===this.props.auth.user.id)
        {
          return(
            board=Board.map((b) =>
            <div id = {b.boardid} >
              <b style={{textSize: "20px"}}> {b.name} </b>
            
              <Link to={{ pathname: '/board', state: { id: b.boardid} }}>
              <button
              style={{
                width: "100px",
                borderRadius: "1px",
                letterSpacing: "1px",
                marginTop: "1rem"
               }}
              type="submit"
              className="btn btn-small waves-effect waves-light hoverable blue accent-3"
              >
              Enter
             </button>
             </Link>

            </div>
            )
          )
        }
      })
   }
  render() {
    const { user } = this.props.auth;
    return (
      <div>
         <div class="card container col-lg-6 mx-auto center" >
           <div style={{marginTop: "50px" }}>
          <h1> Boards </h1>
            {this.fetch_data()}
            <div style={{marginTop: "30px" , marginBottom: "20px"}}> </div>
            <form  onSubmit={this.onSubmit} >
            <input
                  onChange={this.onChange}
                  value={this.state.boardname}
                  id="boardname"
                  type="text"
              />
              <label htmlFor="boardname">Enter project</label>
              <br />
                <button
                            style={{
                              width: "150px",
                              borderRadius: "3px",
                              letterSpacing: "1.5px",
                              marginTop: "3rem"
                            }}
                            className="btn btn-small waves-effect waves-light blue accent-3 mb-3"
                            type="submit"
                      
                          >
                            Add
                          </button>
            </form>
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
