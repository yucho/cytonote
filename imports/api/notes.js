import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');
export const Nodes = new Mongo.Collection('nodes');
export const Edges = new Mongo.Collection('edges');

// Define data schema to validate database insert/update
Nodes.schema = new SimpleSchema({
	id: {
		type: String,
		optional: true
	},
	name: {
		type: String
	},
	description: {
		type: String,
		optional: true
	}
});
Edges.schema = new SimpleSchema({
	id: {
		type: String,
		optional: true
	},
	name: {
		type: String,
		optional: true
	},
	source: {
		type: String
	},
	target: {
		type: String
	},
	description: {
		type: String,
		optional: true
	}
});

// Runs only on server. Publish collection methods for subscription.
if(Meteor.isServer) {
	Meteor.publish('notes', function notesPublication() {
		return Notes.find({});
	});
	Meteor.publish('nodes', function nodesPublication() {
		return Nodes.find({});
	});
	Meteor.publish('edges', function edgesPublication() {
		return Edges.find({});
	});
}

// notes methods
Meteor.methods({
});

// nodes methods
Meteor.methods({
	// Pass node name, optional description & id. Id will be
	// generated if not provided
	'nodes.insert'(name, description=null, id=null) {
		var node = {
			name: name,
		};

		if(description) {
			node.description = description;
		}

		// If id is provided, use it. If not, generate callback to update id
		if(id) {
			node.id = id;
			node._id = new Mongo.ObjectID(id);
		}
		else {
			var callback = function updateId(err, result) {
				Nodes.update(result, { $set: { id: result } });
			};
		}

		Nodes.schema.validate(node);
		return Nodes.insert(node, callback);
	},
	// Delete a node with given _id
	'nodes.remove'(id) {
		return Nodes.remove(id);
	}
});

// edges methods
Meteor.methods({
	// Pass edge name, src, dest, optional description & id.
	// Id will be generated if not provided
	'edges.insert'(name, src, target, description=null, id=null) {
		var edge = {
			name: name,
			source: src,
			target: target
		};

		if(description) {
			edge.description = description;
		}

		// If id is provided, use it. If not, generate callback to update id
		if(id) {
			edge.id = id;
			edge._id = new Mongo.ObjectID(id);
		}
		else {
			var callback = function updateId(err, result) {
				Edges.update(result, { $set: {id: result } });
			};
		}

		Edges.schema.validate(edge);
		return Edges.insert(edge, callback);
	},
	// Delete an edge with given _id
	'edges.remove'(id) {
		return Edges.remove(id);
	}
});
