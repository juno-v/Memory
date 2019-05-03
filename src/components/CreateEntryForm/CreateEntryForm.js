import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
      button: {
        width: 200,
        marginLeft: theme.spacing.unit,
      },
      text: {
          width: 500,
      },
      createButtonIcon: {
        marginLeft: theme.spacing.unit,
      }
  });

class CreateEntryForm extends Component {

    state = {
        newEntry: {
            user_id: this.props.reduxState.user.id,
            title: '',
            url: '', 
            date: '',
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
        console.log(`state is: `, this.state.newEntry)
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
    this.props.dispatch({ type: 'ADD_ENTRY', payload: this.state.newEntry })
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


    test = () => {
        this.setState({
            newEntry: {
                user_id: this.props.reduxState.user.id,
                title: 'hello',
                url: 'https://www.youtube.com/watch?v=Kbns_lB2qHA&t=1s',
                date: '2019-05-24',
                location: 'bloomington', 
                description: 'beautiful place to be',          
            }
        }); 
    }


    render() {

        const { classes } = this.props;

        return (

            <div className="CreateEntryFormDiv" >
                <div className="CreateEntryChildDiv" >
                   
                    <form className="materialForm" >
                        <input type="file" name="file" onChange={this.handleFileChange('file')} /> <br/>
                        
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
                        label="Insert Description"  className={classes.text} multiline={true}/> <br/> <br />
                        <Button variant="contained" color="primary" onClick={this.addEntry} style={{justifyContent: 'center'}} >
                            Create Entry
                            <Icon className={classes.createButtonIcon}>send</Icon>
                        </Button>
                        <Button onClick={this.test}> Test </Button> 
                    </form>
                </div>
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