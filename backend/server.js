const express = require("express");
const spawn = require("child_process").spawn;
const cors = require("cors");
const app = express();
const PORT = 8080;

let scrapedData = null;

runBotScraper = () => {
    console.log("\nStarted web scraper");
    let process = spawn("python3", ["./backend/botScraper.py"]);

    let result = "";
    process.stdout.on("data", (data) => {
        result += data.toString();
    });

    process.on("close", (code) => {
        processOutput(result, code);
    });
};

processOutput = (res, code) => {
    console.log(`Python process exited with code ${code}`);

    scrapedData = code === 0 ? res : runBotScraper();
};

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    if (scrapedData == null) {
        res.status(425).send("Scraper has not yet finished running");
    } else {
        res.status(200).send(scrapedData);
    }
});

app.listen(PORT, () => {
    console.log(`Backend active on http://localhost:${PORT}`);
    scrapedData = runBotScraper();
});
