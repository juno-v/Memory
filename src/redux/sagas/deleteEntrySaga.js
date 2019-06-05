import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* deleteEntries(action) {
    try {
    const id = action.payload.entryId
    yield axios.delete(`/entry/${id}`);
    yield put({ type: 'GET_ENTRIES', payload: action.payload})
    }
    catch (error) {
      alert(`Error deleting entries. Try again later!`)
    }
}

function* deleteEntrySaga() {
    yield takeLatest('DELETE_ENTRY', deleteEntries);
  }

export default deleteEntrySaga;