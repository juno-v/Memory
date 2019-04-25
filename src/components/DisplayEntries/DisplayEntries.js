import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import moment from 'moment';
import axios from "axios"
import { runInThisContext } from 'vm';

import TextField from '@material-ui/core/TextField';



const styles = theme => ({
  card: {
    maxWidth: 200,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
    button: {
      margin: theme.spacing.unit,
    },
});

class DisplayEntries extends Component {

  state = {
    id: this.props.reduxState.user.id,
    entryId: this.props.entry.id,
    flip: true, 
    
  }

    formatDate = (date) => {
        let entryDate =  moment(date).format("YYYY-MM-DD"); 
        return entryDate; 
    }

    deleteJournal = (event) => {
      console.log(`hit delete!`);
      console.log(this.props.entry.id);
      console.log(`user id is`, this.state.id);
    
    
      this.props.dispatch({type: 'DELETE_ENTRY', payload: this.state })
    
    }

    editJournal = (event) => {
      console.log(`hit edit!`);
      this.setState({
        flip: !this.state.flip, 
      })
      
    }

    viewJournal = () => {
      console.log(`hit viewJournal!`);
      
    }

    flip = () => {
      this.setState({
        flip: !this.state.flip, 
      })
    }

  render() {
    const { classes } = this.props;
    const state = this.props.state

    return (
      <div>
      {this.state.flip ?
      <Card className={classes.card}> 
        <CardHeader
          title={this.props.entry.title}
          subheader={this.formatDate(this.props.entry.date)}
        />
        <CardMedia
          className={classes.media}
          // image={`https://s3.us-east-2.amazonaws.com/jvueproject1/${this.props.entry.file}`}
          image="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/450/s300/prime-20logo-20color.png"
          title=""
        />
        <CardContent>
          <Typography component="p">
            {this.props.entry.description} <br />
            {this.props.entry.url} <br />
            {this.props.entry.location}
            <br />
          {this.props.state}
          </Typography>
        </CardContent>

        <Button className={classes.button}  value="1" variant="contained" color="primary" 
          onClick={this.editJournal}
          
          > Edit Journal </Button>
        <Button className={classes.button} variant="contained" color="secondary" 
          onClick={this.deleteJournal} 
          > DELETE </Button>

        <Button onClick={this.viewJournal}  variant="contained" color="primary" 
          > Read This Journal </Button>
          <br /> 
      </Card>
      :

      <form> 
      
                        <TextField type='text' value={this.props.entry.title} /* onChange={this.handleNameChange('title')}  */
                        label="Insert Journal Title"/>
                        <br/>
                        <TextField type='text' value={this.props.entry.url} /* onChange={this.handleNameChange('url')}  */
                        label="Insert Youtube URL"/>
                        <br/>
                        <TextField id="date" label="Select Date" type="date" defaultValue={this.formatDate(this.props.entry.date)} /* onChange={this.handleNameChange('date')} */ InputLabelProps={{ shrink: true,}}/>
                        <br/>
                        <TextField type='text' value={this.props.entry.location} /* onChange={this.handleNameChange('location')} */
                        label="Insert Location" />
                        <br/>
                        <TextField type='text' value={this.props.entry.description} /* onChange={this.handleNameChange('description')} */ 
                        label="Insert Description"/>
                        <br/>
                        <br />
                        <Button onClick={this.flip} type='submit' color="primary" variant="contained"> Save Updated Entry </Button> 
                    </form>
      } 
      
      </div>
    );
  }
}

DisplayEntries.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = reduxState => ({
    reduxState,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
  )(DisplayEntries);