require("dotenv").config();

const express = require("express");
const axios = require("axios");
const tfidfEngine = require("./tfidf/engine");
const app = express();

app.use(express.static("public"));

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: "application/json"
    }
});


// TRENDING
app.get("/api/trending", async (req, res) => {

    try {

        const { data } =
        await tmdb.get(
            "/trending/all/day"
        );

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});


// DETAIL
app.get("/api/detail/:type/:id", async (req, res) => {

    try {

        const { type, id } =
        req.params;

        const { data } =
        await tmdb.get(
            `/${type}/${id}`
        );

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});


// TRAILER
app.get("/api/trailer/:type/:id", async (req, res) => {

    try {

        const { type, id } =
        req.params;

        const { data } =
        await tmdb.get(
            `/${type}/${id}/videos`
        );

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});


// CAST
app.get("/api/cast/:type/:id", async (req, res) => {

    try {

        const { type, id } =
        req.params;

        const { data } =
        await tmdb.get(
            `/${type}/${id}/credits`
        );

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

app.get("/api/search", (req,res)=>{

    try{

        const {

            q = "",
            page = 1
        } = req.query;

        const results =
        tfidfEngine.searchMovies(q, Number (page));

        res.json(results);

    }catch(err){

        res.status(500).json({
            error:err.message
        });

    }

});
app.get("/api/genres", async (req, res) => {

    try {

        const { data } =
        await tmdb.get(
            "/genre/movie/list"
        );

        res.json(data);

    } catch(err) {

        res.status(500).json({
            error: err.message
        });

    }

});
app.get("/api/discover", async (req, res) => {

    try {

        const {
            genre
        } = req.query;

        const { data } =
        await tmdb.get(
            "/discover/movie",
            {
                params: {
                    with_genres: genre
                }
            }
        );

        res.json(data);

    } catch(err) {

        res.status(500).json({
            error: err.message
        });

    }

});
tfidfEngine.initialize();
app.listen(3000, () => {

    console.log(
        "Server running at http://localhost:3000"
    );

});