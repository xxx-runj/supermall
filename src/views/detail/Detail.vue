<template>
    <div id="detail">
        <detail-navbar @titleClick="titleClick" ref="dNavbar"></detail-navbar>
        <scroll
            class="detail-content"
            ref="scroll"
            :probe-type="3"
            @scrollLoc="scrollwhere"
        >
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info
                :detail-info="detailInfo"
                @imageLoad="imageLoad"
            ></detail-goods-info>
            <detail-goods-param
                ref="params"
                :goods-param="goodsParam"
            ></detail-goods-param>
            <detail-comment-info
                ref="comment"
                :comment-info="commentInfo"
            ></detail-comment-info>
            <detail-recommend-info
                ref="recommend"
                :recommend-list="recommendList"
            ></detail-recommend-info>
        </scroll>
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div>
</template>

<script>
import DetailNavbar from "./childComponents/DetailNavbar"
import DetailSwiper from "./childComponents/DetailSwiper"
import DetailBaseInfo from "./childComponents/DetailBaseInfo"
import DetailShopInfo from "./childComponents/DetailShopInfo"
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo"
import DetailGoodsParam from "./childComponents/DetailGoodsParam"
import DetailCommentInfo from "./childComponents/DetailCommentInfo"
import DetailRecommendInfo from "./childComponents/DetailRecommendInfo"
import DetailBottomBar from "./childComponents/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll"
// import Toast from "components/common/toast/Toast"  //改用自定义插件的方式


import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail.js'
import { debounce } from "common/utils.js"
import { backTopMixin } from "common/mixin.js"

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailGoodsParam,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,  //保存当前点击商品组件的id
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommendList: [],
      navTopY: [],
      getNavTopY: null,
      currentIndex: 0,   //详情页导航栏标题和对应界面的联动
    }
  },
  created() {
    this._getDetailData();
    this._getRecommend();

    //对navTopY赋值的操作进行防抖
    this.getNavTopY = debounce(() => {
      this.navTopY = [];
      this.navTopY.push(0);
      this.navTopY.push(this.$refs.params.$el.offsetTop - 44);
      this.navTopY.push(this.$refs.comment.$el.offsetTop - 44);
      this.navTopY.push(this.$refs.recommend.$el.offsetTop - 44);
      this.navTopY.push(Number.MAX_VALUE);
    }, 100)
  },
  // mounted() {
  //   //3,监听商品图片、推荐图片加载完成
  //   //利用防抖操作，当第一张图片来了以后，等一会儿，看是否下一张图片也来了
  //   //这样可以几张图片一起刷新，减少压力
  //   const refresh = debounce(this.$refs.scroll.refreshScroll, 10);
  //   this.$bus.$on('detailImgLoad', () => {
  //     refresh();
  //   })
  // },
  methods: {
    _getDetailData() {
      //因为设置了keep-alive，所以这些代码写在created里面时，
      //只会请求到一次点击得到的数据(这个组件没有被destroyed，所以不会再次created)
      //因此下述代码也只会执行一次
      //所以要把Detail.vue在keep-alive中exclude
      this.iid = this.$route.params.id;  //获取参数，根据动态路由中设置的参数名称
      //根据id请求数据
      getDetail(this.iid).then(res => {
        //1,获取顶部图片轮播数据
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        //2，获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //3，获取商家信息
        this.shop = new Shop(data.shopInfo);
        //4，获取商品详细信息
        this.detailInfo = data.detailInfo;
        //5，获取商品参数信息
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        //6，获取评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }

        //   //7，获取详情页导航每个标题的offsetTop
        //   //nextTick函数，是等页面dom数据渲染完成之后执行的
        //   //但此时图片不一定加载完成,所以这样做不对
        // this.$nextTick(() =>{
        //   this.navTopY = [];
        //   this.navTopY.push(0);
        //   this.navTopY.push(this.$refs.params.$el.offsetTop - 44);
        //   this.navTopY.push(this.$refs.comment.$el.offsetTop -44);
        //   this.navTopY.push(this.$refs.recommend.$el.offsetTop - 44);
        // })
      })
    },
    _getRecommend() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
      })
    },

    // recImageLoad() {
    // 商品图片防抖
    //   const refresh = debounce(this.$refs.scroll.refreshScroll);
    //   refresh();
    // }

    // 加载完商品信息图片的最后一张后刷新better-scroll
    // 以及获取导航每个标题对应界面的offsetTop
    imageLoad() {
      this.$refs.scroll.refreshScroll();
      this.getNavTopY();
    },

    // 监听详情页导航栏标题的点击
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navTopY[index], 200)
    },

    // 详情页导航与滚动的联动
    scrollwhere(position) {
      // 1，获取y值
      // console.log(position.y)
      const positionY = -position.y;
      this.isShowBackTop = position.y < -1000

      // 2，positionY和导航每个标题对应界面的offsetTop值进行对比
      // for(let i in this.navTopY)   这里的i是字符串
      // 第一个条件是防止赋值的过程过于频繁
      const length = this.navTopY.length;
      //// 2.1 普通方法
      // for (let i = 0; i < length; i++) {
      //   if ((this.currentIndex !== i) && ((i < length - 1 && positionY >= this.navTopY[i] && positionY < this.navTopY[i + 1]) || (i == length - 1 && positionY >= this.navTopY[i]))) {
      //     this.currentIndex = i;
      //     this.$refs.dNavbar.currentIndex = this.currentIndex;
      //   }
      // }
      //// 2.2 hack方法 在navTopY数组中加入一个最大值
      for (let i = 0; i < length - 1; i++) {
        if ((this.currentIndex !== i) && (positionY >= this.navTopY[i] && positionY < this.navTopY[i + 1])) {
          this.currentIndex = i;
          this.$refs.dNavbar.currentIndex = this.currentIndex;
        }
      }

    },

    //监听购物车的点击
    addToCart() {
      // 1，获取购物车需要显示的信息
      const product = {};
      product.count = 1;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品添加到购物车里
      //通过commit提交到vuex的mutations
      // addCart的代码里有逻辑判断，所以最好将此方法写在actions里
      //actions.js里的函数可以返回一个promise对象,因此dispatch之后可以调用then方法
      //这里调用then是为了实现加入到购物车的弹窗提示
      this.$store.dispatch("addCart",product).then(res => {
        //直接利用toast插件中的方法
        this.$toast.show(res,10000)
      }); 

    }
  }
}
</script>

<style scoped>
#detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
}

.detail-content {
    overflow: hidden;
    height: calc(100% - 44px - 40px);
}
</style>