import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios"
import {Link} from "react-router-dom";

class Board extends Component {
  state = {
    array: [],
    listname: ""
   };
   componentDidMount() {
    axios.get('/boards/getlist')
    .then((response) => {
        this.setState({array : response.data});
    });
   }
   onChange = e => {
    this.setState({ [e.target.id]: e.target.value });

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

      axios.get('/boards/getlist')
      .then((response) => {
          this.setState({array : response.data});
      });
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
            <div id = {b.listid} >
              <b style={{textSize: "20px"}}> {b.name} </b>
            
              <Link to={{ pathname: '/board/list', state: { id: b.listid} }}>
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
    return (
      <div>
         <div class="card container col-lg-6 mx-auto center" >
           <div style={{marginTop: "50px" }}>
          <h1> List </h1>
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
