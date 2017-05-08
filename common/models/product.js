'use strict';

module.exports = function(Products) {

	Products.beforeRemote('find',function(ctx,ins,next){
		// console.log(ctx.args)
		if(!ctx.args.filter){
			var error = new Error('simple error');
			error.statusCode = 422;
			error.code = 'SIMPLE_ERROR_HAPPEND';
			return next(error);
		}
		next();
	})

	Products.afterRemote('basket',function(ctx,ins,next){
		ctx.result.ehem = 'from after remoteMethod';
		next()
	})
	
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
