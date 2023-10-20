const axios = require('axios');
const {stripIndent} = require('common-tags');
const {escape} = require('querystring'); 

const api_key = 'd7b0856986a016cba7df048ed9195ef0'; 
const lang = 'pt_br';
const unit = 'metric';

exports.handler = function(context, event, callback) {
	const twiml = new Twilio.twiml.MessagingResponse(); 
	
	const query = escape(event.body);
	 //url = `https://api.openweathermap.org/data/3.0/onecall?lat=30.489772&lon=-99.771335&lang=lang`
	//const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&lang=${lang}&units=${unit}&APPID=${api_key}`;
	const urlNew = `https://api.openweathermap.org/data/3.0/onecall?q=${query}&lang=${lang}&units=${unit}&APPID=${api_key}`;

	
	axios
	.get(urlNew)
	.then(({data}) => {
	    console.log('resposta', data.data.nome);
	    return data.nome;
	})
	.catch((err) => {
	    console.log(err);
	    return('clima na cidade pesquisada indisponível, tente em instantes');
	})
	
	.then((response) => {
	twiml.message(response);
	callback(null, twiml);
	});

};