const express = require("express");
const history = require("connect-history-api-fallback");
const path = require("path");

const app = express();

app.use(history());
app.use(express.static(path.resolve(__dirname, "./dist")));

const PORT = process.env.PORT || 8888;

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}!`);
});
