var mongoose=require("mongoose");
var rolesEnum=['ADMIN', 'PLAYER'];

var userSchema=new mongoose.Schema({
  //userId:{type:Number},
  //username:{type:String, required:true},
  fullName:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:String,required:true,min:12,max:12},
  biography:{type:String, required:false},
  role:{type:String,enum:rolesEnum, default: 'PLAYER'},
  password:{type:String,required:true},
  eventsGoing:[
      {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
    ], 
  eventsCreated: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Event'}
    ]
})

module.exports=mongoose.model("User", userSchema);
