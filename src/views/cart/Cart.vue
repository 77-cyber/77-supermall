<template>
  <div id="cart">
    <nav-bar class="navbar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  
  import {mapGetters} from 'vuex'
  
	export default {
		name: "Cart",
    components: {
		  NavBar,CartList
    },
    computed: {
      //将getters中的发放给转换为计算数学
      //...mapGetters([cartLength]) 
      ...mapGetters({
        length:'cartLength'
      }) 
    }
	}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    /* font-weight: 700; */
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
