const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: '*', // Permite todos los orígenes
}));



app.use(express.json());

const loggingMiddleware = (req, res, next) => {
    const { method, url } = req;
    console.log(`Acción recibida: ${method} ${url}`);

    const originalSend = res.send.bind(res);

    res.send = function (body) {
        console.log(`Respuesta: ${body}`);
        return originalSend(body);
    };

    next();
};

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.send('API Gateway está funcionando');
});

app.post('/api/startups/create', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3001/api/startups/create', req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error al crear la startup');
    }
});

app.get('/api/startups/read/:id?', async (req, res) => {
    try {
        const { id } = req.params;
        const url = id 
            ? ` https://read-startup-service-1lta750ma-inkrodr22s-projects.vercel.app/api/startups/read/${id}` 
            : ' https://read-startup-service-1lta750ma-inkrodr22s-projects.vercel.app/api/startups/read';

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error al obtener startups');
    }
});

app.put('/api/startups/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.put(`http://localhost:3003/api/startups/update/${id}`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send(error.message);
    }
});

app.delete('/api/startups/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.delete(`http://localhost:3004/api/startups/delete/${id}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error al eliminar la startup');
    }
});

app.post('/api/technologies/create', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:3005/api/technologies/create', req.body);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error al crear la tecnología');
    }
});

app.get('/api/technologies/read/:id?', async (req, res) => {
    try {
        const { id } = req.params;
        const url = id 
            ? `http://localhost:3006/api/technologies/read/${id}` 
            : 'http://localhost:3006/api/technologies/read';

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error al obtener tecnologías');
    }
});

app.put('/api/technologies/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.put(`http://localhost:3007/api/technologies/update/${id}`, req.body);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send(error.message);
    }
});

app.delete('/api/technologies/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.delete(`http://localhost:3008/api/technologies/delete/${id}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send('Error al eliminar la tecnología');
    }
});

app.listen(PORT, () => {
    console.log(`API Gateway corriendo en el puerto ${PORT}`);
});

module.exports = app;

