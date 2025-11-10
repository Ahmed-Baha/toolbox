const mongoose=require('mongoose')
const {Schema}=mongoose
const campgroundSchema=new Schema({
    name:{type:String,required:true},
    description:String,
    location:String,
    price:Number
})

const Campground=mongoose.model('Campground',campgroundSchema)
module.exports=Campground