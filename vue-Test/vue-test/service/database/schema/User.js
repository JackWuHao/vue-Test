const mongoose = require('mongoose')
const Schema =mongoose.Schema         //声明Schema
let ObjectId = Schema.Types.ObjectId  //声明Object类型
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10 //加盐数字必须为数字


//创建我们的用户Schema(表的字段)
const userSchema = new Schema({
   UserId:ObjectId, //主键
   userName:{unique:true,type:String},
   password:String,
   createAt:{type:Date,default:Date.now()},
   lastLoginAt:{type:Date,default:Date.now()}
},{
  collection:'user'
})
userSchema.pre('save',function(next){
  let _this = this
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt)=>{
    if(err){
      return next(err)
    }
     //把密码传给hash进行加密。成功以后赋值给password属性
    bcrypt.hash(_this.password,salt,(err,hash)=>{
       if(err) return next(err)
       _this.password = hash
       next()
    })
  })
})
userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}
//发布模型
mongoose.model('User', userSchema);
