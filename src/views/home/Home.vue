<template>
    <div id="home">
        <navbar class="home-nav">
            <template v-slot:center>
                <div>购物街</div>
            </template>
        </navbar>
        <!-- 为了实现吸顶效果 -->
        <tab-control
            :titles="['流行', '新款', '精选']"
            @tabClick="tabClick"
            ref="tabControl1"
            class="uptab-control"
            v-show="isTabFixed"
        ></tab-control>
        <scroll
            class="content"
            ref="scroll"
            :probe-type="3"
            @scrollLoc="scrollLoc"
            :pull-up-load="true"
            @pullingUp="loadMore"
        >
            <home-swiper
                :banner="banner"
                @swiperImageLoad="swiperImageLoad"
            ></home-swiper>
            <home-recommend :recommend="recommend"></home-recommend>
            <week-fashion></week-fashion>
            <tab-control
                class="tab-control"
                :titles="['流行', '新款', '精选']"
                @tabClick="tabClick"
                ref="tabControl2"
            ></tab-control>
            <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>

import HomeSwiper from "./childComps/HomeSwiper"
import HomeRecommend from "./childComps/HomeRecommend.vue"
import WeekFashion from "./childComps/WeekFashion.vue"

import Navbar from "components/common/navbar/Navbar.vue"
import TabControl from "components/content/tabControl/TabControl.vue"
import GoodsList from "components/content/goods/GoodsList.vue"
import Scroll from "components/common/scroll/Scroll.vue"
import BackTop from "components/content/backTop/BackTop.vue"

import { getHomeMultidata, getHomeGoods } from "network/home/home.js"
import { debounce } from "common/utils.js"


export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    WeekFashion,
    Navbar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,

  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackTop: "false",
      tabOffsetTop: 0,  //为了实现吸顶效果设置的变量
      isTabFixed: false,  //决定uptab-control是否显示
      isLoad: false, //节流阀
      saveY: 0,
    }
  },
  //组件创建好即可发送数据请求
  created() {
    //函数操作过多，所以可以把方法调用写在methods里面
    //因为函数名字一样，所以加上了this才是调用methods里面的方法，
    //否则就还是在调用上面导入的getHomeMultidata方法

    //1,请求多个数据(这是异步操作)
    this.getHomeMultidata();

    //2，请求商品数据，
    //调用三次这个方法，把三种数据的第一页都请求下来
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');

  },
  mounted() {

    //3,监听goodsitem中图片加载完成
    //利用防抖操作，当第一张图片来了以后，等一会儿，看是否下一张图片也来了
    //这样可以几张图片一起刷新，减少压力
    const refresh = debounce(this.$refs.scroll.refreshScroll, 10);
    this.$bus.$on('homeItemImgLoad', () => {
      refresh();
    })
  },

  activated() {
    this.$refs.scroll.refreshScroll();//先刷新再滚动，避免出现小bug
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    
  },
  //Home离开时记录位置和状态
  deactivated() {
    //console.log(this.$refs.scroll.getScrollY());
    this.saveY = this.$refs.scroll.getScrollY();
  },

  methods: {
    //   -----------------网络请求相关代码----------------
    //1,请求多个数据(这是异步操作)
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        //res是局部变量，所以必须把它保存到data中
        //函数调用-->压入函数栈(保存函数调用过程中所有变量)
        //函数调用结束-->弹出函数栈(释放函数所有变量)
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    //2，请求商品数据
    getHomeGoods(type) {
      let page = this.goods[type].page + 1; //在之前页的基础上加1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list); //把数据追加到原来的list中
        this.goods[type].page = res.data.page;
        //可以多次上拉加载更多
        this.$refs.scroll.finishPullUp();
      })
    },
    //   -----------------事件监听相关方法----------------
    //防抖函数的封装,在common文件夹下的utils.js


    tabClick(index) {
      this.currentType = Object.keys(this.goods)[index];
      // switch(index){      //也可以用switch
      //    case 0:
      //       this.currentType = 'pop';
      //       break;
      // }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      // 拿到scroll组件对象,就可以访问该组件对象里面的数据和方法
      //this.$refs.scroll拿到scroll组件
      //this.$refs.scroll.scroll拿到scroll组件里new BScroll()得到的对象
      //该对象下有一个scrollTo(x坐标，y坐标，时间(多少ms返回顶部))方法
      //this.$refs.scroll.scroll.scrollTo(0, 0, 500)

      //这样写是因为在Scroll.vue组件里已经封装了一个scrollTo方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // 1，判断backTop是否显示
    scrollLoc(position) {
      //console.log(position)
      this.isShowBackTop = position.y < -1000
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      //上拉加载更多
      //同时要去this.getHomeGoods方法里面设置可以多次上拉加载更多
      this.getHomeGoods(this.currentType)
      //-------************************-----------------------
      //因为图片是异步加载，所以最开始better-scroll在计算可滚动的高度时，还没包括图片的高度，
      //等到图片加载完成后，很明显可滚动高度应该变大，然后better-scroll并没有修改原来的值，
      //导致上拉加载更多时，会出现滑不动的现象
      //所以应该在图片请求过来之后，对better-scroll做一个刷新
    },

    swiperImageLoad() {
      //监听轮播图图片加载事件,使用了节流阀，只要有一张图片加载完成，就获取
      if (!this.isLoad) {
        //  为了实现吸顶效果，获取tab-control的offsetTop
        //  在mounted中获取这个属性是不正确的，因为轮播图、推荐、本周流行图片(异步)可能还没有被加载上去，会影响这个高度
        //  高度被影响，就会导致滚动有时滑不动了
        //  所有组件都有一个属性是$el，用于获取组件中的元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isLoad = !this.isLoad;
      }
    }
  }
}
</script>


<style scoped>
/*  scoped表示样式有作用域 */
#home {
    /* padding-top: 44px; */ /*导航栏不需要脱标后，这一句也不需要了 */
    /* vh表示视口，100vh即100%的视口 */
    height: 100vh;
    position: relative;
    overflow: hidden;
}

.home-nav {
    background-color: var(--color-tint);
    color: white;
    /* 当使用了better-scroll可实现局部滚动，则导航栏就不需要脱标了 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}

.uptab-control {
    position: relative;
    z-index: 9;
}

.content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
}

.home-swiper {
    height: 150px;
    width: 320px;
}

/* .tab-control { */
/* 当祖先容器使用了overflow: hidden后，sticky就会失效 */
/* 但是试了一下，删掉overflow也还是失效 */
/* 所以应该是因为使用了better-scroll而不是原生滚动的原因 */
/* position: sticky; */
/* 必须知道better-scroll滚动到多少时才需要有吸顶效果 */
/* 这个时候就可以给tab-control添加样式position:fixed */
/* top: 44px;
    z-index: 9; */
/* } */
</style>