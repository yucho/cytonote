import { Notes } from '../../api/notes.js';
import { Nodes } from '../../api/notes.js';
import { Edges } from '../../api/notes.js';
import { EJSON } from 'meteor/ejson';
import { Template } from 'meteor/templating';

import { CollectionToElementsArray } from '../lib/cytoscape-helper.js';
import cytoscape from 'cytoscape';

import './draw-all-notes.html';

Template.drawAllNotes.helpers({

});

Template.drawAllNotes.events({
	'click .debug' () {

		// Convert collections to arrays
		this.elements = {
			nodes: CollectionToElementsArray(Nodes.find()),
			edges: CollectionToElementsArray(Edges.find()),
		};

		// debug
		console.log(this.elements);

		this.cy = cytoscape({
			container: document.getElementsByClassName('cy'),
			elements: this.elements,
			style: [{
				selector: 'node',
				style: {
					label: 'data(name)',
					width: '40px',
					height: '40px',
					color: '#000',
					'font-size': '26px',
	                'text-outline-color': '#ccc',
	                'text-outline-width': 3
				}
			},
			{
				selector: 'edge',
				style: {
					label: 'data(name)',
                	width: '3px',
	                'line-color': '#ccc',
					'mid-target-arrow-shape': 'triangle'
				}
			}]
		});

		this.cy.layout({name: 'circle'});
	},
});

//Template.helper();