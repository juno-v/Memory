import React, { Component } from 'react';

// MATERIAL UI
import Dialog from '@material-ui/core/Dialog';

//UPLOAD STAGES
import UploadStage1 from './UploadStage1';
import UploadStage2 from './UploadStage2';

import { sendFileAndTextToServer } from '../../requests/sendFormToServer';

class UploadWalkthrough extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      currentUploadStage: 1,
      title: '',
      content: '',
    };
  }

  componentWillReceiveProps = () => {
    this.setState({
      ...this.state,
      open: this.props.open,
    })
  }

  //Dilaog box actions
  handleConfirmImage = () => {
    this.setState({ 
      ...this.state,
      currentUploadStage: 2,
     });
  };

  backToImageUpload = () => {
    this.setState({
      ...this.state,
      currentUploadStage: 1,
    })
  }

  handleCancel = () => {
    this.setState({ 
      ...this.state,
      open: false,
     });
  };

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      open: true,
    })
  }

  handleChangeFor = property => event => {
    this.setState({
      ...this.state,
      [property]: event.target.value,
    })
  }


  //submission
  handleSubmitPost = () => {
    this.triggerSend();
    this.setState({
      open: false,
      profilePictureUrl: '',
      imageData: '',
      currentUploadStage: 1,
    })
  }

  triggerSend = () => {
    const file = this.props.file;
    const text = {
      title: this.state.title,
      content: this.state.content,
    }
    sendFileAndTextToServer(file, text)
  }


  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleCancel}
          aria-labelledby="form-dialog-title"
        >
          {
            this.state.currentUploadStage === 1 &&
              <UploadStage1 
                imageDataUrl={this.props.imageDataUrl} 
                handleCancel = {this.handleCancel}
                handleConfirmImage = {this.handleConfirmImage}
              />
          }
          {
            this.state.currentUploadStage === 2 &&
              <UploadStage2 
                imageDataUrl={this.props.imageDataUrl} 
                backToImageUpload = {this.backToImageUpload}
                handleSubmitPost = {this.handleSubmitPost}
                handleChangeFor = {this.handleChangeFor}
              />
          }
        </Dialog>
      </div>
    );
  }
}
export default UploadWalkthrough;
