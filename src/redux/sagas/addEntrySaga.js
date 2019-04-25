import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// upload user's journal entries 
function* entry (action) {
    try {
      console.log(`hit addEntrySaga`, action.payload );
      
      yield axios.post('/entry/upload-form', action.payload)
    } catch (error) {
      console.log(`Couldn't post entries in addEntrySaga`, action.payload, error);
      alert(`Sorry, couldn't post the entries. Try again later`);
    }
  }

   function* addEntrySaga() {
    yield takeLatest('ADD_ENTRY', entry);
 
  }

   export default addEntrySaga;
