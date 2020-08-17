<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-controll :titles="titles" @tabClick="tabClick" 
      ref="tabControl1" class="tab-control" 
      v-show="isTabFixed"></tab-controll>
    <scroll class="content" ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-controll :titles="titles" @tabClick="tabClick" 
      ref="tabControl2"></tab-controll>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControll from 'components/content/tabControll/TabControll'
  import GoodsList from 'components/content/goods/goodsList'
  import Scroll from 'components/common/scroll/Scroll'
 
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  
  import {getHomeMultidata,getHomeGoods} from "network/home"
  import {debounce} from '../../common/utils'
  import {itemListenerMixin,backTopMixin} from "../../common/mixin"

export default {
		name: "Home",
    components: {
      NavBar,
      TabControll,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll
    },
    mixins: [itemListenerMixin,backTopMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        titles:['流行','新款','精选'],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        currentType:'pop',
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    activated () {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0,this.saveY,0);
    },
    deactivated () {
      //1、保存Y值
      this.saveY=this.$refs.scroll.getScrollY();
      //2、取消全局事件的监听
      this.$bus.$off('itemImageLoad',this.ItemImgListener)
   },
    created(){
      //1、请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
      
    },
    mounted () {
      
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list;
      }
    },
    methods: {
      /* 事件监听 */
      tabClick(index){
        switch(index){
          case 0:
            this.currentType='pop';
            break;
          case 1:
            this.currentType='new';
            break;
          case 2:
            this.currentType='sell';
        }
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
      },
      contentScroll(position){
        this.lishtenShowBackTop(position);
         //2、决定tabControl是否吸顶(position:fixed)
         this.isTabFixed=(-position.y)>this.tabOffsetTop;
      },
      swiperImageLoad(){
         //2、获取tabControll的offsetTop
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
      },
      /* 网络请求 */
      getHomeMultidata(){
          getHomeMultidata().then(res=>{
          //console.log(this.titles);
          this.banners=res.data.banner.list;
          this.recommends=res.data.recommend.list;
        })
      },
      getHomeGoods(type){
          const page=this.goods[type].page+1;
          getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list); //解构，一次放入 
            this.goods[type].page+=1;
            this.$refs.scroll.finishPullUp();
            //this.$refs.scroll.scroll.refresh();
        })
      },
      loadMore(){
        this.getHomeGoods(this.currentType);
        //  this.$refs.scroll.scroll.refresh();
      }
    }
    
	}
</script>

<style scoped>
  #home{
    /* padding-top: 43px; */
    height: 100vh;
    position: relative;
  }
 .home-nav{
    background-color:var(--color-tint);
    color:white;
 }

 .content{
   overflow: hidden;
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }
 .tab-control{
   position: relative;
   z-index: 9;
 }
</style>
