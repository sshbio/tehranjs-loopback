'use strict';

module.exports = function(Products) {

	// defining a remote method as get
	Products.basket = function(req,cb){
		cb(null,{
			hello:'from get remoteMethod'
		})
	}
	Products.remoteMethod(
		'basket',
		{
			accepts:[{arg: 'req', type: 'object', 'http': {source: 'req'}}],
			returns: {type: 'object','root':true},
			http: {path: '/basket', verb: 'get'}
		}
	)

	// defining a remote method as post/pu/patch
	Products.interest = function(req,body,cb){
		console.log(body)
		cb(null,{
			hello:'from post'
		})
	}
	Products.remoteMethod(
		'interest',
		{
		 	accepts:[ 
				{arg: 'req', type: 'object', 'http': {source: 'req'}},
				{arg: 'data', type: 'object', 'http': {source: 'body'}}
			],
			returns: {type: 'object','root':true},
			http: {path: '/interest', verb: 'post'}
		}
	);
};
