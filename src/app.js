const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const newsapi = require("./tools/newsapi");
const { response } = require("express");
const port = 3000;
// set  hbs as view engine
app.set("view engine", "hbs");

// Set up view path
const viewsPath = path.join(__dirname, "../src/views");
app.set("views", viewsPath);

//Register Partial files
const partialsPath = path.join(__dirname, "../src/partials");
hbs.registerPartials(partialsPath);

//serving static files
const publicDir = path.join(__dirname, "../public");
app.use(express.static(publicDir));

app.get("", (req, res) => {
  newsapi((error, data) => {
    if (error) {
      res.render("404page", {
        title: "404 Error",
        name: "error page",
      });
    }
    res.render("index", {
      news: data,
      title: "Egypt News",
      name: "Safaa Tawfik",
    });
  });
});

app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 Error",
    name: "Safaa Tawfik",
  });
});
app.listen(port, () => console.log("Listening on server 3000"));
