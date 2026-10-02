const express = require('express');
const app = express();

const PORT = 3000;


// --- GET
app.get('/hello', (req, res) => {
    res.json({message: "hello, world"});
});

// keep the server running
app.listen(PORT, () => {
    console.log(`Server runnig on PORT: ${PORT}`)
});