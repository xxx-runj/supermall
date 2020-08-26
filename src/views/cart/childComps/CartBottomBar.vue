<template>
    <div class="cart-bottom-bar">
        <div class="checked-area" @click="allInClick" >
            <check-button class="checked-button" :is-checked="allIn"></check-button>
            <span>全选</span>
        </div>

        <div class="total-price">合计：￥{{ totalPrice }}</div>

        <div class="go-to-check" @click="toCheck">去结算：({{ checkedLength }})</div>
    </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton"

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList','checkedLength','allIn']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return item.price * item.count + preValue
      }, 0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => { return item.checked }).reduce((preValue, item) => {
        return item.count + preValue
      }, 0)
    },
    
  },
  methods: {
    allInClick() {
      this.$store.commit("allInCheck");
    },
    toCheck(){
      if(!this.checkedLength){
        this.$toast.show('您还未选择商品',2000)
      }
    }
  }
}
</script>

<style scoped>
.cart-bottom-bar {
    display: flex;
    justify-content: space-between;

    height: 49px;
    line-height: 49px; /*行高会被继承 */
    font-size: 16px;

    background-color: #eee;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
}

.checked-area {
    display: flex;
    align-items: center;
}

.checked-button {
    width: 20px;
    height: 20px;
    /* 把上面的行高覆盖掉 */
    line-height: 20px;
    margin-right: 5px;
}

.go-to-check {
    padding-right: 5px;
    background-color: pink;
}

.total-price {
    margin-left: 5px;
}


</style>