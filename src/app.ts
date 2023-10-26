import express from "express"
const app = express()

import bodyParser from "body-parser"
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

import cors from "cors"
app.use(cors())

import dotenv from "dotenv"
dotenv.config()

//import { getOpenAICompletion } from "./service/openai"
import {sendWhatsappMessage} from "./service/twilio"

const hostName = process.env.HOST_NAME
const port = process.env.PORT
const route_get_localHost = process.env.ROUTE_LOCALHOST
const route_post_twilio = process.env.ROUTE_POST_ZAPBOT
const route_post_dialogFlow = process.env.ROUTE_DIALOGfLOW

app.get(`${route_get_localHost}`, (req, res) =>{
   
    res.status(200).json({
     success:true, 
     message:"servidor em execução localmente"
   })
 })
 
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

 app.post(`${route_post_dialogFlow}`, (req, res) =>{
    const mensagem = req.body.queryResult.queryText
    const intenção = req.body.queryResult.intent.displayName
    const parametro = req.body.queryResult.parametrs

    let responder =''

    if (parametro && parametro.nao_vendemos){
        const responder = `desculpe, não vendemos ${parametro.não_vendemos}`
        console.log(`responder, ${responder}`);

    if ( intenção	== 'verCardapio') {
     `${responder} nosso cardápio ainda está em elaboração`
    }

    if ( intenção	== 'verStatus') {
      `${responder} seu pedido ainda está em preparação`
     }  else {
      `${responder} sua intenção era ${intenção}
      }`
     }

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
        "source": "",
      }
    res.send(resposta)
 })
 
 

app.listen(port, ()=>{
    console.log(
        `servidor local no endereço 
http://${hostName}:${port}${route_get_localHost}`)
})
