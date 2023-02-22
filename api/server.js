const express = require('express')
const dotenv = require("dotenv");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
const configration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configration);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${question}`,
      temperature: 0.6, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
    });
    // console.log(response);
    res.status(200).send({
      result: response.data.choices[0].text,
    });
  } catch (error) {
    // console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(8000, () => {
  console.log("App is running");
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});
