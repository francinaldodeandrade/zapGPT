import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import { sendWhatsappMessage } from "./service/twilio"


const app = express()

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(cors())

dotenv.config()

app.get('/open', (req, res) =>{
   
   res.status(200).json({success:true, message:"servidor em execução"})
})

app.post('/send', async(req, res) =>{
    const {to, body} = req.body
    try {
        
        await sendWhatsappMessage(to, body)
        res.status(200).json({success:true})
       
        

    }catch (error){
        res.status(500).json({success:false, error})
    }
})

app.post('/receive', async (req, res) => {
    const twilioRequestBody = req.body
    const messageBody = twilioRequestBody.Body
    const to = twilioRequestBody.From

    try {
        await sendWhatsappMessage(to, messageBody)
        res.status(200).json({success: true, messageBody})
    } catch (error) {
        res.status(500).json({success: false, error})
    }
})

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`servidor rodando na porta: ${port}`);
    
})