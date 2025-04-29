const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.prompt;

  if (!userMessage) {
    return res.status(400).json({ error: 'Prompt vacío' });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }]
    });

    const botResponse = completion.data.choices[0].message.content.trim();
    res.json({ response: botResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error al conectar con OpenAI" });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
