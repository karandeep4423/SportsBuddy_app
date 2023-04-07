import mongoose from "mongoose";
import NodeGeocoder from "node-geocoder";
import dotenv from 'dotenv'
dotenv.config();

const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport:{
    type:String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  location:{
    type:String,
    required: true,
  },
  address:{
  coordinates: {
      type: [Number],
     required: true,
  },
  },
  date:{
    type:String,
    required:true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  numberOfPlayer:{
    type: Number,
    required: true,
  },
  imageData:{
    type:String,
  },
  comments: [
    {
      comment: {
        type: String,
        required: true,
      },
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      date:{
        type:Date,
        default:Date.now
      }
    },
  ],
  joinEvent: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },  
  ], 
});

const options = {
  provider: 'opencage',
  httpAdapter: 'https', 
  apiKey:process.env.OPEN_CAGE_APIKEY, 
  formatter: null 
};

const geocoder = NodeGeocoder(options);

EventSchema.pre("save", async function(next){
  if(this.location && this.city){
  const data =await geocoder.geocode(this.location ,this.city);
   this.address = {
    coordinates: [data[0].longitude, data[0].latitude]
   }}
 next();
})

export default mongoose.model("Event", EventSchema);
