const express = require('express');
const spawn = require('child_process').spawn;
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {

    let numSongs = (req.query.songs == null) ? 100 : req.query.songs;
    let process = spawn('python3', ['./scraper.py', numSongs]);

    process.stdout.on('data', (data) => {
        res.status(200).send(data.toString());
    });

    process.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
    });

});

app.get('/test', (req, res) => {
    res.status(200).send({
        test: 'working',
    })
});

app.listen(
    PORT,
    () => console.log(`Backend active on http://localhost:${PORT}`)
);