import express from "express"
const app = express()

import axios from "axios"

import bodyParser from "body-parser"
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

import cors from "cors"
app.use(cors())

import dotenv from "dotenv"
dotenv.config()

//import { getOpenAICompletion } from "./service/openai"

const hostName = process.env.HOST_NAME
const port = process.env.PORT
const route_get_localHost = process.env.ROUTE_LOCALHOST
const route_post_twilio = process.env.ROUTE_POST_ZAPBOT
const route_post_dialogFlow = process.env.ROUTE_DIALOGfLOW

//*******************************************rota de leitura do localHost**********************************
app.get(`${route_get_localHost}`, (req, res) =>{

    /*axios.get('https://sheetdb.io/api/v1/uvscf0tab9ti1')
    .then((resultado) => {
			console.log(resultado.data.config)
        })*/
    
   
    res.status(200).json({
     success:true, 
     message:"servidor em execução localmente"
   })
   
 })

 //**********************************************************************************************************
 
 //*******************************************rota de post do Twilio**************************************
 import {sendWhatsappMessage} from "./service/twilio"
 
 app.post(`${route_post_twilio}`, async(req, res) =>{
     const {to, body} = req.body
     try {
         
         await sendWhatsappMessage(to, body)
         res.status(200).json({success:true})
        
         
 
     }catch (error){
         res.status(500).json({success:false, error})
     }
 })
 
 app.post(`${route_get_localHost}`, async (req, res) => {
     const twilioRequestBody = req.body
     const messageBody = twilioRequestBody.Body
     const to = twilioRequestBody.From
 
     try {
         //const complitionChaBot = await getOpenAICompletion(messageBody)
 
         await sendWhatsappMessage(to, messageBody)
         res.status(200).json({success: true, messageBody
         })
     } catch (error) {
         res.status(500).json({success: false, error})
     }
 })

 //*********************************************rota de post para o dialogflow***********************************************

 app.post(`${route_post_dialogFlow}`, (req, res) =>{

  const mensagem = req.body.queryResult.queryText
  const intencao = req.body.queryResult.intent.displayName
  const parametro = req.body.queryResult. parameters
  let responder = ''

  if (parametro && parametro.nao_Vendemos) {
    responder = `desculpe, nós não trabalhamos com ${parametro.nao_Vendemos}`
    console.log("body", req.body.queryResult);
    console.log("responder", responder);
    console.log(intencao);
    console.log(mensagem);    
  }

  if (intencao == 'verCardapio') {
    responder = "nosso cardapio está em fase de preparação"
    
  }

  if (intencao == 'verStatus') {
    responder = 'em elaboração de resposta'
  }

  const resposta = {
    "fulfillmentText": "Resposta do Webhook",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            responder
          ]
        }
      }
    ],
    "source": "",}
  
    res.send(resposta);

    
 })
 
 //******************************************************************************************************8/

 //***************************************configurações do servidor****************************************
app.listen(port, ()=>{
    console.log(
        `servidor local no endereço 
http://${hostName}:${port}${route_get_localHost}`)
})
