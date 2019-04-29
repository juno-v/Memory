import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

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

     // set state to become text fields' values 
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


    render() {

        return (
            <div>
               
                    <form onSubmit={this.addEntry} /* encType="multipart/form-data" */ >
                    <input type="file" name="file" onChange={this.handleFileChange('file')} />
                        <br/>
                        <TextField type='text' value={this.state.newEntry.title || ''} onChange={this.handleNameChange('title')} 
                        label="Insert Journal Title"/>
                        <br/>
                        <TextField type='text' value={this.state.newEntry.url || ''} onChange={this.handleNameChange('url')} 
                        label="Insert Youtube URL"/>
                        <br/>
                        <TextField id="date" label="Select Date" type="date" value={this.state.newEntry.date || ''} onChange={this.handleNameChange('date')} InputLabelProps={{ shrink: true,}}/>
                        <br/>
                        <TextField type='text' value={this.state.newEntry.location || ''} onChange={this.handleNameChange('location')}
                        label="Insert Location" />
                        <br/>
                        <TextField type='text' value={this.state.newEntry.description || ''} onChange={this.handleNameChange('description')} 
                        label="Insert Description"/>
                        <br/>
                        <br />
                        <Button  type='submit' color="primary" variant="contained"> Create Entry </Button> 
                    </form>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CreateEntryForm);
