import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getEntries(action) {
    try {
    console.log(`HIT getEntriesSaga`);
    console.log(`action.payload is: `, action.payload.id);
    const id = action.payload.id;
    
    const response = yield axios.get(`/entry/user-entries/${id}`);
    yield put({ type: 'SET_ENTRIES', payload: response.data})
    }
    catch (error) {
      console.log(`Couldn't get user's entries`);
    }
}

function* getEntriesSaga() {
    yield takeLatest('GET_ENTRIES', getEntries);
  }

export default getEntriesSaga;