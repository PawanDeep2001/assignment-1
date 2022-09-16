/********************************************************************************* 
 * WEB422 – Assignment 1 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source 
 * (including web sites) or distributed to other students.
 * 
 * Name: Pawan Deep Student ID: 111144218 Date: 16/09/2022 
 * Cyclic Link: https://agreeable-red-clam.cyclic.app/ 
 * 
 ********************************************************************************/

var express = require('express');
var app = express();
var cors = require('cors');
require('dotenv').config();
var HTTP_PORT = process.env.PORT || 8080;
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.json({message: "API Listening"});
});

app.post("/api/movies", (req,res)=>{
    db.addNewMovie(req.body).then((data)=>{
        res.status(201).json(data);
    }).catch((err)=>{
        res.json(err.message);
    });
    
});

app.get('/api/movies', function(req,res){
    db.getAllMovies(req.query.page,req.query.perPage,req.query.title).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err.message);
    });
});

app.get('/api/movies/:_id', function(req,res){
    db.getMovieById(req.params._id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(204).json("id doesn't exist");
    });
});

app.put('/api/movie/:_id', function (req, res) {
    db.updateMovieById(req.params._id).then(()=>{
        res.json("movie updated");
    }).catch((err)=>{
        res.status(500).json(err.message);
    });
});

app.delete('/api/movies/:_id', function (req, res) {
    db.deleteMovieById(req.params._id).then(()=>{
        res.json("movie deleted");
    }).catch((err)=>{
        res.status(500).json(err.message);
    });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
});
}).catch((err)=>{
    console.log(err);
});
