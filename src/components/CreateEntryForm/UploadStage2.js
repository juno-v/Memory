import React, { Component } from 'react';

// MATERIAL UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class UploadStage2 extends Component {
  render() {
    return (
      <div>
        <DialogTitle id="form-dialog-title">Enter post details</DialogTitle>
        <DialogContent>
          <img className="upload-image-for-details" src={this.props.imageDataUrl} alt="profilePictureUrl" />          
          <TextField
              autoFocus
              onChange={this.props.handleChangeFor('title')}
              margin="dense"
              id="postTitle"
              label="Post Title"
              type="text"
              fullWidth
            />
          <TextField
              autoFocus
              onChange={this.props.handleChangeFor('content')}
              margin="dense"
              id="content"
              label="Post Content"
              type="text"
              multiline={true}
              rows={5}
              fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.backToImageUpload} color="primary">
            Back to image upload
          </Button>
          <Button onClick={this.props.handleSubmitPost} color="primary">
            Post!
          </Button>
        </DialogActions>
      </div>
    );
  }
}
export default UploadStage2;
