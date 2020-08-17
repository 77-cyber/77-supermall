<template>
    <div class="tab-controll">
        <div v-for="(item,index) in titles" :key="item.lable"
         class="tab-controll-item"
         :class="{active:index===currentIndex}" @click="itemClick(index)">
            <span>{{item}} </span>
        </div>
    </div>
</template>

<script type="text/javascript">
export default {
  name:'TabControll',
  props:{
      titles:{
          type:Array,
          default(){
              return []
          }
      }
  },
  data () {
      return {
          currentIndex:0
      }
  },
  methods: {
      itemClick(index){
          this.currentIndex=index;
          this.$emit('tabClick', index)
      }
  }
}
</script>

<style scoped>
    .tab-controll{
        display: flex;
        text-align: center;
        font-size: 15px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .tab-controll-item{
        flex:1;
    }
    span{
        padding: 5px;
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>