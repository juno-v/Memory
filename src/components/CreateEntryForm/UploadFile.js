import React, { Component } from 'react';

import RawInputField from './RawInputField';
import UppyDragDrop from './UppyDragDrop';
import ImageAndFormWalkthrough from './ImageAndFormWalkthrough';

import Images from './Images';

class UploadFile extends Component {
  render() {
    return (
      <div className="container">
        <div className="uploads-container">
          <h3>Raw Input Field</h3>
          <RawInputField />
            <br/><br/><br/>
          <h3>Uppy Drag Drop Basic</h3>
          <UppyDragDrop />
            <br/><br/><br/>
          <h3>Uppy Drag Drop with Walkthrough</h3>
          <ImageAndFormWalkthrough />
        </div>
        <div className="images-container">
          <Images />
        </div>
      </div>
    );
  }
}
export default UploadFile;
