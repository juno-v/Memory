import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
      button: {
        width: 200,
     
      },
      text: {
          width: 500,
      }
  });

class CreateEntryForm extends Component {

    state = {
        newEntry: {
            user_id: this.props.reduxState.user.id,
            title: '',
            url: '', 
            date: null,
            location: '',
            description: '',
            file: null,
    }
}

     // set state for onChange of textfields 
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

    // on click, dispatch new textfield values to addEntrySaga
    addEntry = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_ENTRY', payload: this.state.newEntry })
        // dispatch to saga to post form values 
        this.setState({
        newEntry: {
            user_id: this.props.reduxState.user.id,
            title: '',
            url: '',
            date: '',
            location: '', 
            description: '',          
        }
    });  
}

    // set state for onChange of upload file 
    handleFileChange = (propertyName) => { 
        return(event) =>{
            this.setState({
                newEntry: {
                    ...this.state.newEntry, 
                    [propertyName]: event.target.files[0],
                }
            });
        }    
    }

    websiteUrl = (url) => {
        let gitHubLink = <a href={"https://github.com/jvue96/FullStack-Solo-Project---MemorMe"} 
        rel="noopener noreferrer" target="_blank"> Github </a>
        return gitHubLink; 
      }


    render() {

        const { classes } = this.props;

        return (

            <div className="CreateEntryFormDiv" >
                <div className="CreateEntryChildDiv" >
                    <form onSubmit={this.addEntry} className="materialForm" >
                        {/* commented out AWS functinoality. will not include for deployment purposes. */}
                        {/* <input type="file" name="file" onChange={this.handleFileChange('file')} /> <br/> */}
                        
                        <TextField type='text' value={this.state.newEntry.title || ''} onChange={this.handleNameChange('title')}
                        label="Insert Journal Title" className={classes.text} /> <br />
                        
                        <TextField type='text' value={this.state.newEntry.url || ''} onChange={this.handleNameChange('url')} 
                        label="Insert Youtube URL" className={classes.text}/> <br/>
                        
                        <TextField id="date" label="Select Date" type="date" value={this.state.newEntry.date || ''} 
                        onChange={this.handleNameChange('date')} InputLabelProps={{ shrink: true,}}
                        className={classes.text} />  <br/>
                        
                        <TextField type='text' value={this.state.newEntry.location || ''} onChange={this.handleNameChange('location')}
                        label="Insert Location" className={classes.text} /> <br/>
                        
                        <TextField type='text' value={this.state.newEntry.description || ''} onChange={this.handleNameChange('description')} 
                        label="Insert Description"  className={classes.text} /> <br/> <br />
                        <center>
                        <Button className={classes.button} type='submit' color="primary" variant="contained"> Create Entry </Button> 
                        </center>
                    </form>
                </div>
                <p> Technologies used: Technology used: React, Redux, Node, Amazon Web Services S3, Material UI, Redux, Passport, Postgres</p>
                <p>Github Repo: {this.websiteUrl()}</p>
            </div>
        );
    }
}

CreateEntryForm.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapStateToProps = reduxState => ({
    reduxState,
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
)(CreateEntryForm);