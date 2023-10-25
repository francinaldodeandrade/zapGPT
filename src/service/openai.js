import {Configuration, OpenAIApi} from 'openai';

import dotenv from "dotenv";

dotenv.config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
;
const openai = new OpenAIApi(config)

const getOpenAICompletion = async (input) => {
    try {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: input}]
        })
        return completion.data.choices[0].message?.content
    } catch(error) {
        console.log(`Error completing input: ${error}`)
        return ''
    }
}

export default(getOpenAICompletion)