require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
        console.error('OPENROUTER_API_KEY is not set.');
        return res.status(500).json({ error: 'Server configuration error.' });
    }

    // IMPORTANT: Fill this with your career details. 
    // The more detail you provide, the better the AI will be at representing you.
    const careerContext = `
    You are the digital twin of a world-class software engineer.
    Your goal is to answer questions about their career.
    Here is some information about their career to use for your answers:
    - **Experience**: 10+ years in software development.
    - **Specialties**: Full-stack development, AI integration, cloud architecture (AWS, GCP).
    - **Key Projects**: Led development of a large-scale e-commerce platform, built a real-time analytics dashboard for a fintech company.
    - **Skills**: JavaScript/TypeScript (React, Node.js), Python (Django, Flask), Go, Docker, Kubernetes.
    - **Philosophy**: Passionate about writing clean, efficient, and maintainable code. Believes in strong team collaboration and mentorship.
    - **Personal Note**: Always learning and exploring new technologies.
    
    Keep your answers concise and professional, in the first person (as if you are the software engineer).
    `;

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-3.5-turbo', // Note: 'openai/gpt-oss-120b' was not found, using a popular alternative.
            messages: [
                { role: 'system', content: careerContext },
                { role: 'user', content: message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${openRouterApiKey}`
            }
        });

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error calling OpenRouter:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get response from AI.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});