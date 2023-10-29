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
   
  console.log("body", req.body.queryResult);


  const resposta = {
    "fulfillmentText": "Resposta do Webhook",
    "fulfillmentMessages": [
      {
        "text": {
          "text": [
            'resposta.mensagem'
          ]
        }
      }
    ],
    "source": "",}

    console.log("resposta final", resposta)
  
    res.send(resposta);

    
 })
 
 //******************************************************************************************************8/

 //***************************************configurações do servidor****************************************
app.listen(port, ()=>{
    console.log(
        `servidor local no endereço 
http://${hostName}:${port}${route_get_localHost}`)
})
