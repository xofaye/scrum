var mongoose=require("mongoose");
var rolesEnum=['ADMIN', 'PLAYER'];
var userSchema=new mongoose.Schema({
  userId:{type:Number},
  username:{type:String, required:true},
  name:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:String,required:true,min:10,max:10},
  biography:{type:String, required:false},
  role:{type:String,enum:rolesEnum, default: 'PLAYER'},
  password:{type:String,required:true},
  eventsGoing:[
      {type: Schema.Types.ObjectId, ref: 'Events'}
    ], 
  eventsCreated: [
      {type: Schema.Types.ObjectId, ref: 'Events'}
    ]
})

userSchema.pre("save",function(next){
  var obj=this;
  mongoose.model("counters").findByIdAndUpdate("userCounters",{$inc:{seq:1}},{upsert:true,new:true},function(error,result){
    if(error)
      next(error)
    obj.userId=result.seq;
    next();
  })
})

module.exports=mongoose.model("Users",userSchema);
