const express = require('express');

const routes = express.Router();

const pages = 'http://localhost:3000/pages';

routes.get('/',function(req,res){
	return res.static(`pages/home`)
});

routes.get('/projetos',function(req,res){
	return res.static(`pages/projetos`);
});


module.exports=routes;