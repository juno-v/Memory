import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const styles = theme => ({
    select: {
        width: 200, 
        height: 50, 
    }
})

class SearchBy extends Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Select
                    value="Search By"
                    className={classes.select}
                    onChange={this.handleChange}
                    input={<FilledInput name="age" id="filled-age-simple" />}
                >
                    <MenuItem value="Search By"> Search By </MenuItem>
                    <MenuItem /* value={} */>One Keyword</MenuItem>
                    <MenuItem /* value={} */>Date</MenuItem>
                </Select>
            </div>
        );
    }
}

SearchBy.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = reduxState => ({
      reduxState,
  });
  
  export default compose(
      withStyles(styles),
      connect(mapStateToProps, null)
  )(SearchBy);