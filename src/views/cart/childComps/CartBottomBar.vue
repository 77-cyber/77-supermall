<template>
  <div class="bottom-menu">
    <check-button class="select-all" @click.native="checkBtnClick" :is-checked="isSelectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
 import CheckButton from 'components/content/checkButton/CheckButton'
  import{mapGetters} from 'vuex'
	export default {
		name: "CartBottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
		  totalPrice() {
        return this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll: function () {
        if(this.cartList.length===0) return false;
        return !this.cartList.find(item => !item.checked);
      }
    },
    methods: {
      checkBtnClick: function () {
        // 1.全部选中
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false;
          });
        } else {//2、部分或者全部不选中
          this.$store.state.cartList.forEach(item => {
            item.checked = true;
          });
        }
     },
     calcClick(){
       if(!this.isSelectAll){
         this.$toast.show("请选择购买商品",2000)
       }
     }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: rgb(248, 247, 247);
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color:var(--color-tint);
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
