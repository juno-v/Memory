import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    textField: {
        width: 200, 
        height: 50, 
    }
})

class Date extends Component {

    back = () => {
        window.location.reload(); 
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TextField
                    id="date"
                    label="Select A Date To Search By "
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
                <br/> <br/> 
                <Button variant="contained" color="secondary" onClick={this.back}>Back To Search </Button>
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