import { check } from 'meteor/check';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';

import './insert-note.html';

Template.insertNote.onCreated(function insertNoteOnCreated() {
	this.state = new ReactiveDict();
	Meteor.subscribe('notes');
	Meteor.subscribe('nodes');
	Meteor.subscribe('edges');
});

Template.insertNote.events({
	'submit .insertNode'(event) {
		event.preventDefault();

		const target = event.target;
		const name = target.name.value;

		check(name, String);
		Meteor.call('nodes.insert', name);

		target.name.value = '';
	},
	'submit .insertEdge'(event) {
		event.preventDefault();

		const target = event.target;
		const name = target.name.value;
		const src = target.source.value;
		const tgt = target.target.value;
		console.log(name + " " + src + " " + tgt);

		check(name, String);
		check(src, String);
		check(tgt, String);
		Meteor.call('edges.insert', name, src, tgt);

		target.name.value = '',
		target.source.value = '',
		target.target.value = '';
	}
});
