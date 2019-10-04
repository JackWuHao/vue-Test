const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const { connect , initSchemas } = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
//解决前后台通信组件
app.use(bodyParser());
//解决跨域问题
app.use(cors())

//用户模块路由
let user = require('./appApi/user.js')
let goods = require('./appApi/goods.js')

//装载所有子路由
let router = new Router()
router.use('/user',user.routes())
router.use('/goods',goods.routes())


//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


;(async ()=>{
    await connect()
    initSchemas()
    // const User = mongoose.model('User')
    // let oneUser = new User({userName:'wuhao2',password:'123456'})
    // oneUser.save().then(()=>{
    //         console.log('插入成功')
    //     })

})()

app.use(async(ctx)=>{
    ctx.body='<h1>Hello Koa2</h1>'
})

app.listen(4000,()=>{
    console.log('[Server] starting at port 4000')
})
