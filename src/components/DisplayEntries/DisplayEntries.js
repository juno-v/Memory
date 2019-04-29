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
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import classnames from 'classnames';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';


// unused imports , delete when done 
// import axios from "axios"
// import { runInThisContext } from 'vm';

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
    newEntry: {
      title: this.props.entry.title,
        url: this.props.entry.url,
        date: this.props.entry.date,
        location: this.props.entry.location, 
        description: this.props.entry.description,         
        file: '',  
        expanded: false,
    },

      id: this.props.reduxState.user.id,
      entryId: this.props.entry.id,
      flip: true, 
    }

    formatDate = (date) => {
        let entryDate =  moment(date).format("YYYY-MM-DD"); 
        return entryDate; 
    }

    deleteJournal = () => {
      console.log(`hit delete!`);
      console.log(this.props.entry.id);
      console.log(`user id is`, this.state.id);
    
      this.props.dispatch({type: 'DELETE_ENTRY', payload: this.state });
    }

    editJournal = () => {
      console.log(`hit edit!`);
      this.setState({
        flip: !this.state.flip, 
      })
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

    flip = () => {
      console.log(`after hitting FLIP function !!!!`, this.state.newEntry);
      this.setState({
        flip: !this.state.flip, 
        // ...this.state.newEntry,
        // newEntry: {
        //   title: '',
        //     url: '',
        //     date: '',
        //     location: '', 
        //     description: '',         
        //     file: '',
        // }
      })
    this.props.dispatch({type: 'EDIT_ENTRY', payload: this.state });
    // this.props.dispatch({ type: 'GET_ENTRIES', payload: this.state});
  }

  websiteUrl = (url) => {
    let gitHubLink = <a href={url} rel="noopener noreferrer" target="_blank"> Website </a>
    return gitHubLink; 
  }

  handleExpandClick = () => {
    console.log(`STATE IS???? `, this.state)
    console.log(`reduxState is???? `, this.props.reduxState.getUserEntries);
    
    this.setState(
      ({ 
      expanded: !this.state.expanded 
    }));
  };

  render() {
    const { classes } = this.props;
    

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
            Click to read more! 
            <br />
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
       
       <IconButton
         className={classnames(classes.expand, {
           [classes.expandOpen]: this.state.expanded,
         })}
         onClick={this.handleExpandClick}
         aria-expanded={this.state.expanded}
         aria-label="Show more"
       >
         <ExpandMoreIcon />
       </IconButton>
     </CardActions>
     <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
       <CardContent>
         <Typography >Description:</Typography>
            <Typography >
            {this.props.entry.description}
            </Typography>
         <Typography > A Website: </Typography>
            <Typography >
            {this.websiteUrl(this.props.entry.url)}
            </Typography>
         <Typography > Location: </Typography>
            <Typography > 
            {this.props.entry.location}
            </Typography>
         <Typography > Journal actions </Typography> <hr /> 
         <Typography>
              <Button className={classes.button}  value="1" variant="contained" color="primary" 
              onClick={this.editJournal}
              > Edit Journal </Button> <br />
              <Button className={classes.button} variant="contained" color="secondary" 
                onClick={this.deleteJournal}
                > DELETE </Button> <br />
          </Typography>
         </CardContent>
        </Collapse>
      </Card>
      :

      <div>
          <TextField type='text' value={this.state.newEntry.title} onChange={this.handleNameChange('title')} 
          label="Insert Journal Title"/>
          <br/>
          <TextField type='text' value={this.state.newEntry.url} onChange={this.handleNameChange('url')} 
          label="Insert Youtube URL"/>
          <br/>
          <TextField id="date" label="Select Date" type="date" defaultValue={this.formatDate(this.state.newEntry.date)} onChange={this.handleNameChange('date')} InputLabelProps={{ shrink: true,}}/>
          <br/>
          <TextField type='text' value={this.state.newEntry.location} onChange={this.handleNameChange('location')}
          label="Insert Location" />
          <br/>
          <TextField type='text' value={this.state.newEntry.description} onChange={this.handleNameChange('description')} 
          label="Insert Description"/>
          <br/>
          <br /> 
          <Button onClick={this.flip} type='submit' color="primary" variant="contained"> Save Updated Entry </Button> 
      </div>
          
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