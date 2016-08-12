import { Notes, Nodes, Edges } from '../../api/notes.js'
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import './list-all-notes.html'

Template.listAllNotes.onCreated(function listAllNotesOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('notes');
	Meteor.subscribe('nodes');
	Meteor.subscribe('edges');
});

Template.listAllNotes.helpers({
	notes() {
		return Notes.find({});
	},
	nodes() {
		return Nodes.find({});
	},
	edges() {
		return Edges.find({});
	}
});

Template.listAllNotes.events({
	'click .deleteNode'() {
		Meteor.call('nodes.remove', this._id);
	},
	'click .deleteEdge'() {
		Meteor.call('edges.remove', this._id);
	}
});
