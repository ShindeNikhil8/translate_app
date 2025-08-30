const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", async (req, res) => {
    try {
        const { text, source, target } = req.query;

        const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${source}|${target}`;
        const response = await fetch(url);
        const json = await response.json();

        const matches = json.matches;
        const translatedText = matches[matches.length - 1]?.translation || "No translation found";

        res.send(translatedText);
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong!");
    }
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
