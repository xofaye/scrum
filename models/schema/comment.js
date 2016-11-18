var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
  commentId:{type:Number},
  user:{type: Schema.Types.ObjectId, ref: 'Users', required: true},
  event{type: Schema.Types.ObjectId, ref: 'Events', required: true},
  date:{type:Date, required:true, default: Date.now}, // DATE TYPE or timestamp
  text:{type:String, required:true}
})

commentSchema.pre("save", function(next){
  var obj = this;
  mongoose.model("counters").findByIdAndUpdate("commentCounters",{$inc:{seq:1}},{upsert:true, new:true}, function(error,result){
    if(error)
      next(error)
    obj.commentId = result.seq;
    next();
  })
})

module.exports = mongoose.model("Comments", commentSchema);
