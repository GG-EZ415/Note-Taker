const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('api/notes/:id', (req,res) => {
    let noteText = JSON.parse(fs.readFileSync('./db/db.json', "utf-8"));
    let noteID = (req.params.id);
    res.json(noteText[Number(noteID)]);
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
});

app.post('/api/notes', (req, res) => {
    let noteText = JSON.parse(fs.readFileSync('./db/db.json', "utf-8"));
    req.body.id = (noteText.length).toString();
    noteText.push(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteText));
    console.log("Congrats, you're note has been saved!");
    res.json(noteText);
});

app.listen(PORT, () => {
    console.log(`Server listening on port: http://localhost:${PORT}`);
});