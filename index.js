const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-HyQfvswECSzmE7ijJcFGm0Ae",
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();



/*
async function callAPI() {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Say this is a test",
        max_tokens: 7,
        temperature: 0,
    });
    console.log(response.data.choices[0].text);
}
callAPI();
// prints "this is indeed a test" that would be the response of chatgpt
*/

//create a simple express api that  calls the fucntion above

const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 3080




app.post('/', async (req, res) => {
    const { message } = req.body;
    console.log(message)
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    // console.log(response.data.choices[0].text);
    res.json({
        message: response.data.choices[0].text,
    })
});

app.get('/models', async (req, res) => {

    const response = await openai.listModels();
    console.log(342);
    // console.log(response.data.data);
    res.json({
        models: response.data.data
    })
});

app.listen(port, () => {
    console.log(`Example app listednig at http://localhost:${port}`)
});


