import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Keyword from "./Keyword"
import Date from "./Date"; 


const styles = theme => ({
    select: {
        width: 200, 
        height: 50, 
    },
    keyword: {
        width: 100, 
    },
    date: {
        width: 100, 
    }
})

class SearchBy extends Component {

    state = {
        search: '',
        click: '', 
      };

    keywordSearch = (event) => {
        this.setState({ 
            search: event.target.value, 
        });
    }
    
    dateSearch = (event) => {
        this.setState({ 
            search: event.target.value, 
        });
    }

    render() {

        let search;
        if(this.state.search === 1) {
            search = <Keyword /> 
            return search;
        } else if (this.state.search === 2) {
            search = <Date />
            return search;
        }

        const { classes } = this.props;        
        
        return (
        <section>
            <div>
                    <center> <p>Select a Search By Option: </p> </center>
                    
                    <MenuItem value={1} 
                    className={classes.keyword} 
                    onClick={this.keywordSearch}
                    >Keyword</MenuItem>

                    <MenuItem value={2} 
                    className={classes.date} 
                    onClick={this.dateSearch}
                    >Date</MenuItem>
            </div>
        </section>
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