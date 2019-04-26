import React, { Component } from 'react';

class Buttons extends Component {
    render() {
        return (
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
        );
    }
}

export default Buttons;