import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* editEntries(action) {
    try {
    console.log(`HIT editEntries`);
    console.log(`action.payload is: `, action.payload);
    console.log(`user.id`, action.payload.id );
    const id = action.payload.id
    
    
     const response = yield axios.put(`/entry/edit/${id}`, action.payload);
    yield put({ type: 'GET_ENTRIES' , payload: response.data })
    }
    catch (error) {
      console.log(`Couldn't get user's entries`);
    }
}

function* editEntrySaga() {
    yield takeLatest('EDIT_ENTRY', editEntries);
  }

export default editEntrySaga;