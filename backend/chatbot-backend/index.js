const path = require('path');
console.log("RUTA ACTUAL:", __dirname);
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = 3000;

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al generar respuesta del bot" });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
