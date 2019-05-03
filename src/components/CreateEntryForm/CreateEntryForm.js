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
                title: 'CandyTopia 1 year Anni Video',
                url: 'https://www.facebook.com/jania.xiong.75/posts/104635964086457?__xts__[0]=68.ARDolE1BWBeQExO1zvY7DUpQMoBf_qfMX6yrfeCB86dn-Dqx9r7VNhfX70Ybgtf8Dvc9N2Frj2Huvo905gHA9iBmSoNcjPgWuIZPBTFmF8Qkp0ZoZFhCDBl9c6X-gBFqlVK-GE12nr_XHy_6sun9s2dTs4WhYmTlzyhY--CPsgih11VHjsiC6EoDOw3AzYKAClVwbYxi0pA7uqaBflgUHu-nIWMqbvtTZjFNl4VyLg8Ut-2H7g7Bi4I9bn7ETJgwWLgOE1ayJBX3MO7DLmrJyY-I_4dD8DON8qiniLkkI8GdpHBM4XucVgvykTPz1UT0oby6qjDv9wm5eIJ0xi4JdpQGqhiE1zmwVBFCUw&__tn__=C-R',
                date: '2019-05-24',
                location: 'Mall of America, Bloomington', 
                description: 'We shot with Jania a project of his. Super fun.',          
            }
        }); 
        this.props.dispatch({ type: 'ADD_ENTRY', payload: this.state.newEntry })
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
                        <Button onClick={this.test}>  </Button> 
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