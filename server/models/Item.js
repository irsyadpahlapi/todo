const mongoose   = require('mongoose')
const Schema     = mongoose.Schema

const itemSchema = new Schema({
    title : String,
    descripsi : String,
    picture : String,
    done : Boolean,
    itemsuserid:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item;
