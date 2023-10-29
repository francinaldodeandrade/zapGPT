'https://api.twilio.com/2010-04-01/Accounts/AC1388b454a3b487dc764346fb33e6d238/Messages.json' \
'To=whatsapp:+558399735156' \
'From=whatsapp:+14155238886' \
ACCOUT_SID = AC1388b454a3b487dc764346fb33e6d238 \

AUTH_TOKEN = 5338723a2517434dcb8636c37bd24f29 \

/_client.messages
.create({
from: whatsappNumber,
body: 'mensagem do wheatherZap',
to: 'whatsapp:+558399735156'
})
.then(message => console.log(message.to));_/

const express = require('express');
const request = require('request');
const app = express();
const dialogflowSessionClient =
require('../botlib/dialogflow_session_client.js');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const projectId = 'Place your dialogflow projectId here';
const phoneNumber = "+14155238886";
const accountSid = 'AC1388b454a3b487dc764346fb33e6d238';
const authToken = '1831c9d508a62734189d5e08bf4d7959';

const client = require('twilio')(accountSid, authToken);
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const sessionClient = new dialogflowSessionClient(projectId);

const listener = app.listen(process.env.PORT, function() {
console.log('Your Twilio integration server is listening on port ' + listener.address().port);
});

app.post('/', async function(req, res) {
const body = req.body;
const text = body.Body;
const id = body.From;
const dialogflowResponse = (await sessionClient.detectIntent(
text, id, body)).fulfillmentText;
const twiml = new MessagingResponse();
const message = twiml.message(dialogflowResponse);
res.send(twiml.toString());
});

process.on('SIGTERM', () => {
listener.close(() => {
console.log('Closing http server.');
process.exit(0);
});
});

curl -X POST -H 'Content-Type: application/json' -d '{"responseId":"30c65d84-d694-4917-95d4-e9badc896d56-68d88c4e","queryResult":{"queryText":"ver status","parameters":{"geo-state-us":""},"allRequiredParamsPresent":true,"fulfillmentText":"temos pizza de calabresa e quatro queijos","fulfillmentMessages":[{"text":{"text":["temos pizza de calabresa e quatro queijos"]}}],"outputContexts":[{"name":"projects/pedidosbot-nhnf/agent/sessions/930da24f-8635-6ca5-7dd2-e1332c162892/contexts/__system_counters__","parameters":{"no-input":0,"no-match":0,"geo-state-us":"","geo-state-us.original":""}}],"intent":{"name":"projects/pedidosbot-nhnf/agent/intents/3ad14dcc-3246-4ef3-a00a-5ab7eee0549e","displayName":"verCardapio"},"intentDetectionConfidence":0.46603885,"languageCode":"pt-br"},"originalDetectIntentRequest":{"source":"DIALOGFLOW_CONSOLE","payload":{}},"session":"projects/pedidosbot-nhnf/agent/sessions/930da24f-8635-6ca5-7dd2-e1332c162892"}' https://zapgpt-m3fm.onrender.com/receive/dialogflow
