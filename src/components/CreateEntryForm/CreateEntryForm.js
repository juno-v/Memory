import React, { Component } from 'react';
import AWSImages from "../AWSImages/AWSImages";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';

class CreateEntryForm extends Component {

    state = {
        newEntry: {
            id: 1,
            user_id: '',
            image: '',
            title: '',
            url: '', 
            date: '',
            location: '',
            description: '',
        

        }
    }

    handleNameChange = propertyName => {   
        return(event) =>{
        this.setState({
            newEntry: {
                ...this.state.newEntry,
                [propertyName]: event.target.value,
            }
        });
    }
}

    addEntry = () => {
        // event.preventDefault();
        console.log(`Hello mfer`);
        console.log(`state is: `, this.state.newEntry)
        this.setState({
        newEntry: {
            id: this.state.newEntry.id + 1,
            user_id: '',
            image: '',
            title: '',
            url: '',
            date: '',
            location: '', 
            description: '',
           
        }
    });
        
    }

    render() {
        return (
            <div>
                <AWSImages />
                    <br/>
                    <TextField type='text' value={this.state.newEntry.title || ''} onChange={this.handleNameChange('title')} 
                    label="Insert Journal Title"/>
                    <br/>
                    <TextField type='text' value={this.state.newEntry.url || ''} onChange={this.handleNameChange('url')} 
                    label="Insert Youtube URL"/>
                    <br/>
                    <TextField  type='text' value={this.state.newEntry.date || ''} onChange={this.handleNameChange('date')}
                    label="Select Date" />
                    <br/>
                    <TextField type='text' value={this.state.newEntry.location || ''} onChange={this.handleNameChange('location')}
                    label="Insert Location" />
                     <br/>
                    <TextField type='text' value={this.state.newEntry.description || ''} onChange={this.handleNameChange('description')} 
                    label="Insert Description"/>
                    <br/>
                    <br />
                    <Button onClick={this.addEntry} type='submit' color="primary" variant="contained"> Create Entry </Button> 
            </div>
        );
    }
}

export default CreateEntryForm;