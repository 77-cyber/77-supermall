<template>
    <div class="goods">
      <goods-list-item v-for="item in goods" :key="item.lable" :goods-item="item"/>
    </div>
</template>

<script type="text/javascript">
import GoodsListItem from './goodsListItem'
export default {
  name:'',
  props:{
      goods:{
          type:Array,
          default(){
              return []
          }
      }
  },
  components: {
      GoodsListItem
  }
}
</script>

<style scoped>
    .goods{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 2px ;
    }

</style>
