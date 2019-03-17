import { all, call, put, takeEvery } from 'redux-saga/effects';

function* fetchNotes(action) {
	try {
		const results = yield fetch('/api/notes');
		const data = yield results.json();
		yield put({
			type: 'NOTES_FETCH_SUCCEEDED',
			payload: data,
		});
	} catch (e) {
		yield put({
			type: 'NOTES_FETCH_FAILED',
		});
	}
}

export default function* watchNotes() {
	console.log('from watchNotes');

	yield all([
		takeEvery('NOTES_FETCH_REQUESTED', fetchNotes),
	]);
}
