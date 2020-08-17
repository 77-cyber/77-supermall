import {debounce} from "./utils"
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data () {
    return {
      itemImgListener:null,
      refresh:null
    }
  },
  mounted () {
    this.refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = ()=>{
      refresh();
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener);
   // console.log("W s h r");
  }
}

export const backTopMixin={
  components: {
    BackTop
  },
  data(){
    return{
      isShowBackTop:false
    }
  },
  methods: {
    backClick(){
      this.$refs.scroll.scrollTo(0,0,500);
    },
    lishtenShowBackTop(position){
       //1、判断BackTop是否显示
       this.isShowBackTop=(-position.y)>600;
    }
  }
}
export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
