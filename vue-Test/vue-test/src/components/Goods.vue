<template>
<div>
  <div class="navbar-div">
        <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>

  <div class="topimage-div">
       <img :src="goodsInfo.PICTURE_COMPERSS_PATH" width="100%"/>
  </div>
  <div class="goods-name">{{goodsInfo.NAME}}</div>
  <div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE | moneyFilte}} 元</div>
  <div> 
      <van-tabs swipeable sticky>
          <van-tab title="商品详情">
            <div class="detail" v-html="goodsInfo.DETAIL"> </div>
          </van-tab>
          <van-tab title="评价">
              正在制作中
          </van-tab>   
      </van-tabs>
  </div>
  <div class="goods-bottom">
      <div>
          <van-button size="large" type="primary"  @click="addGoodsToCart" >加入购物车</van-button>
      </div>
      <div>
          <van-button size="large" type="danger">直接购买</van-button>
      </div>

  </div>
</div>
</template>


<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
import { Toast } from 'vant'
import {toMoney} from '@/filter/moneyFilter.js'

export default {
    data(){
        return{
            goodsId:'',
            goodsInfo:{},
        }
    },
    created(){
        this.goodsId = this.$route.query.goodsId ?this.$route.query.goodsId : this.$route.params.goodsId
        this.getInfo()
    },
    filters:{
         moneyFilte(money){
            return toMoney(money)
        }  
    },
    methods:{
        getInfo(){
            Toast.loading('请求中。。。')
            axios({
                url:url.getDetailGoodsInfo,
                method:'post',
                data:{
                    goodsId:this.goodsId
                    }
            }).then(reponse =>{
                Toast.clear()
                if(reponse.data.code==200 && reponse.data.message){
                    this.goodsInfo = reponse.data.message
                }else{
                    Toast("服务器错误，数据获取失败")
                }
            }).catch(error =>{
              
                Toast(error)
            })
        },
       onClickLeft(){
        this.$router.go(-1)
       },
       addGoodsToCart(){
           //首字母必须大写
           let CardInfod = localStorage.cardInfo? JSON.parse(localStorage.cardInfo) :[]
           console.log(CardInfod)
           let isHaveGoods = CardInfod.find(cart=>cart.goodsId==this.goodsId)
           console.log(isHaveGoods)
           if(!isHaveGoods){
               let newGoodsInfo ={
                   goodsId:this.goodsInfo.ID,
                   Name:this.goodsInfo.NAME,
                   price:this.goodsInfo.PRESENT_PRICE,
                   image:this.goodsInfo.PICTURE_COMPERSS_PATH,
                   count:1
               }
                CardInfod.push(newGoodsInfo)//添加购物车
                localStorage.cardInfo = JSON.stringify(CardInfod)
                Toast.success('添加成功')
           }else{
                Toast.success('已有此商品')
           } 
          this.$router.push({name:'Car'})
       }
    }    

}
</script>

<style>
    .goods-name{
        background-color: #fff;
    } 
    .goods-price{
        background-color: #fff;
    }
    .detail {
        font-size:0px;
    }
    .goods-bottom{
        position:fixed;
        bottom:0px;
        left:0px;
        background-color: #FFF;
        width:100%;
        display: flex;
        flex-direction: row;
        flex-flow:nowrap;
    }

    .goods-bottom > div {
        flex:1;
        padding:5px;
    }
</style>