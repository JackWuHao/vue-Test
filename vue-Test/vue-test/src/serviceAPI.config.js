const BASEURL = "https://4ba310c1-4558-4e45-a3b0-65911699c475.mock.pstmn.io/"
const LOCALURL = "http://localhost:4000/"
const URL = {
    getShoppingMallInfo:BASEURL+'test2',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',  //用户注册接口
    login:LOCALURL+'user/login',   //用户注册接口
    getDetailGoodsInfo : LOCALURL+'goods/getDetailGoodsInfo',  //获取商品详情
    getGoodsListByCategorySubID : LOCALURL+'goods/getGoodsListByCategorySubID',  //得到小类商品信息
    getCategoryList:LOCALURL+'goods/getCategoryList',
    getCateGorySubList:LOCALURL+'goods/getCategorySubList',  //得到小类信息   
}

module.exports = URL
