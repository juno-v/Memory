import { takeLatest /* ,put */ } from 'redux-saga/effects';
import axios from 'axios';
// import FormData from 'form-data'

// upload user's journal entries 
function* entry (action) {
    try {
      // const data = new FormData();
      // data.append('file', action.payload.file);   
      // data.append('user_id', action.payload.user_id)
      // data.append('title', action.payload.title );
      // data.append('url', action.payload.url);
      // data.append('date', action.payload.date);
      // data.append('location', action.payload.location);
      // data.append('description', action.payload.description);
   
      // yield axios.post('/entry/upload-form', data, { headers: {
      //   'accept': 'application/json',
      //   'Accept-Language': 'en-US,en;q=0.8',
      //   // 'Content-Type': 'image/png', 
      //   'content-type': 'multipart/form-data'
    // }});
    yield axios.post('/entry/upload-form', action.payload)
    let id = this.props.reduxState.user.id
    console.log(id);
    
    yield axios.get(`/entry/user-entries/${id}`);

    } catch (error) {
      alert(`You've created a case!`);
    }
  }

   function* addEntrySaga() {
    yield takeLatest('ADD_ENTRY', entry);
 
  }

   export default addEntrySaga;
