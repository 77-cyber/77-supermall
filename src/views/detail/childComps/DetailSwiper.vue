<template>
  <swiper class="detail-swiper">
    <swiper-item  v-for="item in topImages" :key="item.lable">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script type="text/javascript">

import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'DetailSwiper',
  data() {
    return {

    }
  },
  props: {
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
