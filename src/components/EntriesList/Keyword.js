import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    text: {
        width: 200, 
    }
});



class Keyword extends Component {

    state = {
        keyword: '', 
    }


    handleNameChange = (propertyName) => {   
        return(event) =>{
        this.setState({
            newEntry: {
            ...this.state.newEntry,
            [propertyName]: event.target.value,
            }
        });
        }    
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField type='text' value={this.state.keyword} className={classes.text} onChange={this.handleNameChange('keyword')} 
                    label="Insert One Key To Earch By"/>
                    <br/>
            </div>
        );
    }
}

Keyword.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = reduxState => ({
      reduxState,
  });
  
  export default compose(
      withStyles(styles),
      connect(mapStateToProps, null)
  )(Keyword);