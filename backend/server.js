const express = require("express");
const spawn = require("child_process").spawn;
const cors = require("cors");
const app = express();
const PORT = 8080;

let scrapedData = null;

// Function to run webscraping python script and process output, so that it can later be send with a GET request
runBotScraper = () => {
    console.log("\nStarted web scraper");
    let process = spawn("python3", ["./backend/botScraper.py"]);

    // Store output of script in string variable
    let result = "";
    process.stdout.on("data", (data) => {
        result += data.toString();
    });

    // Process result
    process.on("close", (code) => {
        processOutput(result, code);
    });
};

// Function that is called when webscraping python script is completed
processOutput = (res, code) => {
    console.log(`Python process exited with code ${code}`);

    // Script should exit with code 0. There is sometimes a bug where the script
    // exits abruptly with code 1, in which case we rerun the script and the issue should eventually resolve itself.
    scrapedData = code === 0 ? res : runBotScraper();
};

// Send data using JSON format and enable all CORS requests
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    if (scrapedData == null) {
        // If scrapedData is null, the python script hasn't finished so send status 425
        res.status(425).send("Scraper has not yet finished running");
    } else {
        // If scrapedData is populated, send it with status 200
        res.status(200).send(scrapedData);
    }
});

app.listen(PORT, () => {
    console.log(`Backend active on http://localhost:${PORT}`);
    // Run scraper function on backend server startup
    scrapedData = runBotScraper();
});
