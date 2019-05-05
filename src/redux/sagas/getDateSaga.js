import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';

function* getDate(action) {
    try {

        const id = action.payload.id
        const date = action.payload.date
        console.log(id, date);
        
        const response = yield axios.get(`/entry/date/${id}/${date}`, action.payload);
        // console.log(response);
        // console.log(`DATA IS!@@@@:`, response.data);
        yield put({ type: 'SET_DATE', payload: response.data})
        
    }
    catch (error) {
        console.log(`Couldn't get entries by DATE.`);    
    }
}

function* getKeywordsSaga() {
    yield takeLatest('GET_DATE', getDate);
}

export default getKeywordsSaga;