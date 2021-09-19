const express = require("express");
const spawn = require("child_process").spawn;
const app = express();
const PORT = 8080;

app.use(express.json());

app.get("/", (req, res) => {
    const numSongs = req.query.songs == null ? 100 : req.query.songs;
    let process = spawn("python3", ["./backend/scraper.py"]);

    process.stdout.on("data", (data) => {
        res.status(200).send(data.toString());
    });

    process.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);
        if (code != 0) {
            res.status(500).send(
                "There was an error while running the Python web scraper"
            );
        }
    });
});

app.get("/test", (req, res) => {
    let process = spawn("python3", ["./backend/test.py"]);

    process.stdout.on("data", (data) => {
        res.status(200).send(data.toString());
    });

    process.on("close", (code) => {
        console.log(`Python process exited with code ${code}`);
        if (code != 0) {
            res.status(500).send(
                "There was an error while running the Python test script"
            );
        }
    });
});

app.listen(PORT, () =>
    console.log(`Backend active on http://localhost:${PORT}`)
);
