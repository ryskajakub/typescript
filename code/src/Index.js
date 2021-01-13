// @ts-check
const express = require("express");

const app = express();
const PORT = 8000;

app.get('/', (req, res) => res.send('Express + TypeScript Server\n'));
app.get('/vue', (req, res) => res.send('Express + TypeScript Server\n'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});

/**
 * @type {(x: number, y: number) => number}
 */
const x = function(x, y) { return x + y }