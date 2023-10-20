import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import { sendWatsappMessage } from "./service/twilio"

const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

app.post('/chat/send', async(req, res) =>{
    const {to, body} = req.body
    try {
        await sendWatsappMessage(to, body)
        res.status(200).json({success:true})

    }catch (error){
        res.status(500).json({success:false, error})
    }
})

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`servidor rodando na porta: ${port}`);
    
})