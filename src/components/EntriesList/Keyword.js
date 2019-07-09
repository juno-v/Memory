import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import KeywordEntries from "./KeywordEntries";


const styles = theme => ({
    text: {
        width: 300, 
    },
    button: {
        width: 100, 
    }
});



class Keyword extends Component {

    state = {
        keyword: '', 
        id: this.props.reduxState.user.id,
    }


    handleChange = (event) => { 
        console.log(`state.keyword`, this.state.keyword);
        
        this.setState({
            
            keyword: event.target.value,
            id: this.props.reduxState.user.id,

        }) 
    }

    button = () => {
        this.props.dispatch({type: 'GET_KEYWORDS', payload: this.state });
    }

    back = () => {
        window.location.reload(); 
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField type='text' className={classes.text} onChange={this.handleChange} 
                label="Insert One Keyword To Search By"/>
                <br/> <br/>
                <Button variant="contained" color="primary" onClick={this.button} className={classes.button}> Search </Button> <br/> <br/>
                <Button variant="contained" color="secondary" onClick={this.back}>Back To Search </Button>

                <br />
                {this.props.reduxState.getKeywords.map( (entry, index) => {
                        return (
                        <section key={index} className="cards" > 
                            <KeywordEntries entry={entry} /> 
                        </section> 
                )
                })}  
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