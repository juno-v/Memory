import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import RawInputUpload from "./RawInputField";
import Images from "./Images"; 

// import axios from "axios"
// import moment from 'moment';


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
            // id: this.state.newEntry.id + 1,
            user_id: this.props.reduxState.user.id,
            title: '',
            url: '',
            date: '',
            location: '', 
            description: '',         
            file: '',  
        }
    });  
    this.props.dispatch({ type: 'ADD_ENTRY', payload: this.state.newEntry })
}


    render() {

        return (
            <div>
                    <Images /> 
                   <RawInputUpload />
                    {/* <input label="upload file" type="file" onChange={this.handleFileUpload}/>
                    <button onClick={this.submitFile}>Upload your image</button> */}

                    <br/>
                    <form>
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
                        <Button onClick={this.addEntry} type='submit' color="primary" variant="contained"> Create Entry </Button> 
                    </form>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(CreateEntryForm);
