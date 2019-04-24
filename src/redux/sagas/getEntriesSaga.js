import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getEntries() {
    try {
    console.log(`hit getEntriesSaga`);
    
      const response = yield axios.get('/entry/user-entries');
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