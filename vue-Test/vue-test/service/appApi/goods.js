
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')

const fs = require('fs')

/* 往数据库里面写数据 */
router.get('/insertAllGoodsInfo',async(ctx)=>{
  fs.readFile('./data_json/goods.json','utf8',(err,data)=>{
    var newData=JSON.parse(data)
    const Goods = mongoose.model('Goods')
    newData.RECORDS.map(function(value,index){
      if(value.IMAGE1=!null){
        let newGoods = new Goods(value)
        newGoods.save().then(()=>{
          console.log('成功')
        }).catch(error =>{
          console.log(error)
        })
      }
    })
  })
  ctx.body ="开始导入数据"
})


router.get('/insertAllCategory',async(ctx) =>{
  fs.readFile('./data_json/category.json','utf-8',(err,data)=>{
    data = JSON.parse(data)
    console.log(data)
    const Category = mongoose.model('Category')
    data.RECORDS.map((value,index)=>{
      let newCategory = new Category(value)
      newCategory.save().then(()=>{
        console.log('插入成功')
      }).catch(error=>{
        console.log('插入失败')
      })
    })
  })
  ctx.body="开始导入数据"
})


router.get('/insertAllCategorySub',async(ctx) =>{
  fs.readFile('./data_json/category_sub.json','utf-8',(err,data)=>{
    data = JSON.parse(data)
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value,index)=>{
       let  newCategorySub = new CategorySub(value)
       newCategorySub.save().then(()=>{
         console.log('插入成功')
       }).catch(error=>{
         console.log(error)
       })
    })
  })
  ctx.body="开始导入数据"
})

/* API 接口  */
router.post('/getDetailGoodsInfo',async(ctx) =>{
  try {
    let goodsId = ctx.request.body.goodsId
    const Goods = mongoose.model('Goods')
    let result = await Goods.findOne({ID:goodsId}).exec()
    ctx.body={code:200,message:result}
  }catch(error){
    ctx.body={code:500,message:error}
  }

})

router.get('/getCategoryList',async(ctx) =>{
  try{
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body={code:200,message:result}
  }catch(err){
    ctx.body={code:500,message:err}
  }
})

/**读取小类的数据 */

router.post('/getCategorySubList',async(ctx) =>{
  let categoryId = ctx.request.body.categoryId
  const CategorySub = mongoose.model('CategorySub')
  await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec().then((data)=>{
     ctx.body = {code:200, message:data}
  }).catch(error=>{
    ctx.body = {code:500, message:data}
  })
})


router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
     let categorySubId = ctx.request.body.categorySubId 
     let page = ctx.request.body.page  //当前页数
     let num = 10  //每页显示数量
     let start = (page-1)*num  //开始位置
     const Goods = mongoose.model('Goods')
     let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
     ctx.body={code:200,message:result}
  }catch{
     ctx.body={code:500,message:err} 
  }
})


module.exports=router
