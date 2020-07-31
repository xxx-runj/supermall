<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-show="!isActive"><slot name="item-icon"></slot></div>
        <div v-show="isActive"><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>

        <!-- img是行内块级 -->
        <!-- 内容不能写死，所以要用插槽 -->
        <!-- <img src="../../assets/img/tabbar/home.svg" alt="" /> -->
        <!-- <div>首页</div> -->
    </div>
</template>

<script>
export default {
  name: "TabbarItem",
  props: {
    link: String ,  //需要用到的父组件变量link，在App.vue中
    activeColor:{
        type:String,
        default:"red"
    }
  },
  data() {
    return {
      //isActive: true,   
    }
  },
  computed: {
    isActive() {
        //当前活跃路由的path是否包括此路由的link
      return this.$route.path.indexOf(this.link) !== -1  //不等于负1，则表示找到了，为true
    },
    activeStyle(){
        return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link);
    },
  }

}
</script>

<style  scoped>
.tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
}

.tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle; /*去掉图片下面的间隔 */
}


</style>