import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const creditSchema = mongoose.Schema({
    id: Number,
    cast: Array,
    crew: Array
})
creditSchema.plugin(mongoosePaginate);

export default mongoose.model('credits', creditSchema);