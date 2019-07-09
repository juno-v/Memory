import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import DateEntries from "./DateEntries";

const styles = theme => ({
    textField: {
        width: 200, 
        height: 50, 
    }
})

class Date extends Component {

    state = {
        date: '', 
        id: this.props.reduxState.user.id,
    
    }

    button = () => {
        this.props.dispatch({type: 'GET_DATE', payload: this.state });
    }

    back = () => {
        window.location.reload(); 
    }

    handleChange = (event) => { 
        console.log(`state.date`, this.state);
        // console.log(event.target.value);
        this.setState({
            date: event.target.value,
            id: this.props.reduxState.user.id,
        }) 
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    onChange={this.handleChange}
                    id="date"
                    label="Select A Date To Search By "
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <br/> <br/> 
                <Button variant="contained" color="primary" onClick={this.button} className={classes.button}> Search </Button> <br/> <br/>
                <Button variant="contained" color="secondary" onClick={this.back}>Back To Search </Button>
                <br/>
                {this.props.reduxState.getDate.map( (entry, index) => {
                        return (
                        <section key={index} className="cards" > 
                            <DateEntries entry={entry} /> 
                        </section> 
                )
                })}  
            </div>
        );
    }
}

Date.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = reduxState => ({
      reduxState,
  });
  
  export default compose(
      withStyles(styles),
      connect(mapStateToProps, null)
  )(Date);