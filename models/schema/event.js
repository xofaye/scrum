var mongoose=require("mongoose");
var sportsEnum=['BADMINTON', 'BASKETBALL', 'BOWLING', 'EUROPEAN HANDBALL', 'FIELD HOCKEY', 'FLAG FOOTBALL', 
                'HOCKEY', 'CRICKET', 'WATER POLO', 'LACROSSE', 'RUGBY', 'SOCCER', 'SOFTBALL', 'SQUASH', 'TABLE TENNIS', 
                'TENNIS', 'TRACK MEET', 'ULTIMATE FRISBEE', 'VOLLEYBALL', 'WATER POLO'];
var eventSchema=new mongoose.Schema({
  title:{type:String, required:true},
  location:{type:String, required:true},
  date:{type:Date, required:true}, // DATE TYPE or timestamp
  type:{type:String, enum:sportsEnum, default: 'OTHER'},
  description:{type:String, required:false},
  createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
  numRequired: {type:Number, required:false},
  attendees: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ], 
  comments: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
    ] 
})


module.exports=mongoose.model("Event",eventSchema);

