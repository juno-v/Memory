import { takeLatest /* ,put */ } from 'redux-saga/effects';
import axios from 'axios';
import FormData from 'form-data'

// upload user's journal entries 
function* entry (action) {
    try {
      console.log(`hit addEntrySaga` );
      
      const data = new FormData();
      data.append('file', action.payload.file);   
      data.append('user_id', action.payload.user_id)
      data.append('title', action.payload.title );
      data.append('url', action.payload.url);
      data.append('date', action.payload.date);
      data.append('location', action.payload.location);
      data.append('description', action.payload.description);
   
      yield axios.post('/entry/upload-form', data, { headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        // 'Content-Type': file.type,
        'content-type': 'multipart/form-data'

    }});

    } catch (error) {
      console.log(`Couldn't post entries in addEntrySaga`, action.payload, error);
      alert(`Sorry, couldn't post the entries. Try again later`);
    }
  }

   function* addEntrySaga() {
    yield takeLatest('ADD_ENTRY', entry);
 
  }

   export default addEntrySaga;
