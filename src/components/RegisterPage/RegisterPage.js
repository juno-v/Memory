import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

});

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',

  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } 

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {

    const { classes } = this.props;

    return (
      
      <div>
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
      <div className="registerFormDiv">
        <center>
        {/* <form onSubmit={this.registerUser}> */}
          <h1>Register User</h1>
            <TextField
                label="username"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                margin="normal"
                variant="outlined"
              /> <br />

            <TextField
                label="password"
                className={classes.textField}
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                margin="normal"
                variant="outlined"
              /> <br />
        
          <Button
              variant="contained" 
              color="primary"
              className="register"
              type="submit"
              name="submit"
              onClick={this.registerUser}
              >
              Register
            </Button> <br /> <hr />
            
          <Button
            variant="contained" 
            color="secondary"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
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

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
)(RegisterPage);