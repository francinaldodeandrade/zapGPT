import twilio from "twilio"
import dotenv from "dotenv"

dotenv.config()

const accoutSid = process.env.TWILIO_ACCOUT_SID
const authToken =  process.env.TWILIO_AUTH_TOKEN
const whatsappNumber =  process.env.TWILIO_NUMBER_WHATSAPP

const client = twilio(accoutSid, authToken)

export const sendWatsappMessage = async (to: string, body: string): Promise<void> =>{
try{
    await client.messages.create({
        to: to,
        from: whatsappNumber,
        body
})
}catch(error) {
    console.error(`Error sending message to ${to}: ${error}`);
    
}
}