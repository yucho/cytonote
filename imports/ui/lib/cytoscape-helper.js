import { check } from 'meteor/check';
import cytoscape from 'cytoscape';

// Convert Mongo.Collection to Cytoscape style elements array
export const CollectionToElementsArray = 
function CollectionToElementsArray(collection) {
	let array = [];
	collection.forEach( function (ele) {
		array.push( { data: ele } );
	});
	return array;
};
