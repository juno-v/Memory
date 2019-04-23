import React, { Component } from 'react';
// import AWSImages from "../AWSImages/AWSImages";
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import axios from "axios"


class CreateEntryForm extends Component {

    state = {
        newEntry: {
            // id: 1,
            user_id: this.props.reduxState.user.id,
            title: '',
            url: '', 
            date: '',
            location: '',
            description: '',
            file: null,
    }

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

    handleFileUpload = event => {
        this.setState({ 
            newEntry: {
            ...this.state.newEntry,
             file: event.target.files 
            }
        });
    };

    submitFile = event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", this.state.newEntry.file[0]);
        axios
          .post(`/test-upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(response => {
            // handle your response;
            alert("file uploaded successfully");
          })
          .catch(error => {
            // handle your error
          });
      };

    addEntry = (event) => {
        event.preventDefault();
        console.log(`state is: `, this.state.newEntry)
        // dispatch to saga 
        this.props.dispatch({ type: 'ADD_ENTRY', payload: this.state.newEntry })
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
}


    render() {
    
        return (
            <div>
                    <input label="upload file" type="file" onChange={this.handleFileUpload}/>
                    <button onClick={this.submitFile}>Upload your image</button>

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
