<template>
  <div>
     <div class="search-bar">
      <van-row >
        <van-col span='3'>
           <img :src="locationIcon" width="80%" class="location-img"/>
         </van-col>
        <van-col span='16'>
           <input type="text" class="search-input"/>
         </van-col>
        <van-col span='5'>
           <van-button size="mini">查找</van-button>
         </van-col>
      </van-row>
     </div>
     <div class="swiper-area">
        <van-swipe :autoplay="1000">
          <van-swipe-item v-for="(banner,index) in bannerPicArry" :key="index">
            <img :src="banner.imgUrl" width="100%"/>
          </van-swipe-item>
        </van-swipe>
     </div>
     <div class="type-bar">
       <div v-for="(cate,index) in category" :key="index">
         <img  v-lazy="cate.image" width="90%"/>
         <span>{{cate.mallCategoryName}}</span>
       </div>
     </div>
     <div>
        <img v-lazy="adBanner" width="100%" />
     </div>
     <div class="recommend-area">
        <div class="recommend-title">
          商品推荐
        </div>
        <div class="recommend-body">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                <div class="recommend-item">
                  <img  :src="item.image" width="80%"/>
                  <div>{{item.goodsName}}</div>
                  <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
                </div>
              </swiper-slide>
            </swiper>
        </div>
     </div>
     <!-- floor one  area -->
     <floor-component :floorData="floor1"  :floorTitle="floorName.floor1" class="floor-height"></floor-component>
     <floor-component :floorData="floor2" :floorTitle="floorName.floor2" class="floor-height"></floor-component>
     <floor-component :floorData="floor3" :floorTitle="floorName.floor3" class="floor-height"></floor-component>

     <!-- hot-area -->
     <div class="hot-area">
        <div class="hot-title">热卖商品</div>
        <div class="hot-goods">
           <van-list>
              <van-row gutter="20">
                <van-col span='12' v-for='(item,index) in hotGoods' :key="index">
                  <div @click="onGoodsDetail(item)">
                  <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price" ></goods-info>
                  </div>
                </van-col>
              </van-row>
           </van-list>
        </div>
     </div>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import floorComponent from './component/floorComponent'
import goodsInfo from './component/goodsInfoComponent'
import url  from '@/serviceAPI.config.js'
import { Toast } from 'vant'
// import { toMoney } from '@/filter/moneyFilter.js'
export default {
  data () {
    return {
      swiperOption:{
          slidesPerView: 3,
      },
      locationIcon: require('../assets/images/location.png'),
      bannerPicArry: [
        {imgUrl: require('../assets/images/xiaocao.jpg')},
        {imgUrl: require('../assets/images/xiaocao1.jpg')}
      ],
      category: [],
      adBanner:'',
      recommendGoods:[],
      floor1:[],
      floor2:[],
      floor3:[],
      floorName:{},
      hotGoods:[]
    }
  },
  components:{ swiper, swiperSlide, floorComponent,goodsInfo},
  created() {
    this.onLoadData()
  },
  methods:{
    onGoodsDetail(data){
          console.log(data)
          // this.$router.push('/goods')
          this.$router.push({name:'Goods',params:{goodsId:data.goodsId}})
        },

    onLoadData(){
       Toast.loading('请求中。。。')
        axios({
          url: url.getShoppingMallInfo,
          methond: 'get'
        })
        .then( response =>{
          Toast.clear()
          if(response.status ==200){
            this.category=response.data.data.category;
            this.recommendGoods = response.data.data.recommend;
            this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;;
            this.floor1 = response.data.data.floor1;
            this.floor2 = response.data.data.floor2;
            this.floor3 = response.data.data.floor3;
            this.floorName = response.data.data.floorName;
            this.hotGoods = response.data.data.hotGoods;
            // console.log(response.data.category)
          }

        })
        .catch((error) => {
          Toast.fail('请求失败，请稍后再试')
          // console.log(error)
        })
     }
    }
}

</script>

<style>
  .search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
  }
  .search-input{
    width: 100%;
    height: 1.3rem;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 1px solid #fff !important;
    background-color: #E5017D;
    color: #fff;
  }
  .location-img{
    padding-top:.1rem;
    padding-left: .3rem;
  }
  .swiper-area{
    clear:both;
    max-height:15rem;
    overflow: hidden;
  }
  .type-bar{
      background-color: #fff;
      margin:0 .3rem .3rem .3rem;
      border-radius: .3rem;
      display:flex;
      flex-direction:row;
      flex-wrap:nowrap;
  }
  .type-bar div{
      padding:.3rem;
      font-size:0.6rem;
      text-align: center;
      flex:1;
  }
  .recommend-area{
    background-color: #fff;
    margin-top: .3rem;
  }
  .recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 0.8rem;
    padding: .2rem;
    color: #e5017d;
  }
  .recommend-body{
      border-bottom:1px solid #eee;
  }
  .recommend-item{
    width:99%;
    border-right: 1px solid #eee;
    font-size: .6rem;
    text-align: center;
  }
  .floor-height{
    min-height: 19rem;
    background-color: #fff;
  }
  .hot-area{
    text-align: center;
    font-size: 0.6rem;
    height: 1.8rem;
    line-height: 1.8rem;
  }
  .hot-title{
    font-size: .8rem;
  }
  .hot-goods{
        height: 130rem;
        overflow: hidden;
        background-color: #fff;
    }

</style>
