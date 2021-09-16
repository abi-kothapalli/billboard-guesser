const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send({
        song: '',
        artist: ''
        
    })
});

app.listen(
    PORT,
    () => console.log(`It's active on http://localhost:${PORT}`)
)