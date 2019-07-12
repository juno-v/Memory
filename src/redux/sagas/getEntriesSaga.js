import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getEntries(action) {
    try {
      const id = action.payload.id;
      const response = yield axios.get(`/entry/user-entries/${id}`);
      yield put({ type: 'SET_ENTRIES', payload: response.data})
    }
    catch (error) {
      alert(`Error getting entries! Try again later.`)
    }
}

function* getEntriesSaga() {
    yield takeLatest('GET_ENTRIES', getEntries);
}

export default getEntriesSaga;