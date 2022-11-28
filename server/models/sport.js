import mongoose from "mongoose";

const sportSchema = new mongoose.Schema({
  sport: {
    type: String,
    required: true
  }

});

export default mongoose.model("Sport",sportSchema);

