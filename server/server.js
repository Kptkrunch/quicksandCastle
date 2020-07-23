const express = require('express');
const app = express();
const PORT = 8008;
const path = require('path');

// app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`now listening on port: ${PORT}`);
});