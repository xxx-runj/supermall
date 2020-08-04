<template>
    <div id="detail">
        <detail-navbar></detail-navbar>
        <scroll class="detail-content" ref="scroll">
            <detail-swiper :top-images="topImages"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info
                :detail-info="detailInfo"
                @imgLoad="imgLoad"
            ></detail-goods-info>
            <detail-goods-param :goods-param="goodsParam"></detail-goods-param>
            <detail-comment-info
                :comment-info="commentInfo"
            ></detail-comment-info>
            <detail-recommend-info :recommend-list = "recommendList"></detail-recommend-info>
        </scroll>
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

import Scroll from "components/common/scroll/Scroll"

import { getDetail,getRecommend, Goods, Shop, GoodsParam } from 'network/detail.js'

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
    Scroll,
  },
  data() {
    return {
      iid: null,  //保存当前点击商品组件的id
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommendList:[],
    }
  },
  created() {
    this._getDetailData();
    this._getRecommend();
  },
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
        console.log(data);
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
      })
    },
    _getRecommend() {
        getRecommend().then((res, error) => {
          if (error) return
          this.recommendList = res.data.list
        })
      },
    imgLoad() {
      this.$refs.scroll.refreshScroll();
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
    height: calc(100% - 44px);
}
</style>