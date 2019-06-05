import { takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteEntries(action) {
    try {
    const id = action.payload.entryId
    yield axios.delete(`/entry/${id}`);
    window.location.reload();
    alert(`You've deleted an entry!`)
    }
    catch (error) {
      alert(`Error deleting entries. Try again later!`)
    }
}

function* deleteEntrySaga() {
    yield takeLatest('DELETE_ENTRY', deleteEntries);
  }

export default deleteEntrySaga;