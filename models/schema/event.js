var mongoose=require("mongoose");
var sportsEnum=['BADMINTON', 'BASKETBALL', 'BOWLING', 'EUROPEAN HANDBALL', 'FIELD HOCKEY', 'FLAG FOOTBALL', 
                'HOCKEY', 'CRICKET', 'WATER POLO', 'LACROSSE', 'RUGBY', 'SOCCER', 'SOFTBALL', 'SQUASH', 'TABLE TENNIS', 
                'TENNIS', 'TRACK MEET', 'ULTIMATE FRISBEE', 'VOLLEYBALL', 'WATER POLO'];
var eventSchema=new mongoose.Schema({
  eventId:{type:Number},
  title:{type:String, required:true},
  location:{type:String, required:true},
  date:{type:Date, required:true}, // DATE TYPE or timestamp
  type:{type:String, enum:sportsEnum, default: 'OTHER'},
  description:{type:String, required:false},
  createdBy: {type: Schema.Types.ObjectId, ref: 'Users', required:true},
  numRequired: {type:Number, required:false},
  attendees: [
      {type: Schema.Types.ObjectId, ref: 'Users'}
    ], 
  comments: [
      {type: Schema.Types.ObjectId, ref: 'Comments'}
    ] 
})

eventSchema.pre("save",function(next){
  var obj=this;
  mongoose.model("counters").findByIdAndUpdate("eventCounters",{$inc:{seq:1}},{upsert:true,new:true},function(error,result){
    if(error)
      next(error)
    obj.eventId=result.seq;
    next();
  })
})

module.exports=mongoose.model("Events",eventSchema);

