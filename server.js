import express from "express"
import mongoose from "mongoose"
import Movies from "./dbMovie.js"
import Credits from "./dbCredit.js"
import Cors from "cors"

// app config
const app = express();
const port = process.env.PORT || 8000;
const connection_url = "mongodb+srv://admin:6benynRdrwIObrRG@cluster0.d4mkq.mongodb.net/movies?retryWrites=true&w=majority"

// middleware
app.use(express.json())
app.use(Cors());

// db config
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology:true
})

app.get("/movies/cast/:id",async (req,res)=>{
    const id = req.params.id;
    let movie = await Credits.findOne({ id: id }).exec();

    if(movie == null)
    res.status(201).send({"success":false,"status_code":34,"status_message":"The resource you requested could not be found."})
    else
    res.status(201).send(movie)
})

app.get("/movies/get/:id",async (req,res)=>{
    const id = req.params.id;
    let movie = await Movies.findOne({ id: id }).exec();

    if(movie == null)
        res.status(201).send({"success":false,"status_code":34,"status_message":"The resource you requested could not be found."})
    else
        res.status(201).send(movie)
})

app.get("/movies/search",async(req,res)=>{
    const options = {
        page: req.query.page || 1,
        limit: 20,
        sort: {popularity : -1},
        collation: {
            locale: 'en',
        },
    };
    const key = req.query.key;

    Movies.paginate({ title: new RegExp(key, "i") }, options, function (err, result) {
        let data = {
            page : options.page,
            results : result.docs,
            total_pages : result.totalPages,
            total_results : result.totalDocs
        }
        if(data.results.length < 1) res.send({"errors":[`page must be less than or equal to ${result.totalPages}`]})

        else res.send(data)
    })

})

app.get("/movies/popular",(req,res)=>{
    const options = {
        page: req.query.page || 1,
        limit: 20,
        sort: {popularity : -1},
        collation: {
            locale: 'en',
        },
    };

    Movies.paginate({}, options, function (err, result) {
        let data = {
            page : options.page,
            results : result.docs,
            total_pages : result.totalPages,
            total_results : result.totalDocs
        }
        if(data.results.length < 1) res.send({"errors":[`page must be less than or equal to ${result.totalPages}`]})

        else res.send(data)
    })
})

// listener
app.listen(port,()=>{
    console.log(`Listening on port:${port}`)
});
