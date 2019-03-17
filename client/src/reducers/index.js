import { combineReducers } from 'redux';
import tags from './tags';
import campaigns from './campaigns';
import campaign from './campaign';
import notes from './notes';

export default combineReducers({ 
	tags,
	campaigns,
	campaign,
	notes,
});
