import { Notes } from '../../api/notes.js'
import { Template } from 'meteor/templating';

import './list-all-notes.html'

Template.listAllNotes.helpers({
	notes() {
		console.log(Notes.find({}));
		return Notes.find({});
	},
});
