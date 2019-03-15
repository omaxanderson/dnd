import { combineReducers } from 'redux';
import tags from './tags';
import campaigns from './campaigns';

export default combineReducers({ 
	tags,
	campaigns,
});
