import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from "../HomeHeader/HomeHeader";
import About from "./About";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

  
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div className="logInParentDiv" >
        <HomeHeader /> 
        <About />
      <div className="loginInChildDiv" >
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        
        <center>
        <div className="logInFormDiv">
            <TextField
              label="username"
              name="username"
              className={classes.textField}
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              margin="normal"
              variant="outlined"
            />
       
            <TextField
              label="password"
              name="password"
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
              variant="outlined"
            /> <br />
        </div>
          <Button
            variant="contained" 
            color="primary"
            className="log-in"
            onClick={this.login} 
            >
            Log In
          </Button> <br /> <hr /> 

          <Button
          variant="contained" 
          color="secondary"
          className="link-button" 
          onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
          Register
          </Button>
        </center>
      </div>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
)(LoginPage);