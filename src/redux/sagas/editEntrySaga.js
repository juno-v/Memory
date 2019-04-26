import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* editEntries(action) {
    try {
    console.log(`HIT editEntries`);
    console.log(`PAYLOAD: `, action.payload);
    
    const id = action.payload.entryId
    
    yield axios.put(`/entry/edit/${id}`, action.payload);
    // console.log(`response.data is: `, response.data)
    yield put({ type: 'GET_ENTRIES' , payload: {id: action.payload.id}})
    }
    catch (error) {
      console.log(`Couldn't edit user's entries`);
    }
}

function* editEntrySaga() {
    yield takeLatest('EDIT_ENTRY', editEntries);
  }

export default editEntrySaga;