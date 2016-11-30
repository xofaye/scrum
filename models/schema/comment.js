var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  event:{type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true},
  date:{type:Date, required:true, default: Date.now}, // DATE TYPE or timestamp
  text:{type:String, required:true}
})


module.exports = mongoose.model("Comment", commentSchema);