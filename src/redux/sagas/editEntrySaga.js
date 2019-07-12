import { takeLatest, /* put */ } from 'redux-saga/effects';
import axios from 'axios';
import { log } from 'util';

function* editEntries(action) {
    try {
      const id = action.payload.entryId
      yield axios.put(`/entry/edit/${id}`, action.payload);
      window.location.reload();
    }
    catch (error) {
      alert(`Error editing entries! Try again later!`)
    }
}

function* editEntrySaga() {
    yield takeLatest('EDIT_ENTRY', editEntries);
}

export default editEntrySaga;