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
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';


const styles = theme => ({
    card: {
      width: 300, 
    },
    media: {
      height: 0,
      paddingTop: '100%', // 16:9
      marginTop:'30'
    },
      button: {
        width: 200,
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      actions: {
        display: 'flex',
      },
      fab: {
        margin: theme.spacing.unit,
      },
      text: {
        width: 500,
    },
  });

class KeywordEntries extends Component {
    render() {
        const { classes } = this.props;
        return (
            
       
                           
                   
    <section>
            <div>
             {this.props.reduxState.getKeywordsReducer.map( (entry, index) => {
                    return (
                        <section key={index} className="cards" >
    <Card className={classes.card}> 
        <CardHeader
          title={this.props.entry.title}
          subheader={this.formatDate(this.props.entry.date)}
        />
        <CardMedia
          className={classes.media}
          image={`https://s3.us-east-2.amazonaws.com/jvueproject1/${this.props.entry.file}`}
          
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
           <br />
          <Fab className={classes.fab} color="primary" aria-label="Edit" value="1" onClick={this.editJournal}>
                  <Icon>edit_icon</Icon>
          </Fab> 

          <Fab className={classes.fab} color="secondary" aria-label="Delete" onClick={this.deleteJournal} >
                  <DeleteIcon />
          </Fab>

          </Typography>
         </CardContent>
        </Collapse>
      </Card>
      </section>
      )
    })}  
            </div> 
        </section>
        );
    }
}

KeywordEntries.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = reduxState => ({
      reduxState,
  });
  
  export default compose(
      withStyles(styles),
      connect(mapStateToProps, null)
  )(KeywordEntries);