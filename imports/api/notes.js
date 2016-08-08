import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');

// Runs only on server. Publish notes methods for subscription.
if(Meteor.isServer) {
	Meteor.publish('notes', function notesPublication() {
		return Notes.find({});
	});
}

Meteor.methods({

});
