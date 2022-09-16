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

app.post("/api/names", (req,res)=>{
    db.addNewMovie(req.body).then(()=>{
        res.status(201).json({message: "created"});
    });
    
});

app.get('/api/movies', function(req,res){
    db.getAllMovies(req.query.page,req.query.perPage,req.query.title).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.json(err);
    });
});

app.get('/api/movies/:_id', function(req,res){
    db.getMovieById(req.params._id).then((data)=>{
        res.json(data);
    }).catch((err)=>{
        res.status(404).json("id doesn't exist");
    });
});

app.put('/api/movie/:_id', function (req, res) {
    db.updateMovieById(req.params._id).then(()=>{
        res.status(201).json("movie updated");
    }).catch((err)=>{
        res.status(404).json(err);
    });
});

app.delete('/api/movies/:_id', function (req, res) {
    db.deleteMovieById(req.params._id).then(()=>{
        res.status(201).json("movie deleted");
    }).catch((err)=>{
        res.status(404).json(err);
    });
});

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
    console.log(`server listening on: ${HTTP_PORT}`);
});
}).catch((err)=>{
    console.log(err);
});