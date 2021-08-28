import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const movieSchema = mongoose.Schema({
    adult: Boolean,
    backdrop_path : String,
    genre_ids : [Number],
    id : Number,
    original_language: String,
    original_title: String,
    overview : String,
    popularity: Number,
    poster_path: String,
    release_date: String,
    title: String,
    video: Boolean,
    vote_average: Number,
    vote_count: Number
})
movieSchema.plugin(mongoosePaginate);

export default mongoose.model('movies', movieSchema);