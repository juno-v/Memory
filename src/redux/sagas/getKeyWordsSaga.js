import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getKeywords(action) {
    try {
        const id = action.payload.id
        const keyword = action.payload.keyword
        const response = yield axios.get(`/entry/keyword/${id}/${keyword}`, action.payload);
        yield put({ type: 'SET_KEYWORDS', payload: response.data})
    }
    catch (error) {
        console.log(`Couldn't get entries by KEYWORD.`);
    }
}



function* getKeywordsSaga() {
    yield takeLatest('GET_KEYWORDS', getKeywords);
}

export default getKeywordsSaga;
