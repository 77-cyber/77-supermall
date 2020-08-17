<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive">
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text">我的</slot>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  name:"TabBarItem",
  props:{
      path:String,
      activeColor:{
          type:String,
          default:'red'
      }
  },
  data() {
    return {
        //isActive:false
    }
  },
  computed: {
      isActive(){
          //不等于-1等于找到了 返回 ture
          return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle(){
          return this.isActive?{color:this.activeColor}:{}
      }
  },
  methods: {
      itemClick(){
          this.$router.push(this.path)
      }
  },
  components: {
  }
}
</script>

<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      margin-bottom: 2px;
  }
  .active{
      color:#f4c8dc;
  }
</style>
