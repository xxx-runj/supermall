<template>
    <div class="cart">
        <!-- 导航 -->
        <navbar class="nav-bar">
            <template v-slot:center>
                <div>购物车({{ cartLength }})</div>
            </template>
        </navbar>

        <!-- 商品列表 -->
        <scroll class="cart-content" ref="scroll">
            <cart-list></cart-list>
        </scroll>

        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar.vue"
import Scroll from 'components/common/scroll/Scroll.vue'
import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

//辅助函数，将store里的getters映射到局部计算属性
import { mapGetters } from "vuex"

export default {
  name: "Cart",
  components: {
    Navbar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(['cartLength'])
    //   把这个函数放在vuex中的getters里
    //   cartLength(){
    //       return this.$store.getters.cartLength
    //   }
  },
  activated() {
    this.$refs.scroll.refreshScroll();
  }
}
</script>

<style scoped>
.cart {
    height: 100vh;
    position: relative;
}

.nav-bar {
    background-color: var(--color-tint);
    color: #fff;
}

.cart-content {
    position: absolute;
    top: 44px;
    bottom: 98px;
    left: 0;
    right: 0;
    overflow: hidden;
}
</style>