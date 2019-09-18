<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide"  v-for="(item, index) in slide" :key="index">
        Slide{{item}}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlider} from 'vue-awesome-swiper'
  export default {
    data (){
      return {
        slide:[1,2,3,4,5,6],
         swiperOption:{
           pagination:{
              el:'.swiper-pagination'
           }
         }

      }
    },
    components:{swiper,swiperSlider}
  }
</script>

<style>
   .swiper-slide{
     height: 4rem;
     text-align: center;
     padding-top: 3rem;
     border-bottom: 1px solid #ccc;
   }
</style>
