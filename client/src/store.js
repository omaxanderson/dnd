import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import campaignSaga from './reducers/campaignSaga';
import noteSaga from './reducers/noteSaga';

const sagaMiddleware = createSagaMiddleware();

export default createStore(
	rootReducer,
	compose(
		applyMiddleware(sagaMiddleware),
		composeWithDevTools()
	)
);

// Run all your sagas here
sagaMiddleware.run(campaignSaga);
sagaMiddleware.run(noteSaga);
