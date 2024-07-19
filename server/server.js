const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Allow all origins

app.use(express.json());

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
