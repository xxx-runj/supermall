<template>
    <tabbar>
        <tabbar-item link="/home" >
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/home.svg" alt="" />
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/home_active.svg" alt="" />
            </template>
            <template v-slot:item-text>
                <div>首页</div>
            </template>
        </tabbar-item>
        <tabbar-item link="/category">
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/category.svg" alt="" />
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/category_active.svg" alt="" />
            </template>
            <template v-slot:item-text>
                <div>分类</div>
            </template>
        </tabbar-item>
        <tabbar-item link="/cart">
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/cart.svg" alt="" />
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/cart_active.svg" alt="" />
            </template>
            <template v-slot:item-text>
                <div>购物车</div>
            </template>
        </tabbar-item>
        <tabbar-item link="/profile">
            <template v-slot:item-icon>
                <img src="~assets/img/tabbar/profile.svg" alt="" />
            </template>
            <template v-slot:item-icon-active>
                <img src="~assets/img/tabbar/profile_active.svg" alt="" />
            </template>
            <template v-slot:item-text>
                <div>我的</div>
            </template>
        </tabbar-item>
    </tabbar>
</template>

<script>

import Tabbar from "components/common/tabbar/Tabbar";
import TabbarItem from "components/common/tabbar/TabbarItem";

export default {
  name: "MainTabbar",
  components:{
    Tabbar,
    TabbarItem,
  }
}
</script>

<style scoped>

</style>