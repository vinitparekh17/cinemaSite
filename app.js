const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const key = `b31cf485`;
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {  
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    var input = req.body.search;
    var url = `https://www.omdbapi.com/?t=${input}&apikey=${key}`;

    https.get(url, (response) => {
        let rawData = "";
        response.on("data", (data) => { rawData += data })
        response.on("end", () => {
            var result = JSON.parse(rawData)

            if (result.Response == "False") {
                return res.sendFile(__dirname + "/error.html")
            }
            console.log(result);

            res.render("result", {
                title: result.Title,
                year: result.Year,
                rated: result.Rated,
                released: result.Released,
                director: result.Director,
                imdbRates: result.imdbRating,
                votes: result.imdbVotes,
                duration: result.Runtime,
                catagory: result.Genre,
                writer: result.Writer,
                actors: result.Actors,
                plot: result.Plot,
                lang: result.Language,
                poster: result.Poster,
            })
        })
    })
})

app.listen(3000, () => { console.log("http:/localhost:3000") })