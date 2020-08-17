<template>
  <div id="detail">
    <!-- 导航栏 -->
    <detail-nav-bar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :top-images="topImages" />
      <!-- 基础信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 商品信息 -->
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>      
      <goods-list ref="recommend" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/goodsList'
  
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
  import {debounce} from "../../common/utils"
  import {itemListenerMixin,backTopMixin} from "../../common/mixin"
 
  import {mapActions} from 'vuex'
  //import Toast from "components/common/toast/Toast"
 export default {
		name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      //Toast
    },
    mixins: [itemListenerMixin,backTopMixin],
    data() {
		  return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        themeTopYs:[0,1000,2000,3000],
        getThemmeTopY:null,
        currentIndex:0,
        /* message:'',
        show:false */
      }
    },
    created() {
      //1、保存传入的iid
      this.iid=this.$route.params.iid;
      //2、根据iid请求详情数据
      getDetail(this.iid).then(res=>{
        const data = res.result;
        this.topImages=data.itemInfo.topImages;
        //2.1、获取商品信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);
        //2.2、创建店铺信息
        this.shop = new Shop(data.shopInfo)
        //2.3、保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //2.4、获取参数信息
        this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //2.5、获取评论信息
        if(data.rate.list){
          this.commentInfo = data.rate.list[0]
        }
      })
      //3、获取推荐数据
      getRecommend().then(res => {
        //console.log(res);
        this.recommends=res.data.list
      })
      //4、给getThemeTopY复制
      this.getThemmeTopY = debounce(()=>{
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        //console.log(this.themeTopYs);
      },100)
    },
    destroyed () {
     this.$bus.$off('itemImgLoad',this.itemImgListener)
    } ,
    methods: {
      ...mapActions(['addCart']),
      detailImageLoad(){
        this.refresh();
        this.getThemmeTopY();
      },
      titleClick(index){
        //console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        //1、获取y值
        const positonY = -position.y
        //2、和主题中的值进行对比
        let length=this.themeTopYs.length;
        for(let i=0 ;i<length-1;i++){
          if(this.currentIndex!==i &&(positonY>=this.themeTopYs[i] && positonY<this.themeTopYs[i+1])){
            this.currentIndex=i;
            this.$refs.nav.currentIndex=this.currentIndex
          }
        }
        //显示是否显示回到顶部
        this.lishtenShowBackTop(position);
      },
      addToCart(){
        //1、获取购物车需要展示的商品信息
        const product={};
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //2、将商品添加到购物车
        /* this.$store.dispatch('addCart',product).then(res=>{
          console.log(res);
        }); */
        this.addCart(product).then(res=>{
          /* this.show=true;
          this.message=res;
          setTimeout(() => {
            this.show=false;
            this.message=""
          }, 1500); */
          this.$toast.show(res,2000)
        })
      }
    }
	}
</script>

<style scoped>
 #detail{
   position: relative;
   z-index: 1;
   background-color: #fff;
   height: 100vh;
 }
 .content {
    height: calc(100% - 44px - 53px);
    background-color: #fff;
  }
</style>
