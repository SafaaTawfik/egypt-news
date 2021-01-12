const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const newsapi = require("./tools/newsapi");
const { response } = require("express");
const port = 3000;

//serving static files

const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

// setup hbs as view engine
app.set("view engine", "hbs");

//

const viewsPath = path.join(__dirname, "../src/views");

app.set("views", viewsPath);

//Register Partial files
const partialsPath = path.join(__dirname, "../partials");
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  newsapi((error, data) => {
    if (error) {
      return res.send({ error });
    }
    res.render("index", { news: data });
  });
});
app.listen(port, () => console.log("Listening on server 3000"));
