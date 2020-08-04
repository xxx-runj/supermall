<template>
    <!-- 使用BScroll时，传入的元素标签内部只能有一个子元素 -->
    <!-- 所以这里插条要用一个div包裹 -->
    <div class="wrapper" ref="wrapper">
        <div class="content"><slot></slot></div>
    </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      scroll: null,
    }
  },
  mounted() {
    //   通过ref拿到这个元素，再根据this，即可具有唯一性
    //   如果其他元素也有wrapper类名，通过class来获取就会出现问题
    //1，创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,//div和组件内部使用better-scroll监听点击事件，要写为true
      //probeType:3,//0和1都是不监听实时位置，2为监听手指滑动的区域 3为实时监听只要是滚动
      //不直接设定，而是利用props将probeType由父组件传入
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,   //上拉加载更多
    });
    //2,监听滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('scrollLoc', position);     //把数据传出去
      });
    }

    //3,监听上拉加载更多事件
    this.scroll.on('pullingUp', () => {
      //把请求数据传到父组件来做
      this.$emit('pullingUp')
    })
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
    },
    refreshScroll() {
      this.scroll && this.scroll.refresh && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll.y ? this.scroll.y : 0
    }
  }

}
</script>

<style scoped>
</style>