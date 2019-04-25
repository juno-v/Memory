import React, { Component, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';


class MapSiftedArray extends Component {

    state = {
        files: null, 
    }

    formatDate = (date) => {
        let entryDate =  moment(date).format(); 
        return entryDate; 
    }

    getFiles = () => {
        console.log('hi im gettinr files ok');
        axios.get('/entry/bucket')
        .then(response => {
          // console.log(response.data.siftedArray);
          this.setState({
            files: response.data.siftedArray
          });  
        //   console.log(`this.state.file is: `, this.state.files[0].LastModified);
          let imageDate = this.state.files[0].LastModified
          this.formatDate(imageDate); 
          // console.log(`LFM IS: `, imageDate);      
        })
    
        .catch(error => {
          console.log('error with getting files', error);
        })
      }
  
    componentDidMount = () => {
      this.getFiles();
    }

    render() {
        return (
            <Fragment>
                
            </Fragment>
        );
    }
}

export default MapSiftedArray;