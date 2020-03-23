import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


var sectionStyle = {
  position : 'absolute',
  width: "100%",
  height: "100%",
 background: `url(${process.env.PUBLIC_URL}/auth_bg.jpg)` ,
 backgroundPosition: 'center',
 backgroundSize: 'cover',
 backgroundRepeat: 'no-repeat'
};

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("https://morning-fjord-39504.herokuapp.com/dashboard");
    }

  
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
    console.log(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <div style= {sectionStyle}>
        <br></br>
        
      <div class="container">
          <div class="row">
          <div class="col-md-6 col-sm-12 my">
              
              </div>
              <div class="col-md-5 col-sm-12">
              
              <Box width ="100%" height="100%"  item xs={12} sm={8} md={5} component={Paper} elevation={6} className="card" >
              
              
                <div class="conainer">
              <div >
              <h4 style={{ margin: "50px 50px "  }}>
              <b>Sign In</b>
              </h4>
              </div>
                <form noValidate onSubmit={this.onSubmit} style={{ margin: "40px 40px "  }}>
                  <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name">Name</label>
                <span className="red-text">{errors.name}</span>

                  </div>
                  <div className="input-field col s12">
                  <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
                </div>
                <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">{errors.password}</span>
                </div>
           
                <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                      Register
                  </button>
                  <p className="grey-text text-darken-1 mt-2 mb-2">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
                </div>
              </form>
              </div>
          
              </Box>
              </div>
              
            </div>
      </div>   
      </div>

    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
