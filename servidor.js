const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dataFilePath = path.join(__dirname, 'sports.json');

const loadSports = () => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath);
        return JSON.parse(data);
    }
    return [];
};

const saveSports = (sports) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(sports, null, 2));
};

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scripts.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'scripts.js'));
});

app.post('/sports', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).send('Name and price are required');
    }

    const sports = loadSports();
    sports.push({ name, price });
    saveSports(sports);

    res.status(201).send('Sport added');
});

app.get('/sports', (req, res) => {
    const sports = loadSports();
    res.json(sports);
});

app.put('/sports/:name', (req, res) => {
    const { name } = req.params;
    const { price } = req.body;

    if (!price) {
        return res.status(400).send('Price is required');
    }

    let sports = loadSports();
    const sport = sports.find(s => s.name === name);

    if (!sport) {
        return res.status(404).send('Sport not found');
    }

    sport.price = price;
    saveSports(sports);

    res.send('Sport price updated');
});

app.delete('/sports/:name', (req, res) => {
    const { name } = req.params;
    let sports = loadSports();
    const index = sports.findIndex(s => s.name === name);

    if (index === -1) {
        return res.status(404).send('Sport not found');
    }

    sports.splice(index, 1);
    saveSports(sports);

    res.send('Sport deleted');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});