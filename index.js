const express = require("express");
// require('./db/mongoose')
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const history = require("connect-history-api-fallback");

let startRouter = require("./routes/start");

const staticFileMiddleware = express.static(
  path.join(__dirname, "/public/dist/JFSCC")
);
app.use(staticFileMiddleware);
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);
app.use(staticFileMiddleware);

app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-token, authorization"
  );
  res.header("Access-Control-Expose-Headers", "x-token, authorization");
  res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, OPTION");
  next();
});

app.listen(port, () => {
  console.log(`Server listening on ${port}... `);
});

app.get("/*", (req, res) => res.sendFile(path.join(__dirname)));

// app.use('/', startRouter)
